const assert = require("assert");
const { QUOTES } = require("../js/quotes.js");
const {
  getJstDateIso,
  formatJstDateJa,
  defaultQuoteIndex,
  readStoredOverride,
  writeStoredOverride,
  quoteForToday,
  pickReplacement
} = require("../js/today.js");

function memoryStorage(initial) {
  const data = Object.assign({}, initial);
  return {
    getItem: function (key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem: function (key, value) {
      data[key] = String(value);
    },
    _data: data
  };
}

assert.ok(QUOTES.length >= 100, "quote stock should be large");

const ids = QUOTES.map(function (q) {
  return q.id;
});
assert.strictEqual(new Set(ids).size, ids.length, "quote ids must be unique");

const speakers = QUOTES.map(function (q) {
  return q.speaker;
});
assert.strictEqual(
  new Set(speakers).size,
  speakers.length,
  "each quote should be from a different speaker"
);

QUOTES.forEach(function (q) {
  assert.ok(q.id, "id");
  assert.ok(q.text && q.text.length >= 6, "Japanese text: " + q.id);
  assert.ok(q.speaker, "speaker: " + q.id);
  assert.ok(q.source && q.source.length >= 4, "source: " + q.id);
});

assert.strictEqual(
  getJstDateIso(new Date("2026-09-13T15:00:00Z")),
  "2026-09-14",
  "15:00 UTC is already the next calendar day in JST"
);
assert.strictEqual(
  getJstDateIso(new Date("2026-09-13T14:59:00Z")),
  "2026-09-13",
  "14:59 UTC is still the same calendar day in JST"
);
assert.strictEqual(formatJstDateJa("2026-09-14"), "2026年9月14日（月）");

const storage = memoryStorage();
const half = function () {
  return 0.5;
};
const first = quoteForToday(QUOTES, "2026-09-14", null, "stock", half);
const again = quoteForToday(QUOTES, "2026-09-14", null, "stock", half);
assert.strictEqual(first.id, again.id, "same seed returns the same first pick");
assert.ok(
  QUOTES.some(function (q) {
    return q.id === first.id;
  })
);

const dayA = quoteForToday(QUOTES, "2026-09-14", null, "stock", function () {
  return 0;
});
writeStoredOverride("2026-09-14", dayA.id, storage, "stock");
const remembered = quoteForToday(
  QUOTES,
  "2026-09-14",
  readStoredOverride(storage),
  "stock",
  function () {
    return 0.9;
  }
);
assert.strictEqual(remembered.id, dayA.id, "saved pick is today's quote");

const dayB = quoteForToday(
  QUOTES,
  "2026-09-15",
  readStoredOverride(storage),
  "stock",
  function () {
    return 0;
  }
);
assert.notStrictEqual(dayA.id, dayB.id, "next day excludes yesterday's quote");

writeStoredOverride("2026-09-14", dayB.id, storage, "stock");
const overridden = quoteForToday(
  QUOTES,
  "2026-09-14",
  readStoredOverride(storage),
  "stock"
);
assert.strictEqual(overridden.id, dayB.id, "redraw becomes today's quote");

assert.notStrictEqual(
  quoteForToday(
    QUOTES,
    "2026-09-15",
    readStoredOverride(storage),
    "stock",
    function () {
      return 0;
    }
  ).id,
  dayB.id,
  "stale override from yesterday is not reused as today's quote"
);

const replacement = pickReplacement(QUOTES, dayA.id, function () {
  return 0;
});
assert.notStrictEqual(replacement.id, dayA.id, "another quote is not the current one");

assert.notStrictEqual(
  defaultQuoteIndex("2026-09-14", QUOTES.length),
  defaultQuoteIndex("2026-09-15", QUOTES.length)
);

console.log("ok — " + QUOTES.length + " quotes");
