// ウィクショナリー日本語版から、四字熟語・故事成語・諺・慣用句を取る。
// 表記・読み・意味がそろった項目だけを残す。
var WORD_CACHE_MS = 7 * 24 * 60 * 60 * 1000;
var WORD_SAMPLE = 40;
var WORD_MIN = 8;
var WORD_API =
  "https://ja.wiktionary.org/w/api.php?action=query&format=json&origin=*";
var WORD_KINDS = ["yojijukugo", "koji", "kotowaza", "kanyouku"];
var WORD_CACHE_KEYS = {
  yojijukugo: "meigen-net-yoji-v1",
  koji: "meigen-net-koji-v1",
  kotowaza: "meigen-net-kotowaza-v1",
  kanyouku: "meigen-net-kanyou-v1"
};
var WORD_CATEGORIES = {
  yojijukugo: "カテゴリ:四字熟語",
  koji: "カテゴリ:故事成語",
  kotowaza: "カテゴリ:日本語 ことわざ",
  kanyouku: "カテゴリ:日本語 慣用句"
};

function kataToHira(text) {
  var out = "";
  var s = String(text || "");
  for (var i = 0; i < s.length; i++) {
    var code = s.charCodeAt(i);
    if (code >= 0x30a1 && code <= 0x30f6) out += String.fromCharCode(code - 0x60);
    else out += s.charAt(i);
  }
  return out;
}

function asReading(raw) {
  var h = kataToHira(raw).replace(/[\s　・、。，,.！？!?「」『』（）()]/g, "");
  if (!/^[ぁ-んー]+$/.test(h)) return "";
  if (h.length < 2 || h.length > 60) return "";
  return h;
}

function isFourKanjiTitle(title) {
  var chars = Array.from(title || "");
  if (chars.length !== 4) return false;
  for (var i = 0; i < chars.length; i++) {
    var ch = chars[i];
    if (/[ぁ-んァ-ン0-9A-Za-z]/.test(ch)) return false;
    if (ch.length === 1 && ch.charCodeAt(0) < 128) return false;
  }
  return true;
}

function isKojiTitle(title) {
  if (!title || title === "故事成語" || title === "四字熟語") return false;
  if (title.indexOf(":") !== -1) return false;
  var n = Array.from(title).length;
  return n >= 2 && n <= 30;
}

function isPhraseTitle(title) {
  if (!title || title.indexOf(":") !== -1) return false;
  if (
    title === "ことわざ" ||
    title === "諺" ||
    title === "慣用句" ||
    title === "故事成語" ||
    title === "四字熟語" ||
    title === "成句"
  ) {
    return false;
  }
  var chars = Array.from(title);
  if (chars.length < 2 || chars.length > 40) return false;
  var jp = 0;
  for (var i = 0; i < chars.length; i++) {
    var ch = chars[i];
    if (/[A-Za-z]/.test(ch)) return false;
    if (/[ぁ-んァ-ン\u3400-\u9fff]/.test(ch)) jp++;
  }
  return jp >= 2;
}

function titleOk(kind, title) {
  if (kind === "yojijukugo") return isFourKanjiTitle(title);
  if (kind === "koji") return isKojiTitle(title);
  if (kind === "kotowaza" || kind === "kanyouku") return isPhraseTitle(title);
  return false;
}

