var SOURCE_KEY = "meigen-source-v1";
var NET_CACHE_KEY = "meigen-net-cache-v3";
var NET_CACHE_MS = 7 * 24 * 60 * 60 * 1000;
var NET_API =
  "https://ja.wikiquote.org/w/api.php?action=query&prop=revisions&rvslots=main&rvprop=content&format=json&origin=*&redirects=1";

var NET_PAGES = [
  "夏目漱石",
  "福澤諭吉",
  "宮沢賢治",
  "芥川龍之介",
  "松尾芭蕉",
  "鴨長明",
  "吉田兼好",
  "道元",
  "親鸞",
  "聖徳太子",
  "宮本武蔵",
  "坂本龍馬",
  "吉田松陰",
  "新渡戸稲造",
  "岡倉覚三",
  "与謝野晶子",
  "松下幸之助",
  "本田宗一郎",
  "渋沢栄一",
  "正岡子規",
  "太宰治",
  "中島敦",
  "石川啄木",
  "寺田寅彦",
  "アルベルト・アインシュタイン",
  "孔子",
  "老子",
  "孟子",
  "荘子",
  "孫子",
  "ソクラテス",
  "アリストテレス",
  "プラトン",
  "ルキウス・アンナエウス・セネカ",
  "ウィリアム・シェイクスピア",
  "ヨハン・ヴォルフガング・フォン・ゲーテ",
  "マハトマ・ガンジー",
  "ネルソン・マンデラ",
  "エイブラハム・リンカーン",
  "ウィンストン・チャーチル",
  "スティーブ・ジョブズ",
  "アイザック・ニュートン",
  "イマヌエル・カント",
  "オスカー・ワイルド",
  "マーク・トウェイン",
  "フリードリヒ・ニーチェ",
  "ブレーズ・パスカル",
  "ルネ・デカルト",
  "レフ・トルストイ",
  "ナポレオン・ボナパルト",
  "カール・マルクス",
  "フランツ・カフカ",
  "釈迦",
  "ヘレン・ケラー",
  "ベンジャミン・フランクリン",
  "フランクリン・デラノ・ルーズベルト",
  "アーネスト・ヘミングウェイ",
  "レオナルド・ダ・ヴィンチ",
  "マーティン・ルーサー・キング・ジュニア"
];

var SKIP_HEADING =
  /不確か|誤って|帰属|ではない|Attributed|Quotes about|外部リンク|脚注|関連項目|参考文献/;

function stripWiki(text) {
  var s = String(text || "");
  s = s.replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, "");
  s = s.replace(/<br\s*\/?>/gi, "");
  s = s.replace(/'''([^']+)'''/g, "$1");
  s = s.replace(/''([^']+)''/g, "$1");
  s = s.replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, "$1");
  s = s.replace(/\{\{[^}]+\}\}/g, "");
  s = s.replace(/<[^>]+>/g, "");
  s = s.replace(/'{2,}/g, "");
  s = s.replace(/\[https?:\/\/[^\s\]]+[^\]]*\]/g, "");
  s = s.replace(/([\u3400-\u9fff]{1,4})\|([\u3400-\u9fff]{1,4})/g, "$1");
  return s.replace(/\s+/g, " ").trim();
}

function cjkCount(text) {
  var m = String(text).match(/[\u3040-\u30ff\u3400-\u9fff]/g);
  return m ? m.length : 0;
}

