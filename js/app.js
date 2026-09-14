(function () {
  var dateEl = document.getElementById("date");
  var textEl = document.getElementById("quote-text");
  var speakerEl = document.getElementById("speaker");
  var sourceEl = document.getElementById("source");
  var anotherBtn = document.getElementById("another");
  var sourceButtons = document.querySelectorAll("[data-source]");
  var current = null;
  var mode = "both";
  var netQuotes = [];
  var netPromise = null;

  function setModeButtons() {
    for (var i = 0; i < sourceButtons.length; i++) {
      var btn = sourceButtons[i];
      var selected = btn.getAttribute("data-source") === mode;
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
    }
  }

  function renderStatus(message) {
    current = null;
    textEl.classList.add("is-status");
    textEl.textContent = message;
    speakerEl.textContent = "";
    sourceEl.textContent = "";
  }

  function render(quote, iso) {
    current = quote;
    textEl.classList.remove("is-status");
    dateEl.dateTime = iso;
    dateEl.textContent = formatJstDateJa(iso);
    textEl.textContent = quote.text;
    speakerEl.textContent = quote.speaker;
    sourceEl.textContent = quote.source;
  }

  function pool() {
    return poolForSource(mode, QUOTES, netQuotes);
  }

  function ensureNet() {
    if (netQuotes.length) return Promise.resolve(netQuotes);
    if (netPromise) return netPromise;
    netPromise = loadNetQuotes()
      .then(function (quotes) {
        netQuotes = quotes;
        return quotes;
      })
      .then(
        function (quotes) {
          netPromise = null;
          return quotes;
        },
        function (err) {
          netPromise = null;
          throw err;
        }
      );
    return netPromise;
  }

  function showToday() {
    var iso = getJstDateIso();
    dateEl.dateTime = iso;
    dateEl.textContent = formatJstDateJa(iso);
    setModeButtons();

    if (mode === "stock") {
      showFromPool(iso);
      return;
    }

    if (!netQuotes.length) {
      renderStatus("ネットから今日の名言を取っています");
      ensureNet().then(
        function () {
          showFromPool(iso);
        },
        function () {
          if (mode === "both") {
            showFromPool(iso);
            return;
          }
          renderStatus("ネットから取得できませんでした");
        }
      );
      return;
    }

    showFromPool(iso);
  }

  function showFromPool(iso) {
    var quotes = pool();
    var quote = quoteForToday(quotes, iso, readStoredOverride(), mode);
    if (!quote) {
      renderStatus("ネットから取得できませんでした");
      return;
    }
    writeStoredOverride(iso, quote.id, null, mode);
    render(quote, iso);
  }

  anotherBtn.addEventListener("click", function () {
    if (!current) return;
    var iso = getJstDateIso();
    var next = pickReplacement(pool(), current.id);
    if (!next) return;
    writeStoredOverride(iso, next.id, null, mode);
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

  showToday();
})();