function stripWordWiki(text) {
  var s = String(text || "");
  s = s.replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, "");
  s = s.replace(/<ref\b[^>]*\/>/gi, "");
  s = s.replace(/<small>[\s\S]*?<\/small>/gi, "");
  s = s.replace(/\{\{ruby\|([\s\S]*?)\}\}/g, function (_, inner) {
    var pipe = inner.lastIndexOf("|");
    return pipe === -1 ? inner : inner.slice(0, pipe);
  });
  s = s.replace(/\{\{おくりがな2\|([^|}]+)\|[^|}]*\|([^|}]+)\|[^}]*\}\}/g, "$1$2");
  s = s.replace(/\{\{おくりがな\|([^|}]+)\|([^|}]+)(?:\|[^}]*)?\}\}/g, "$1$2");
  s = s.replace(/\{\{ふりがな\|([^|}]+)\|[^}]*\}\}/g, "$1");
  s = s.replace(/\{\{(?:w|wikipedia)\|([^{}]+)\}\}/g, function (_, inner) {
    var parts = inner.split("|");
    return parts[parts.length - 1];
  });
  var prev;
  do {
    prev = s;
    s = s.replace(/\{\{[^{}]*\}\}/g, "");
  } while (s !== prev);
  s = s.replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, "$1");
  s = s.replace(/'''?/g, "");
  s = s.replace(/<[^>]+>/g, "");
  s = s.replace(/\[https?:\/\/[^\s\]]+\s*([^\]]*)\]/g, "$1");
  s = s.replace(/（[ぁ-んァ-ンー\s]{1,6}）/g, "");
  s = s.replace(/\s+/g, " ").trim();
  s = s.replace(/参考[:：]\s*$/g, "").trim();
  return s;
}

function readingFromHead(head) {
  var lines = String(head || "").split(/\r?\n/);
  var s = "";
  for (var i = 0; i < lines.length; i++) {
    if (
      lines[i].indexOf("ふりがな") !== -1 ||
      lines[i].indexOf("おくりがな") !== -1 ||
      lines[i].indexOf("{{ruby") !== -1
    ) {
      s = lines[i];
      break;
    }
  }
  if (!s) return "";
  s = s.replace(/\{\{ふりがな\|[^|}]*\|([^|}]+)(?:\|[^}]*)?\}\}/g, "$1");
  s = s.replace(/\{\{ruby\|([\s\S]*?)\}\}/g, function (_, inner) {
    var pipe = inner.lastIndexOf("|");
    return pipe === -1 ? "" : inner.slice(pipe + 1);
  });
  s = s.replace(/\{\{おくりがな2\|[^|}]*\|([^|}]*)\|([^|}]*)\|[^|}]*\}\}/g, "$1$2");
  s = s.replace(/\{\{おくりがな\|[^|}]*\|[^|}]*\|([^|}]+)\}\}/g, "$1");
  var prev;
  do {
    prev = s;
    s = s.replace(/\{\{[^{}]*\}\}/g, "");
  } while (s !== prev);
  s = s.replace(/\[\[[^\]]*\]\]/g, "");
  s = s.replace(/'''?/g, "");
  return asReading(kataToHira(s).replace(/[^ぁ-んー]/g, ""));
}

function minReadingLength(title) {
  return Array.from(String(title || "").replace(/[、。，,！？!?]/g, "")).length;
}

function shortenMeaning(text) {
  var s = String(text || "").replace(/\s+/g, " ").trim();
  if (s.length <= 140) return s;
  var cut = s.slice(0, 140);
  var idx = cut.lastIndexOf("。");
  if (idx >= 40) return cut.slice(0, idx + 1);
  return cut.replace(/[、,]$/, "") + "。";
}

function isGoodMeaning(text) {
  if (!text || text.length < 8) return false;
  if (/[\[\]{}|]/.test(text)) return false;
  if (/https?:|wikipedia|カテゴリ|Category/i.test(text)) return false;
  if (/日本語に同じ/.test(text) && text.length < 24) return false;
  if (/[のがをに]が、/.test(text)) return false;
  var marks = text.match(/[ぁ-んァ-ン\u3400-\u9fff]/g);
  if (!marks || marks.length < 6) return false;
  return true;
}

function extractJaSection(wikitext) {
  var text = String(wikitext || "");
  var match = /^==\s*(?:\{\{\s*(?:L\|)?ja\s*\}\}|日本語)\s*==\s*$/m.exec(text);
  if (!match) return null;
  var start = match.index + match[0].length;
  var rest = text.slice(start);
  var next = /^==[^=].*==\s*$/m.exec(rest);
  var body = next ? rest.slice(0, next.index) : rest;
  return { preambleAndJa: text.slice(0, start + body.length), body: body };
}

function pushReading(cands, type, raw) {
  var value = asReading(raw);
  if (!value) return;
  cands.push({ type: type, value: value });
}

function collectReadings(scope, jaBody) {
  var cands = [];
  var head = String(jaBody || "").split(/^#/m)[0];
  var paren = /[（(]([^）)]{1,48})[）)]/g;
  var found;
  while ((found = paren.exec(head))) {
    var inner = found[1];
    var kun = /訓読[:：]\s*([ぁ-んァ-ンー\s・　]+)/.exec(inner);
    if (kun) pushReading(cands, "kun", kun[1]);
    var beforeKun = inner.split(/訓読[:：]/)[0];
    pushReading(cands, "paren", beforeKun);
  }
  var idiom = /\{\{ja-idiom\|([^|}]+)/g;
  while ((found = idiom.exec(jaBody))) pushReading(cands, "idiom", found[1]);
  var pron = /\{\{ja-pron\|([^|}]+)/g;
  while ((found = pron.exec(jaBody))) pushReading(cands, "pron", found[1]);
  var noun = /\{\{ja-noun(?:-suru)?\|([^}]+)\}\}/g;
  while ((found = noun.exec(jaBody))) {
    var first = found[1].split(/[、,，]/)[0].replace(/\[\[|\]\]/g, "");
    if (first.indexOf("|") !== -1) first = first.split("|").pop();
    pushReading(cands, "noun", first);
  }
  var jads = /\{\{ja-DEFAULTSORT\|([^}]+)\}\}/g;
  while ((found = jads.exec(scope))) pushReading(cands, "jads", found[1]);
  var kds = /\{\{kana-DEFAULTSORT\|([^}]+)\}\}/g;
  while ((found = kds.exec(scope))) pushReading(cands, "kds", found[1]);
  var ds = /\{\{(?:DEFAULTSORT|デフォルトソート)[:|]([^}]+)\}\}/g;
  while ((found = ds.exec(scope))) {
    var parts = found[1].trim().split(/\s+/);
    var kana = [];
    for (var i = 0; i < parts.length; i++) {
      if (asReading(parts[i])) kana.push(parts[i]);
    }
    if (kana.length) pushReading(cands, "ds", kana[kana.length - 1]);
  }
  pushReading(cands, "head", readingFromHead(head));
  return cands;
}

