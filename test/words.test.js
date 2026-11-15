const assert = require("assert");
const { QUOTES } = require("../js/quotes.js");
const { YOJIJUKUGO } = require("../js/yojijukugo.js");
const { KOJISEIGO } = require("../js/kojiseigo.js");
const { KOTOWAZA } = require("../js/kotowaza.js");
const { KANYOUKU } = require("../js/kanyouku.js");
const {
  readStoredOverride,
  writeStoredOverride,
  writeKindPick,
  kindPickOverride,
  quoteForToday,
  composeXPost
} = require("../js/today.js");
const {
  parseWiktionaryEntry,
  stripWordWiki,
  sampleWordTitles,
  poolForKind,
  isPhraseTitle
} = require("../js/words-net.js");

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

function xWeightedOk(s) {
  var n = 0;
  for (var i = 0; i < s.length; i++) n += s.charCodeAt(i) <= 0x7f ? 1 : 2;
  return n <= 280;
}

assert.ok(YOJIJUKUGO.length >= 30, "about 30 yojijukugo");
assert.ok(KOJISEIGO.length >= 30, "about 30 koji");
assert.ok(KOTOWAZA.length >= 30, "about 30 kotowaza");
assert.ok(KANYOUKU.length >= 30, "about 30 kanyouku");

const quoteIds = {};
QUOTES.forEach(function (q) {
  quoteIds[q.id] = true;
});

function checkWord(item, kind) {
  assert.strictEqual(item.kind, kind);
  assert.ok(item.id && !quoteIds[item.id], "unique id " + item.id);
  assert.ok(/^[a-z0-9-]+$/.test(item.id), "ascii id " + item.id);
  assert.ok(item.text, "text " + item.id);
  assert.ok(/^[ぁ-んー]+$/.test(item.reading), "hiragana reading " + item.id);
  assert.ok(item.meaning && item.meaning.length >= 8, "meaning " + item.id);
  if (kind === "yojijukugo") {
    assert.strictEqual(Array.from(item.text).length, 4, "four characters " + item.text);
    assert.ok(!/[ぁ-んァ-ン]/.test(item.text), "kanji title " + item.text);
  }
  if (kind === "koji") {
    assert.ok(item.origin && item.origin.indexOf("『") !== -1, "origin " + item.id);
  }
}

const seenText = {};
YOJIJUKUGO.forEach(function (item) {
  checkWord(item, "yojijukugo");
  assert.ok(!seenText[item.text], "dup " + item.text);
  seenText[item.text] = item.kind;
});
KOJISEIGO.forEach(function (item) {
  checkWord(item, "koji");
  assert.ok(!seenText[item.text], "dup " + item.text);
  seenText[item.text] = item.kind;
});
KOTOWAZA.forEach(function (item) {
  checkWord(item, "kotowaza");
  assert.ok(!seenText[item.text], "dup " + item.text);
  seenText[item.text] = item.kind;
});
KANYOUKU.forEach(function (item) {
  checkWord(item, "kanyouku");
  assert.ok(!seenText[item.text], "dup " + item.text);
  seenText[item.text] = item.kind;
});

const ids = YOJIJUKUGO.concat(KOJISEIGO, KOTOWAZA, KANYOUKU).map(function (item) {
  return item.id;
});
assert.strictEqual(new Set(ids).size, ids.length, "word ids are unique");

assert.strictEqual(
  stripWordWiki(
    "{{ふりがな|鳥|とり}}や{{ふりがな|獣|けもの}}が{{ふりがな|子|こ}}を{{おくりがな2|産|う|ん|うむ}}で{{おくりがな|育|てる|そだてる}}こと。"
  ),
  "鳥や獣が子を産んで育てること。"
);

