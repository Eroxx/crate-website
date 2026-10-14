// One place for the Discord invite. Paste the link between the quotes and every
// Discord button on every page uses it; until then they lead to the Support page.
var DISCORD = "https://discord.gg/QUtsNJUvNV";

(function () {
  if (DISCORD) {
    document.querySelectorAll("[data-discord]").forEach(function (a) {
      a.href = DISCORD; a.target = "_blank"; a.rel = "noopener";
    });
  } else {
    document.querySelectorAll("[data-discord-soon]").forEach(function (el) { el.hidden = false; });
    document.querySelectorAll("[data-discord-live]").forEach(function (el) { el.hidden = true; });
  }

  // Videos with a light and a dark version, like the screenshots.
  var vids = document.querySelectorAll("video[data-themed]");
  if (vids.length && window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var pick = function () {
      vids.forEach(function (v) {
        var base = "img/" + v.getAttribute("data-themed") + (mq.matches ? "-dark" : "");
        if (v.currentSrc && v.currentSrc.indexOf(base + ".mp4") !== -1) return;
        v.poster = base + "-poster.webp";
        v.muted = true; v.src = base + ".mp4"; v.load();
        if (still) { v.removeAttribute("autoplay"); v.controls = true; return; }
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      });
    };
    pick();
    if (mq.addEventListener) mq.addEventListener("change", pick);
  }
})();

// Support email: fill in to show it on the Support page.
var SUPPORT_EMAIL = "support@cratemusicapp.com";
(function () {
  var row = document.querySelector("[data-email]");
  if (!row || !SUPPORT_EMAIL) return;
  row.hidden = false;
  document.getElementById("email").textContent = SUPPORT_EMAIL;
  document.getElementById("copy-email").addEventListener("click", function () {
    var b = this;
    var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(SUPPORT_EMAIL).then(done, function () {});
  });
})();

// The Clerk's counter: a request slip shows the receipt for that request.
(function () {
  var slips = document.querySelectorAll(".slip[data-i]");
  if (!slips.length) return;
  var receipts = document.querySelectorAll(".receipt[data-i]");
  slips.forEach(function (s) {
    s.addEventListener("click", function () {
      slips.forEach(function (o) { o.setAttribute("aria-selected", o === s ? "true" : "false"); });
      receipts.forEach(function (r) { r.hidden = r.getAttribute("data-i") !== s.getAttribute("data-i"); });
      // On a phone the receipt sits under the slips: bring it into view.
      if (window.matchMedia("(max-width:900px)").matches) {
        var shown = document.querySelector('.receipt[data-i="' + s.getAttribute("data-i") + '"]');
        if (shown) shown.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });
})();

// Every screenshot opens full size: click it, then click anywhere or press Esc.
// Pictures carry their dark copy, so the one shown is the one on the page.
(function () {
  var shots = [].filter.call(document.querySelectorAll("img"), function (img) {
    var w = parseInt(img.getAttribute("width") || "0", 10);
    return w >= 500 && !img.closest("#deck, .store-badge, .brand, a, button");
  });
  if (!shots.length) return;
  var box = document.createElement("div");
  box.className = "zoom"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Screenshot, full size");
  var big = document.createElement("img"); big.alt = "";
  var close = document.createElement("button"); close.type = "button"; close.className = "zoom-close"; close.textContent = "Close";
  box.appendChild(big); box.appendChild(close); document.body.appendChild(box);
  var last = null;
  function open(img) {
    last = img; big.src = img.currentSrc || img.src; big.alt = img.alt || "";
    box.hidden = false; document.documentElement.classList.add("zoomed"); close.focus();
  }
  function shut() {
    box.hidden = true; document.documentElement.classList.remove("zoomed");
    if (last) { try { last.focus({ preventScroll: true }); } catch (e) {} }
  }
  shots.forEach(function (img) {
    img.classList.add("zoomable"); img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.addEventListener("click", function () { open(img); });
    img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img); } });
  });
  box.addEventListener("click", shut);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) shut(); });
})();