function chooseReading(cands) {
  var bonus = { kun: 6, head: 5, noun: 5, idiom: 5, pron: 4, paren: 4, jads: 3, kds: 3, ds: 0 };
  var best = null;
  var bestScore = -1;
  for (var i = 0; i < cands.length; i++) {
    var score = cands[i].value.length * 2 + (bonus[cands[i].type] || 0);
    if (score > bestScore) {
      best = cands[i].value;
      bestScore = score;
    }
  }
  return best;
}

function extractMeaning(jaBody) {
  var lines = String(jaBody || "").split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    if (!/^#(?![*#:])/.test(lines[i])) continue;
    var text = shortenMeaning(stripWordWiki(lines[i].replace(/^#\s*/, "")));
    if (isGoodMeaning(text)) return text;
  }
  return "";
}

function extractOrigin(scope) {
  var re = /\[\[(?:Category|カテゴリ):由来[ _]+([^\]]+)\]\]/g;
  var names = [];
  var found;
  while ((found = re.exec(scope))) {
    var name = found[1].split("|")[0].trim();
    if (!name || name.length > 16) continue;
    if (/その他|不明|未詳|漢文/.test(name)) continue;
    if (names.indexOf(name) === -1) names.push(name);
    if (names.length === 2) break;
  }
  if (!names.length) return "";
  var bits = [];
  for (var i = 0; i < names.length; i++) {
    bits.push(names[i].charAt(0) === "『" ? names[i] : "『" + names[i] + "』");
  }
  return bits.join("・");
}

function wordNetId(kind, text) {
  var s = kind + "\n" + text;
  var h = 5381;
  for (var i = 0; i < s.length; i++) {
    h = (h << 5) + h + s.charCodeAt(i);
    h |= 0;
  }
  return "net-" + kind + "-" + (h >>> 0).toString(16);
}

function parseWiktionaryEntry(title, wikitext, kind) {
  if (!titleOk(kind, title)) return null;
  var ja = extractJaSection(wikitext);
  if (!ja) return null;
  var reading = chooseReading(collectReadings(ja.preambleAndJa, ja.body));
  var meaning = extractMeaning(ja.body);
  if (!reading || !meaning) return null;
  if (reading.length < minReadingLength(title)) return null;
  return {
    id: wordNetId(kind, title),
    kind: kind,
    text: title,
    reading: reading,
    meaning: meaning,
    origin: extractOrigin(ja.preambleAndJa),
    net: true
  };
}

function sampleWordTitles(titles, n, rand) {
  var roll = rand || Math.random;
  var copy = (titles || []).slice();
  for (var i = copy.length - 1; i > 0; i--) {
    var j = Math.floor(roll() * (i + 1));
    var tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  if (!n || n >= copy.length) return copy;
  return copy.slice(0, n);
}

function tagQuote(item) {
  return {
    id: item.id,
    text: item.text,
    speaker: item.speaker || "",
    source: item.source || "",
    kind: "quote"
  };
}

function selectSide(source, local, remote) {
  var stock = local || [];
  var net = remote || [];
  if (source === "net") return net.slice();
  if (source === "both") return stock.concat(net);
  return stock.slice();
}

function expressionsFor(source, stock, net) {
  var out = [];
  for (var i = 0; i < WORD_KINDS.length; i++) {
    var key = WORD_KINDS[i];
    out = out.concat(selectSide(source, stock[key], net[key]));
  }
  return out;
}

function poolForKind(kind, source, stockLists, netLists) {
  var stock = stockLists || {};
  var net = netLists || {};
  var quotes = selectSide(source, stock.quote, net.quote).map(tagQuote);
  if (kind === "yojijukugo" || kind === "koji" || kind === "kotowaza" || kind === "kanyouku") {
    return selectSide(source, stock[kind], net[kind]);
  }
  if (kind === "expression") return expressionsFor(source, stock, net);
  if (kind === "all") return quotes.concat(expressionsFor(source, stock, net));
  return quotes;
}

function wordFetchJson(url) {
  return fetch(url).then(function (res) {
    if (!res.ok) throw new Error("words-http-" + res.status);
    return res.json();
  }).then(function (data) {
    if (data && data.error) throw new Error("words-api");
    return data;
  });
}

function fetchCategoryTitles(category) {
  var titles = [];
  function page(cont) {
    var url =
      WORD_API +
      "&list=categorymembers&cmlimit=500&cmnamespace=0&cmtitle=" +
      encodeURIComponent(category);
    if (cont) url += "&cmcontinue=" + encodeURIComponent(cont);
    return wordFetchJson(url).then(function (data) {
      var members = (data.query && data.query.categorymembers) || [];
      for (var i = 0; i < members.length; i++) titles.push(members[i].title);
      var next = data["continue"] && data["continue"].cmcontinue;
      if (next) return page(next);
      return titles;
    });
  }
  return page("");
}

function fetchWikitexts(titles) {
  var groups = [];
  for (var i = 0; i < titles.length; i += 20) groups.push(titles.slice(i, i + 20));
  var chain = Promise.resolve([]);
  groups.forEach(function (group) {
    chain = chain.then(function (all) {
      var url =
        WORD_API +
        "&prop=revisions&rvslots=main&rvprop=content&redirects=1&titles=" +
        encodeURIComponent(group.join("|"));
      return wordFetchJson(url).then(function (data) {
        var pages = (data.query && data.query.pages) || {};
        var keys = Object.keys(pages);
        var found = [];
        for (var n = 0; n < keys.length; n++) {
          var page = pages[keys[n]];
          if (!page || page.missing || !page.revisions || !page.revisions[0]) continue;
          var revision = page.revisions[0];
          var content =
            (revision.slots && revision.slots.main && revision.slots.main["*"]) ||
            revision["*"] ||
            "";
          found.push({ title: page.title, wikitext: content });
        }
        return all.concat(found);
      });
    });
  });
  return chain;
}

function dedupeWords(items) {
  var seen = {};
  var unique = [];
  for (var i = 0; i < items.length; i++) {
    if (seen[items[i].text]) continue;
    seen[items[i].text] = true;
    unique.push(items[i]);
  }
  unique.sort(function (a, b) {
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });
  return unique;
}

function wordStore(storage) {
  if (storage) return storage;
  if (typeof localStorage !== "undefined") return localStorage;
  return null;
}

function readWordCache(kind, storage) {
  try {
    var store = wordStore(storage);
    if (!store) return null;
    var raw = store.getItem(WORD_CACHE_KEYS[kind]);
    if (!raw) return null;
    var data = JSON.parse(raw);
    if (!data || !Array.isArray(data.quotes) || typeof data.fetchedAt !== "number") return null;
    if (Date.now() - data.fetchedAt > WORD_CACHE_MS) return null;
    if (data.quotes.length < WORD_MIN) return null;
    for (var i = 0; i < data.quotes.length; i++) {
      var item = data.quotes[i];
      if (!item || item.kind !== kind || !item.text || !item.reading || !item.meaning) return null;
    }
    return data.quotes;
  } catch (e) {
    return null;
  }
}

function writeWordCache(kind, items, storage) {
  try {
    var store = wordStore(storage);
    if (!store) return;
    store.setItem(
      WORD_CACHE_KEYS[kind],
      JSON.stringify({ fetchedAt: Date.now(), quotes: items })
    );
  } catch (e) {}
}

function loadNetWords(kind, storage) {
  if (WORD_KINDS.indexOf(kind) === -1) return Promise.resolve([]);
  var cached = readWordCache(kind, storage);
  if (cached) return Promise.resolve(cached);
  return fetchCategoryTitles(WORD_CATEGORIES[kind]).then(function (titles) {
    var filtered = [];
    for (var i = 0; i < titles.length; i++) {
      if (titleOk(kind, titles[i])) filtered.push(titles[i]);
    }
    if (filtered.length < WORD_MIN) throw new Error("words-too-few");
    return fetchWikitexts(sampleWordTitles(filtered, WORD_SAMPLE));
  }).then(function (pages) {
    var parsed = [];
    for (var i = 0; i < pages.length; i++) {
      var item = parseWiktionaryEntry(pages[i].title, pages[i].wikitext, kind);
      if (item) parsed.push(item);
    }
    parsed = dedupeWords(parsed);
    if (parsed.length < WORD_MIN) throw new Error("words-too-few");
    writeWordCache(kind, parsed, storage);
    return parsed;
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    parseWiktionaryEntry: parseWiktionaryEntry,
    stripWordWiki: stripWordWiki,
    sampleWordTitles: sampleWordTitles,
    poolForKind: poolForKind,
    isFourKanjiTitle: isFourKanjiTitle,
    isPhraseTitle: isPhraseTitle,
    loadNetWords: loadNetWords,
    readWordCache: readWordCache,
    WORD_CACHE_KEYS: WORD_CACHE_KEYS
  };
}
