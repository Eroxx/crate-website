// The App Store link, in one place. Leave it empty while the app is in beta. The day the app
// is live, paste its App Store URL (https://apps.apple.com/...) between the quotes and publish:
// every [data-store-live] element (Apple's official badge) appears, linked to it, and every
// [data-store-soon] element ("Coming to the App Store" and the like) disappears.
var APP_STORE = "https://apps.apple.com/us/app/crate-music-library/id6814223022";

// The public TestFlight link, for as long as there is a beta. Every [data-beta]
// element is wired to it, and the day APP_STORE is filled in they all disappear:
// once the app is on the store, a TestFlight link is the wrong door.
var TESTFLIGHT = "https://testflight.apple.com/join/EVGQ2bp2";
(function () {
  document.querySelectorAll("[data-beta]").forEach(function (el) {
    if (APP_STORE || !TESTFLIGHT) { el.hidden = true; return; }
    el.hidden = false;
    if (el.tagName === "A") { el.href = TESTFLIGHT; el.target = "_blank"; el.rel = "noopener"; }
  });
})();
(function () {
  if (!APP_STORE) return;
  document.querySelectorAll("[data-store-live]").forEach(function (el) {
    el.hidden = false;
    if (el.tagName === "A") { el.href = APP_STORE; el.target = "_blank"; el.rel = "noopener"; }
  });
  document.querySelectorAll("[data-store-soon]").forEach(function (el) { el.hidden = true; });
})();
