// Shared, non-visual rendering logic used by both designs/classic and
// designs/snazzy, so behavior can't drift between them the way content can't
// either (see content.js). Each design's own <script> block still builds its
// own HTML strings (since markup/classes differ per design), but calls into
// these helpers for the parts that must behave identically everywhere.

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initFooterYear(elementId) {
  document.getElementById(elementId).textContent = new Date().getFullYear();
}

function initCopyEmailButton(buttonId, email, messages) {
  document.getElementById(buttonId).addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast(messages.toastCopied);
    } catch {
      toast(messages.toastFailed);
    }
  });
}

function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.position = "fixed";
  t.style.left = "50%";
  t.style.bottom = "18px";
  t.style.transform = "translateX(-50%)";
  t.style.padding = "10px 12px";
  t.style.borderRadius = "999px";
  t.style.border = "1px solid rgba(255,255,255,.14)";
  t.style.background = "rgba(0,0,0,.62)";
  t.style.backdropFilter = "blur(10px)";
  t.style.color = "rgba(255,255,255,.92)";
  t.style.fontSize = "13px";
  t.style.zIndex = "999";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1600);
}
