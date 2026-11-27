export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offset = id === "top" ? 0 : (document.querySelector(".nav")?.getBoundingClientRect().height ?? 0) + 12;
  if (window.__lenis && !reduced) {
    window.__lenis.scrollTo(el, { offset: -offset, duration: 1.15 });
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: reduced ? "auto" : "smooth" });
  }
}
