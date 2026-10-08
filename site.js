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