const onko = [
  "{{DEFAULTSORT:おんこちしん}}",
  "=={{ja}}==",
  "=== {{idiom}} ===",
  "[[Category:四字熟語]]",
  "{{jachars}}（おんこちしん）",
  "# 昔のことを[[研究]]して、新しい[[知識]]を得ること。",
  "====由来====",
  "[[Category:由来 論語]]"
].join("\n");
const onkoItem = parseWiktionaryEntry("温故知新", onko, "yojijukugo");
assert.ok(onkoItem);
assert.strictEqual(onkoItem.reading, "おんこちしん");
assert.ok(onkoItem.meaning.indexOf("新しい知識") !== -1);
assert.strictEqual(onkoItem.origin, "『論語』");
assert.strictEqual(onkoItem.net, true);
assert.strictEqual(parseWiktionaryEntry("故事成語", onko, "koji"), null);
assert.strictEqual(parseWiktionaryEntry("Wiktionary:依頼", onko, "koji"), null);

const mujun = [
  "{{kana-DEFAULTSORT|むじゅん}}",
  "=={{L|ja}}==",
  "{{ja-pron|むじゅん|acc=0}}",
  "# [[つじつま]]が合わないこと。",
  "[[Category:故事成語]]",
  "[[Category:由来 韓非子]]"
].join("\n");
const mujunItem = parseWiktionaryEntry("矛盾", mujun, "koji");
assert.strictEqual(mujunItem.reading, "むじゅん");
assert.ok(mujunItem.meaning.indexOf("つじつま") !== -1);
assert.strictEqual(mujunItem.origin, "『韓非子』");
assert.strictEqual(parseWiktionaryEntry("矛盾", mujun, "yojijukugo"), null);

const fukusui = [
  "{{kana-DEFAULTSORT|ふくすいぼんにかえらず}}",
  "== 日本語 ==",
  "'''[[覆]] [[水]]（ふくすい）[[盆]]（ぼん）に返らず'''",
  "# 一度してしまった事は二度と元には戻らない。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("覆水盆に返らず", fukusui, "koji").reading,
  "ふくすいぼんにかえらず"
);

const gishin = [
  "{{DEFAULTSORT:きしんあんき}}",
  "== {{ja}} ==",
  "'''疑心暗鬼'''（ぎしんあんき）",
  "# 妄想にとらわれるほど強く疑うこと。",
  "[[Category:由来 列子]]"
].join("\n");
const gishinItem = parseWiktionaryEntry("疑心暗鬼", gishin, "yojijukugo");
assert.strictEqual(gishinItem.reading, "ぎしんあんき");
assert.strictEqual(gishinItem.origin, "『列子』");

const sanken = [
  "{{ja-DEFAULTSORT|さんけんぶんりつ}}",
  "=={{ja}}==",
  "{{ja-noun|さんけんぶんりつ、さんけんぶんりゅう}}",
  "# 国家の権力を立法・行政・司法の三つに分けること。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("三権分立", sanken, "yojijukugo").reading,
  "さんけんぶんりつ"
);

const saiou = [
  "{{DEFAULTSORT:さいおうかうま}}",
  "=={{ja}}==",
  "'''塞翁が馬'''（サイオウがウマ）",
  "# 一時の幸不幸は、すぐに逆の立場へ変わりうるということ。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("塞翁が馬", saiou, "koji").reading,
  "さいおうがうま"
);

const shika = [
  "=={{ja}}==",
  "{{jachar|指|鹿|為|馬}}（しろくいば　訓読:しかをさしてうまとなす）",
  "# 道理に合わないことを、権力を背景に無理に言いくるめる。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("指鹿為馬", shika, "yojijukugo").reading,
  "しかをさしてうまとなす"
);

const ufuku = [
  "{{kana-DEFAULTSORT|うふうよういく}}",
  "=={{L|ja}}==",
  "# {{ふりがな|鳥|とり}}や{{ふりがな|獣|けもの}}が{{ふりがな|子|こ}}を{{おくりがな2|産|う|ん|うむ}}で{{おくりがな|育|てる|そだてる}}こと。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("嫗伏孕鬻", ufuku, "yojijukugo").meaning,
  "鳥や獣が子を産んで育てること。"
);

