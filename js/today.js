var STORAGE_KEY = "meigen-today-v1";

function getJstDateIso(now) {
  var date = now || new Date();
  var parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  var y = "";
  var m = "";
  var d = "";
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].type === "year") y = parts[i].value;
    if (parts[i].type === "month") m = parts[i].value;
    if (parts[i].type === "day") d = parts[i].value;
  }
  return y + "-" + m + "-" + d;
}

function formatJstDateJa(iso) {
  var bits = iso.split("-");
  var y = Number(bits[0]);
  var m = Number(bits[1]);
  var d = Number(bits[2]);
  var weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  var weekday = weekdays[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return y + "年" + m + "月" + d + "日（" + weekday + "）";
}

function dayNumber(iso) {
  var bits = iso.split("-");
  var y = Number(bits[0]);
  var m = Number(bits[1]);
  var d = Number(bits[2]);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

function defaultQuoteIndex(iso, length) {
  var n = dayNumber(iso) % length;
  return n < 0 ? n + length : n;
}

function readStoredOverride(storage) {
  try {
    var raw;
    if (storage && typeof storage.getItem === "function") {
      raw = storage.getItem(STORAGE_KEY);
    } else if (typeof localStorage !== "undefined") {
      raw = localStorage.getItem(STORAGE_KEY);
    }
    if (!raw) return null;
    var data = JSON.parse(raw);
    if (!data || typeof data.date !== "string" || typeof data.id !== "string") {
      return null;
    }
    var source = data.source;
    if (source !== "stock" && source !== "net" && source !== "both") {
      source = "stock";
    }
    return { date: data.date, id: data.id, source: source };
  } catch (e) {
    return null;
  }
}

function writeStoredOverride(iso, id, storage, source) {
  if (source !== "stock" && source !== "net" && source !== "both") {
    source = "stock";
  }
  var payload = JSON.stringify({ date: iso, id: id, source: source });
  try {
    if (storage && typeof storage.setItem === "function") {
      storage.setItem(STORAGE_KEY, payload);
      return;
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, payload);
    }
  } catch (e) {
    // Private mode or missing storage: today's redraw still works in memory via caller state.
  }
}

function quoteById(quotes, id) {
  for (var i = 0; i < quotes.length; i++) {
    if (quotes[i].id === id) return quotes[i];
  }
  return null;
}

function quoteForToday(quotes, iso, override, source, rand) {
  source = source || "stock";
  if (!quotes || quotes.length === 0) return null;
  if (override && override.date === iso) {
    var overrideSource = override.source || "stock";
    if (overrideSource === source) {
      var found = quoteById(quotes, override.id);
      if (found) return found;
    }
  }
  var excludeId = override && override.id;
  return pickReplacement(quotes, excludeId, rand);
}

function pickReplacement(quotes, currentId, rand) {
  var roll = rand || Math.random;
  if (!quotes || quotes.length === 0) return null;
  var others = [];
  for (var i = 0; i < quotes.length; i++) {
    if (quotes[i].id !== currentId) others.push(quotes[i]);
  }
  if (others.length === 0) return quotes[0];
  return others[Math.floor(roll() * others.length)];
}

function xWeightedLength(text) {
  var n = 0;
  var s = String(text || "");
  for (var i = 0; i < s.length; i++) {
    n += s.charCodeAt(i) <= 0x7f ? 1 : 2;
  }
  return n;
}

function composeXPost(quote) {
  var speaker = (quote && quote.speaker) || "";
  var text = (quote && quote.text) || "";
  var suffix = "\n—— " + speaker;
  function pack(body) {
    return "「" + body + "」" + suffix;
  }
  if (xWeightedLength(pack(text)) <= 280) return pack(text);
  var trimmed = text;
  while (trimmed.length && xWeightedLength(pack(trimmed + "…")) > 280) {
    trimmed = trimmed.slice(0, -1);
  }
  return pack(trimmed + "…");
}

function xIntentUrl(quote) {
  return (
    "https://x.com/intent/tweet?text=" + encodeURIComponent(composeXPost(quote))
  );
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    STORAGE_KEY: STORAGE_KEY,
    getJstDateIso: getJstDateIso,
    formatJstDateJa: formatJstDateJa,
    dayNumber: dayNumber,
    defaultQuoteIndex: defaultQuoteIndex,
    readStoredOverride: readStoredOverride,
    writeStoredOverride: writeStoredOverride,
    quoteById: quoteById,
    quoteForToday: quoteForToday,
    pickReplacement: pickReplacement,
    composeXPost: composeXPost,
    xIntentUrl: xIntentUrl
  };
}
