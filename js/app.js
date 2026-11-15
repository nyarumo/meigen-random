(function () {
  var dateEl = document.getElementById("date");
  var titleEl = document.querySelector(".mast h1");
  var quoteEl = document.querySelector("main.quote");
  var labelEl = document.getElementById("kind-label");
  var textEl = document.getElementById("quote-text");
  var readingEl = document.getElementById("reading");
  var speakerEl = document.getElementById("speaker");
  var meaningEl = document.getElementById("meaning");
  var sourceEl = document.getElementById("source");
  var anotherBtn = document.getElementById("another");
  var shareX = document.getElementById("share-x");
  var sourceButtons = document.querySelectorAll("[data-source]");
  var kindButtons = document.querySelectorAll("[data-kind]");
  var current = null;
  var mode = "both";
  var kind = "quote";
  var netQuotes = [];
  var netWords = { yojijukugo: [], koji: [], kotowaza: [], kanyouku: [] };
  var quotePromise = null;
  var wordPromises = { yojijukugo: null, koji: null, kotowaza: null, kanyouku: null };
  var ticket = 0;
  var WORD_KINDS = ["yojijukugo", "koji", "kotowaza", "kanyouku"];

  var HEADINGS = {
    quote: "今日の名言・格言",
    expression: "今日の慣用表現",
    all: "今日のことば"
  };
  var ANOTHER = {
    quote: "別の名言",
    expression: "別の慣用表現",
    all: "別のもの"
  };
  var LABELS = {
    quote: "名言",
    yojijukugo: "四字熟語",
    koji: "故事成語",
    kotowaza: "諺",
    kanyouku: "慣用句"
  };

  function setPressed(buttons, attr, value) {
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var selected = btn.getAttribute(attr) === value;
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
    }
  }

  function applyChrome() {
    var heading = HEADINGS[kind] || HEADINGS.quote;
    titleEl.textContent = heading;
    document.title = heading;
    anotherBtn.textContent = ANOTHER[kind] || ANOTHER.quote;
    setPressed(sourceButtons, "data-source", mode);
    setPressed(kindButtons, "data-kind", kind);
  }

  function wordSourceLine(item) {
    var parts = [];
    if (item.origin) parts.push("由来：" + item.origin);
    if (item.net) parts.push("ウィクショナリー日本語版");
    return parts.join("／");
  }

  function renderStatus(message) {
    current = null;
    quoteEl.setAttribute("data-kind", kind);
    textEl.classList.add("is-status");
    textEl.classList.remove("is-word");
    textEl.classList.remove("is-long");
    textEl.textContent = message;
    labelEl.hidden = true;
    labelEl.textContent = "";
    readingEl.hidden = true;
    readingEl.textContent = "";
    meaningEl.hidden = true;
    meaningEl.textContent = "";
    speakerEl.textContent = "";
    sourceEl.textContent = "";
    shareX.hidden = true;
    shareX.removeAttribute("href");
  }

  function render(item, iso) {
    var itemKind = item.kind || "quote";
    var isWord = WORD_KINDS.indexOf(itemKind) !== -1;
    current = item;
    quoteEl.setAttribute("data-kind", itemKind);
    textEl.classList.remove("is-status");
    textEl.classList.toggle("is-word", isWord);
    textEl.classList.toggle("is-long", isWord && Array.from(item.text || "").length > 6);
    dateEl.dateTime = iso;
    dateEl.textContent = formatJstDateJa(iso);
    labelEl.hidden = false;
    labelEl.textContent = LABELS[itemKind] || "";
    textEl.textContent = item.text;
    if (isWord) {
      readingEl.hidden = false;
      readingEl.textContent = item.reading || "";
      meaningEl.hidden = !item.meaning;
      meaningEl.textContent = item.meaning || "";
      speakerEl.textContent = "";
      sourceEl.textContent = wordSourceLine(item);
    } else {
      readingEl.hidden = true;
      readingEl.textContent = "";
      meaningEl.hidden = true;
      meaningEl.textContent = "";
      speakerEl.textContent = item.speaker || "";
      sourceEl.textContent = item.source || "";
    }
    shareX.href = xIntentUrl(item);
    shareX.hidden = false;
  }

  function viewPool() {
    return poolForKind(
      kind,
      mode,
      {
        quote: QUOTES,
        yojijukugo: YOJIJUKUGO,
        koji: KOJISEIGO,
        kotowaza: KOTOWAZA,
        kanyouku: KANYOUKU
      },
      {
        quote: netQuotes,
        yojijukugo: netWords.yojijukugo,
        koji: netWords.koji,
        kotowaza: netWords.kotowaza,
        kanyouku: netWords.kanyouku
      }
    );
  }

  function remember(iso, item) {
    if (kind === "quote") {
      writeStoredOverride(iso, item.id, null, mode);
      return;
    }
    writeKindPick(iso, kind, item.id, null, mode);
  }

  function storedOverride() {
    if (kind === "quote") return readStoredOverride();
    return kindPickOverride(kind, mode);
  }

  function ensureQuoteNet() {
    if (netQuotes.length) return Promise.resolve(netQuotes);
    if (quotePromise) return quotePromise;
    quotePromise = loadNetQuotes().then(
      function (quotes) {
        netQuotes = quotes;
        quotePromise = null;
        return quotes;
      },
      function (err) {
        quotePromise = null;
        throw err;
      }
    );
    return quotePromise;
  }

  function ensureWordNet(which) {
    if (netWords[which].length) return Promise.resolve(netWords[which]);
    if (wordPromises[which]) return wordPromises[which];
    wordPromises[which] = loadNetWords(which).then(
      function (items) {
        netWords[which] = items;
        wordPromises[which] = null;
        return items;
      },
      function (err) {
        wordPromises[which] = null;
        throw err;
      }
    );
    return wordPromises[which];
  }

  function needs(name) {
    if (mode === "stock") return false;
    if (name === "quote") return (kind === "quote" || kind === "all") && !netQuotes.length;
    if (WORD_KINDS.indexOf(name) !== -1) {
      return (kind === "expression" || kind === "all") && !netWords[name].length;
    }
    return false;
  }

  function showFromPool(iso) {
    var items = viewPool();
    var item = quoteForToday(items, iso, storedOverride(), mode);
    if (!item) {
      renderStatus("ネットから取得できませんでした");
      return;
    }
    remember(iso, item);
    render(item, iso);
  }

  function showToday() {
    var my = ++ticket;
    var iso = getJstDateIso();
    dateEl.dateTime = iso;
    dateEl.textContent = formatJstDateJa(iso);
    applyChrome();

    var jobs = [];
    if (needs("quote")) jobs.push(ensureQuoteNet());
    for (var n = 0; n < WORD_KINDS.length; n++) {
      if (needs(WORD_KINDS[n])) jobs.push(ensureWordNet(WORD_KINDS[n]));
    }
    if (!jobs.length) {
      showFromPool(iso);
      return;
    }

    renderStatus(
      kind === "quote" ? "ネットから今日の名言を取っています" : "ネットから取得しています"
    );
    Promise.all(
      jobs.map(function (job) {
        return job.then(
          function () {
            return true;
          },
          function () {
            return false;
          }
        );
      })
    ).then(function () {
      if (my !== ticket) return;
      showFromPool(iso);
    });
  }

  anotherBtn.addEventListener("click", function () {
    if (!current) return;
    var iso = getJstDateIso();
    var next = pickReplacement(viewPool(), current.id);
    if (!next) return;
    remember(iso, next);
    render(next, iso);
  });

  for (var i = 0; i < sourceButtons.length; i++) {
    sourceButtons[i].addEventListener("click", function (event) {
      var nextMode = event.currentTarget.getAttribute("data-source");
      if (!nextMode || nextMode === mode) return;
      mode = nextMode;
      showToday();
    });
  }

  for (var k = 0; k < kindButtons.length; k++) {
    kindButtons[k].addEventListener("click", function (event) {
      var nextKind = event.currentTarget.getAttribute("data-kind");
      if (!nextKind || nextKind === kind) return;
      kind = nextKind;
      showToday();
    });
  }

  showToday();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
})();