assert.strictEqual(
  parseWiktionaryEntry("三人成虎", "=={{zh}}==\n# 根も葉もない噂でも本当になる。", "koji"),
  null
);
assert.strictEqual(
  parseWiktionaryEntry("温故知新", "=={{ja}}==\n（おんこちしん）", "yojijukugo"),
  null
);
assert.strictEqual(
  parseWiktionaryEntry("温故知新", "=={{ja}}==\n# 短い。", "yojijukugo"),
  null
);

const iu = [
  "{{DEFAULTSORT:いうはやすし}}",
  "==日本語==",
  "{{おくりがな2|言|い|う|いう}}は{{おくりがな2|易|やす|く|やすい}}{{おくりがな2|行|おこ|なう|おこなう}}は{{おくりがな2|難|かた|し|かたし}}",
  "# 言葉で言うのは簡単でも、実際にするのは難しいことが多い。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("言うは易く行なうは難し", iu, "koji").reading,
  "いうはやすくおこなうはかたし"
);
assert.strictEqual(
  parseWiktionaryEntry(
    "言うは易く行なうは難し",
    "{{DEFAULTSORT:いうはやすし}}\n==日本語==\n言うは易く行なうは難し\n# 言葉で言うのは簡単でも、実際にするのは難しいことが多い。",
    "koji"
  ),
  null
);

const shichiho = [
  "{{kana-DEFAULTSORT|しちほのさい}}",
  "=={{L|ja}}==",
  "[[七]][[歩]]の[[才]]（しちほのさい）",
  "# [[詞章]]の[[才]]の[[すぐれる|優れ]]ていること。{{ruby|[[w:曹植|曹植]]|そうしょく}}が、七歩進む間に詩を作ったとの故事から。"
].join("\n");
const shichihoItem = parseWiktionaryEntry("七歩の才", shichiho, "koji");
assert.strictEqual(shichihoItem.reading, "しちほのさい");
assert.ok(shichihoItem.meaning.indexOf("曹植") !== -1);
assert.ok(shichihoItem.meaning.indexOf("優れている") !== -1);

const mikoshiki = [
  "{{kana-DEFAULTSORT|みこしき}}",
  "=={{L|ja}}==",
  "{{ja-idiom|みこしき}}",
  "# よく[[似ている]]ものの[[たとえ]]。<small>参考：{{Cite book|title=辞典}}</small>"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("巳己巳己", mikoshiki, "yojijukugo").meaning,
  "よく似ているもののたとえ。"
);

const choubun = [
  "== 日本語 ==",
  "'''[[彫]][[文]][[刻]][[鏤]]'''（ちょうぶんこくる）",
  "# 文章を飾ること。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("彫文刻鏤", choubun, "yojijukugo").reading,
  "ちょうぶんこくる"
);

const titles = ["甲", "乙", "丙", "丁", "戊"];
const sampled = sampleWordTitles(titles, 3, function () {
  return 0;
});
assert.deepStrictEqual(
  sampled,
  sampleWordTitles(titles, 3, function () {
    return 0;
  })
);
assert.strictEqual(sampled.length, 3);
assert.deepStrictEqual(titles, ["甲", "乙", "丙", "丁", "戊"]);
sampled.forEach(function (title) {
  assert.ok(titles.indexOf(title) !== -1);
});

assert.strictEqual(isPhraseTitle("ことわざ"), false);
assert.strictEqual(isPhraseTitle("慣用句"), false);
assert.strictEqual(isPhraseTitle("猿も木から落ちる"), true);
assert.strictEqual(isPhraseTitle("Wiktionary:依頼"), false);

