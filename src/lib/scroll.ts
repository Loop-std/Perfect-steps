export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -12, duration: 1.15 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
