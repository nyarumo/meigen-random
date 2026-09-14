const assert = require("assert");
const { QUOTES } = require("../js/quotes.js");
const {
  quoteForToday,
  writeStoredOverride,
  readStoredOverride
} = require("../js/today.js");
const {
  stripWiki,
  parseWikiquotePage,
  poolForSource,
  readStoredSource,
  writeStoredSource
} = require("../js/net.js");

const soseki = [
  "[[ファイル:Natsume Soseki photo.jpg|200px|thumb|夏目漱石]]",
  "==出典が確かなもの==",
  "=== 小説 ===",
  "*我輩は[[猫]]である。名前はまだない。",
  "*:『我輩は猫である』",
  "* 智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。兎角に人の世は住みにくい。",
  "*:『草枕』",
  "==出典が不確かなもの==",
  "*これは偽の引用である。とてもそれらしい言葉。",
  "*:どこかのネット"
].join("\n");

assert.strictEqual(stripWiki("我輩は[[猫]]である。"), "我輩は猫である。");
assert.strictEqual(stripWiki("'''吾輩は[[死|死ぬ]]。'''"), "吾輩は死ぬ。");
assert.strictEqual(
  stripWiki("ベースボールほど愉快にてみちたる戦争|戰争は他になかるべし。"),
  "ベースボールほど愉快にてみちたる戦争は他になかるべし。"
);

const parsed = parseWikiquotePage("夏目漱石", soseki);
assert.ok(
  parsed.some(function (q) {
    return q.text.indexOf("智に働けば角が立つ") !== -1;
  }),
  "keeps sourced Soseki quote"
);
assert.ok(
  parsed.every(function (q) {
    return q.text.indexOf("偽の引用") === -1;
  }),
  "skips unsourced section"
);
assert.ok(
  parsed.every(function (q) {
    return q.speaker === "夏目漱石" && q.source.indexOf("ウィキクォート") !== -1;
  })
);

const nested = [
  "* スタンフォード大学2005年卒業式の祝辞において",
  "** あなたがたの時間は限られている。だから他人の人生を生きて、それを無駄にしてはいけない。",
  "**:スタンフォード大学卒業式（2005年）",
  "==彼の発言ではないもの==",
  "* これはジョブズの言葉ではない長い文である。"
].join("\n");
const jobs = parseWikiquotePage("スティーブ・ジョブズ", nested);
assert.ok(
  jobs.some(function (q) {
    return q.text.indexOf("あなたがたの時間は限られている") !== -1;
  })
);
assert.ok(
  jobs.every(function (q) {
    return q.text.indexOf("卒業式の祝辞において") === -1;
  }),
  "skips nested section headers"
);
assert.ok(
  jobs.every(function (q) {
    return q.text.indexOf("ジョブズの言葉ではない") === -1;
  })
);

const citations = parseWikiquotePage(
  "宮沢賢治",
  [
    "*わたくしといふ現象は仮定された有機交流電燈のひとつの青い照明です。",
    "*:『春と修羅』",
    "*『〈新潮日本文学アルバム〉宮沢賢治』（新潮社、1984）掲載自筆原稿より",
    "*出典: マイルヴァ・マリッチから友人への手紙、ISBN 0-691-08584-8"
  ].join("\n")
);
assert.strictEqual(citations.length, 1);
assert.ok(citations[0].text.indexOf("わたくしといふ現象") !== -1);

const ryoma = parseWikiquotePage(
  "坂本龍馬",
  "*日本を今一度せんたくいたし申候 Wikisource文久3年6月29日坂本乙女宛"
);
assert.strictEqual(ryoma.length, 1);
assert.strictEqual(ryoma[0].text, "日本を今一度せんたくいたし申候");

assert.strictEqual(poolForSource("stock", QUOTES, parsed).length, QUOTES.length);
assert.strictEqual(poolForSource("net", QUOTES, parsed).length, parsed.length);
assert.strictEqual(
  poolForSource("both", QUOTES, parsed).length,
  QUOTES.length + parsed.length
);

function memoryStorage(initial) {
  const data = Object.assign({}, initial);
  return {
    getItem: function (key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem: function (key, value) {
      data[key] = String(value);
    }
  };
}

const storage = memoryStorage();
assert.strictEqual(readStoredSource(storage), "both");
writeStoredSource("net", storage);
assert.strictEqual(readStoredSource(storage), "net");

const stockQuote = quoteForToday(
  QUOTES,
  "2026-09-14",
  null,
  "stock",
  function () {
    return 0.2;
  }
);
writeStoredOverride("2026-09-14", parsed[0].id, storage, "net");
const netToday = quoteForToday(
  parsed,
  "2026-09-14",
  readStoredOverride(storage),
  "net"
);
assert.strictEqual(netToday.id, parsed[0].id);
const stockStill = quoteForToday(
  QUOTES,
  "2026-09-14",
  readStoredOverride(storage),
  "stock",
  function () {
    return 0.2;
  }
);
assert.strictEqual(
  stockStill.id,
  stockQuote.id,
  "net override does not change stock"
);

console.log("ok — net parser and source modes");