const saru = [
  "{{kana-DEFAULTSORT|さるもきからおちる}}",
  "=={{L|ja}}==",
  "{{ja-idiom|さるもきからおちる}}",
  "# その道の名人でも、失敗することがある。"
].join("\n");
const saruItem = parseWiktionaryEntry("猿も木から落ちる", saru, "kotowaza");
assert.strictEqual(saruItem.reading, "さるもきからおちる");
assert.ok(saruItem.meaning.indexOf("失敗") !== -1);
assert.strictEqual(saruItem.kind, "kotowaza");
assert.strictEqual(parseWiktionaryEntry("ことわざ", saru, "kotowaza"), null);
assert.strictEqual(parseWiktionaryEntry("猿も木から落ちる", saru, "yojijukugo"), null);

const ashi = [
  "{{デフォルトソート:あしをあらう}}",
  "=={{ja}}==",
  "{{head|jpn|idiom|head={{ふりがな|足|あし}}を{{おくりがな2|洗|あら|う|あらう}}}}",
  "# 悪い仕事や仲間から抜けて、堅気になる。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("足を洗う", ashi, "kanyouku").reading,
  "あしをあらう"
);
assert.strictEqual(parseWiktionaryEntry("慣用句", ashi, "kanyouku"), null);

const hana = [
  "{{DEFAULTSORT:はなよりたんこ}}",
  "=={{ja}}==",
  "=== ことわざ ===",
  "[[カテゴリ:{{ja}} ことわざ]]",
  "'''{{ふりがな|花|はな}}より{{ふりがな|団子|だんご}}'''",
  "# 風流より実利を重んじること。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("花より団子", hana, "kotowaza").reading,
  "はなよりだんご"
);

const niwatori = [
  "{{kana-DEFAULTSORT|にわとりがさきか、たまごがさきか}}",
  "=={{ja}}==",
  "# 二つの物事のどちらが先か、分からなくなること。"
].join("\n");
assert.strictEqual(
  parseWiktionaryEntry("鶏が先か、卵が先か", niwatori, "kotowaza").reading,
  "にわとりがさきかたまごがさきか"
);
assert.strictEqual(
  parseWiktionaryEntry("足を洗う", "=={{ja}}==\n# 短い。", "kanyouku"),
  null
);

const stock = {
  quote: QUOTES,
  yojijukugo: YOJIJUKUGO,
  koji: KOJISEIGO,
  kotowaza: KOTOWAZA,
  kanyouku: KANYOUKU
};
const emptyNet = {
  quote: [],
  yojijukugo: [],
  koji: [],
  kotowaza: [],
  kanyouku: []
};
assert.strictEqual(poolForKind("quote", "stock", stock, emptyNet).length, QUOTES.length);
assert.strictEqual(poolForKind("quote", "stock", stock, emptyNet)[0].kind, "quote");
assert.strictEqual(
  poolForKind("yojijukugo", "both", stock, emptyNet).length,
  YOJIJUKUGO.length
);
assert.strictEqual(poolForKind("yojijukugo", "net", stock, emptyNet).length, 0);
assert.strictEqual(poolForKind("koji", "net", stock, emptyNet).length, 0);
assert.strictEqual(
  poolForKind("all", "stock", stock, emptyNet).length,
  QUOTES.length +
    YOJIJUKUGO.length +
    KOJISEIGO.length +
    KOTOWAZA.length +
    KANYOUKU.length
);
assert.strictEqual(
  poolForKind("expression", "stock", stock, emptyNet).length,
  YOJIJUKUGO.length + KOJISEIGO.length + KOTOWAZA.length + KANYOUKU.length
);
assert.ok(
  poolForKind("expression", "stock", stock, emptyNet).every(function (item) {
    return item.kind !== "quote";
  })
);
const expressionKinds = {};
poolForKind("expression", "stock", stock, emptyNet).forEach(function (item) {
  expressionKinds[item.kind] = true;
});
assert.deepStrictEqual(expressionKinds, {
  yojijukugo: true,
  koji: true,
  kotowaza: true,
  kanyouku: true
});
const netKoji = [
  {
    id: "net-koji-1",
    kind: "koji",
    text: "ネット故事",
    reading: "ねっとこじ",
    meaning: "ネットから取った故事成語の意味です。",
    origin: "『韓非子』",
    net: true
  }
];
assert.strictEqual(
  poolForKind("koji", "both", stock, { quote: [], yojijukugo: [], koji: netKoji }).length,
  KOJISEIGO.length + 1
);
assert.strictEqual(
  poolForKind("all", "net", stock, { quote: [], yojijukugo: [], koji: netKoji }).length,
  1
);
assert.strictEqual(
  poolForKind("expression", "net", stock, {
    quote: QUOTES,
    yojijukugo: [],
    koji: netKoji,
    kotowaza: [],
    kanyouku: []
  }).length,
  1
);
assert.strictEqual(poolForKind("kotowaza", "net", stock, emptyNet).length, 0);
assert.strictEqual(poolForKind("kanyouku", "stock", stock, emptyNet).length, KANYOUKU.length);