function isUsableNetQuote(text) {
  if (!text || text.length < 8 || text.length > 140) return false;
  if (/https?:\/\//i.test(text) || /wikipedia/i.test(text)) return false;
  if (/^出典[:：]/.test(text) || /ISBN/i.test(text)) return false;
  if (/掲載|出版社|大学出版|自筆原稿/.test(text)) return false;
  if (/より[。．です]*$/.test(text) || /において$/.test(text)) return false;
  if (/^『/.test(text) || /p\.\s*\d+/.test(text)) return false;
  if (/(冒頭|所収|補遺|辞世)/.test(text) && text.length < 50) return false;
  if (/をんで/.test(text)) return false;
  if (/[…\.]{2,}$/.test(text) && text.length < 24) return false;
  var cjk = cjkCount(text);
  if (cjk < 4) return false;
  if (cjk / text.length < 0.2) return false;
  return true;
}

function formatNetSource(source) {
  if (!source) return "ウィキクォート";
  var book = source.match(/『[^』]+』/);
  if (source.length > 70) {
    return book ? "ウィキクォート / " + book[0] : "ウィキクォート";
  }
  return "ウィキクォート / " + source;
}

function netQuoteId(speaker, text) {
  var s = speaker + "\n" + text;
  var h = 5381;
  for (var i = 0; i < s.length; i++) {
    h = (h << 5) + h + s.charCodeAt(i);
    h |= 0;
  }
  return "net-" + (h >>> 0).toString(16);
}

function parseWikiquotePage(speaker, wikitext) {
  var quotes = [];
  var skip = false;
  var lines = String(wikitext || "").split(/\r?\n/);
  var i = 0;
  while (i < lines.length) {
    var line = lines[i];
    var heading = /^(=+)\s*(.+?)\s*\1\s*$/.exec(line);
    if (heading) {
      skip = SKIP_HEADING.test(heading[2]);
      i += 1;
      continue;
    }
    if (skip) {
      i += 1;
      continue;
    }
    var star = /^(\*{1,2})\s*(?!:)(.*)$/.exec(line);
    if (star) {
      var depth = star[1].length;
      var next = lines[i + 1] || "";
      if (depth === 1 && /^\*{2}\s*(?!:)/.test(next)) {
        i += 1;
        continue;
      }
      var text = stripWiki(star[2]);
      var source = "";
      var j = i + 1;
      var sourceRe = depth === 1 ? /^\*:/ : /^\*{2}:/;
      while (j < lines.length && sourceRe.test(lines[j])) {
        var piece = stripWiki(lines[j].replace(/^\*+:\s*/, ""));
        if (piece) source += (source ? " " : "") + piece;
        j += 1;
      }
      var dashed = text.split(/\s*--\s*/);
      if (dashed.length > 1) {
        text = dashed[0];
        if (!source) source = dashed.slice(1).join(" ");
      }
      var wikiSrc = text.split(/\s*Wikisource/i);
      if (wikiSrc.length > 1) {
        text = wikiSrc[0].trim();
        if (!source) source = "Wikisource" + wikiSrc.slice(1).join(" ");
      }
      if (isUsableNetQuote(text)) {
        quotes.push({
          id: netQuoteId(speaker, text),
          text: text,
          speaker: speaker,
          source: formatNetSource(source)
        });
      }
      i = j;
      continue;
    }
    i += 1;
  }
  return quotes;
}

function parseWikiquoteResponse(data) {
  var out = [];
  var pages = (data && data.query && data.query.pages) || {};
  var keys = Object.keys(pages);
  for (var i = 0; i < keys.length; i++) {
    var page = pages[keys[i]];
    if (!page || page.missing || !page.revisions || !page.revisions[0]) continue;
    var revision = page.revisions[0];
    var content =
      (revision.slots && revision.slots.main && revision.slots.main["*"]) ||
      revision["*"] ||
      "";
    var parsed = parseWikiquotePage(page.title, content);
    for (var q = 0; q < parsed.length; q++) out.push(parsed[q]);
  }
  var seen = {};
  var unique = [];
  for (var n = 0; n < out.length; n++) {
    if (seen[out[n].id]) continue;
    seen[out[n].id] = true;
    unique.push(out[n]);
  }
  unique.sort(function (a, b) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
  return unique;
}

function chunk(items, size) {
  var groups = [];
  for (var i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

function fetchJson(url) {
  return fetch(url).then(function (res) {
    if (!res.ok) throw new Error("net-http-" + res.status);
    return res.json();
  });
}

function fetchNetQuotesFromApi() {
  var groups = chunk(NET_PAGES, 25);
  var chain = Promise.resolve([]);
  groups.forEach(function (titles) {
    chain = chain.then(function (all) {
      var url = NET_API + "&titles=" + encodeURIComponent(titles.join("|"));
      return fetchJson(url).then(function (data) {
        return all.concat(parseWikiquoteResponse(data));
      });
    });
  });
  return chain.then(function (quotes) {
    var seen = {};
    var unique = [];
    for (var i = 0; i < quotes.length; i++) {
      if (seen[quotes[i].id]) continue;
      seen[quotes[i].id] = true;
      unique.push(quotes[i]);
    }
    unique.sort(function (a, b) {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    if (unique.length < 20) throw new Error("net-too-few");
    return unique;
  });
}

function readJsonKey(key, storage) {
  try {
    var store = storage;
    if (!store && typeof localStorage !== "undefined") store = localStorage;
    if (!store) return null;
    var raw = store.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function writeJsonKey(key, value, storage) {
  try {
    var store = storage;
    if (!store && typeof localStorage !== "undefined") store = localStorage;
    if (!store) return;
    store.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function readStoredSource(storage) {
  var value = readJsonKey(SOURCE_KEY, storage);
  if (value === "stock" || value === "net" || value === "both") return value;
  if (value && typeof value === "object" && value.source) {
    if (value.source === "stock" || value.source === "net" || value.source === "both") {
      return value.source;
    }
  }
  try {
    var store = storage;
    if (!store && typeof localStorage !== "undefined") store = localStorage;
    if (store) {
      var raw = store.getItem(SOURCE_KEY);
      if (raw === "stock" || raw === "net" || raw === "both") return raw;
    }
  } catch (e) {}
  return "both";
}

function writeStoredSource(source, storage) {
  if (source !== "stock" && source !== "net" && source !== "both") source = "stock";
  try {
    var store = storage;
    if (!store && typeof localStorage !== "undefined") store = localStorage;
    if (!store) return;
    store.setItem(SOURCE_KEY, source);
  } catch (e) {}
}

function readNetCache(storage) {
  var data = readJsonKey(NET_CACHE_KEY, storage);
  if (!data || !Array.isArray(data.quotes) || typeof data.fetchedAt !== "number") {
    return null;
  }
  if (Date.now() - data.fetchedAt > NET_CACHE_MS) return null;
  if (data.quotes.length < 20) return null;
  return data.quotes;
}

function writeNetCache(quotes, storage) {
  writeJsonKey(
    NET_CACHE_KEY,
    { fetchedAt: Date.now(), quotes: quotes },
    storage
  );
}

function poolForSource(source, stock, netQuotes) {
  if (source === "net") return netQuotes || [];
  if (source === "both") return (stock || []).concat(netQuotes || []);
  return stock || [];
}

function loadNetQuotes(storage) {
  var cached = readNetCache(storage);
  if (cached) return Promise.resolve(cached);
  return fetchNetQuotesFromApi().then(function (quotes) {
    writeNetCache(quotes, storage);
    return quotes;
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SOURCE_KEY: SOURCE_KEY,
    NET_CACHE_KEY: NET_CACHE_KEY,
    NET_PAGES: NET_PAGES,
    stripWiki: stripWiki,
    isUsableNetQuote: isUsableNetQuote,
    parseWikiquotePage: parseWikiquotePage,
    parseWikiquoteResponse: parseWikiquoteResponse,
    poolForSource: poolForSource,
    readStoredSource: readStoredSource,
    writeStoredSource: writeStoredSource,
    readNetCache: readNetCache,
    writeNetCache: writeNetCache,
    loadNetQuotes: loadNetQuotes
  };
}
