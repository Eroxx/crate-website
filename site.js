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

  // The hero video has a light and a dark version, like the screenshots.
  var v = document.getElementById("reel");
  if (v && window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var pick = function () {
      var dark = mq.matches, want = dark ? "img/backroom-stand-dark.mp4" : "img/backroom-stand.mp4";
      if (v.currentSrc && v.currentSrc.indexOf(want) !== -1) return;
      v.poster = dark ? "img/backroom-stand-dark-poster.webp" : "img/backroom-stand-poster.webp";
      v.muted = true; v.src = want; v.load(); var p = v.play(); if (p && p.catch) p.catch(function () {});
    };
    pick();
    if (mq.addEventListener) mq.addEventListener("change", pick);
    var still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) { v.removeAttribute("autoplay"); v.pause(); v.controls = true; }
  }
})();

// Support email: fill in to show it on the Support page.
var SUPPORT_EMAIL = "cratemusicdev@gmail.com";
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