const storage = memoryStorage();
writeStoredOverride("2026-09-14", "keep-me", storage, "both");
writeKindPick("2026-09-14", "yojijukugo", YOJIJUKUGO[0].id, storage, "net");
writeKindPick("2026-09-14", "koji", KOJISEIGO[0].id, storage, "stock");
writeKindPick("2026-09-14", "expression", KOTOWAZA[0].id, storage, "both");
assert.strictEqual(readStoredOverride(storage).id, "keep-me");
assert.strictEqual(readStoredOverride(storage).source, "both");
assert.strictEqual(
  kindPickOverride("yojijukugo", "net", storage).id,
  YOJIJUKUGO[0].id
);
assert.strictEqual(kindPickOverride("yojijukugo", "stock", storage), null);
assert.strictEqual(kindPickOverride("expression", "both", storage).id, KOTOWAZA[0].id);
const kept = quoteForToday(
  KOJISEIGO,
  "2026-09-14",
  kindPickOverride("koji", "stock", storage),
  "stock",
  function () {
    return 0.9;
  }
);
assert.strictEqual(kept.id, KOJISEIGO[0].id);
const nextDay = quoteForToday(
  KOJISEIGO,
  "2026-09-15",
  kindPickOverride("koji", "stock", storage),
  "stock",
  function () {
    return 0;
  }
);
assert.notStrictEqual(nextDay.id, KOJISEIGO[0].id);

const wordPost = composeXPost(KOJISEIGO[KOJISEIGO.length - 1]);
assert.ok(wordPost.indexOf("矛盾") !== -1);
assert.ok(wordPost.indexOf("むじゅん") !== -1);
assert.ok(wordPost.indexOf("つじつま") !== -1);
assert.ok(wordPost.indexOf("韓非子") !== -1);
assert.ok(xWeightedOk(wordPost));
const longPost = composeXPost({
  kind: "koji",
  text: "矛盾",
  reading: "むじゅん",
  meaning: "あ".repeat(200),
  origin: "い".repeat(200)
});
assert.ok(xWeightedOk(longPost));
assert.ok(longPost.indexOf("矛盾") !== -1);
assert.ok(composeXPost(QUOTES[0]).indexOf("「") === 0);
const kotoPost = composeXPost(KOTOWAZA[0]);
assert.ok(kotoPost.indexOf("猿も木から落ちる") !== -1);
assert.ok(kotoPost.indexOf("さるもきからおちる") !== -1);
assert.ok(xWeightedOk(kotoPost));
const kanyouPost = composeXPost(KANYOUKU[0]);
assert.ok(kanyouPost.indexOf("水に流す") !== -1);
assert.ok(kanyouPost.indexOf("みずにながす") !== -1);
assert.ok(xWeightedOk(kanyouPost));

console.log(
  "ok — " +
    YOJIJUKUGO.length +
    " yojijukugo, " +
    KOJISEIGO.length +
    " koji, " +
    KOTOWAZA.length +
    " kotowaza, " +
    KANYOUKU.length +
    " kanyouku"
);
