import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { GALLERY } from "../lib/data";

export function Gallery() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0 });

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, x: event.clientX, left: el.scrollLeft };
    el.setPointerCapture(event.pointerId);
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };

  const onUp = () => {
    drag.current.active = false;
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el) return;
    const step = Math.round(el.clientWidth * 0.7);
    if (event.key === "ArrowRight") {
      event.preventDefault();
      el.scrollBy({ left: step, behavior: "auto" });
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      el.scrollBy({ left: -step, behavior: "auto" });
    }
  };

  return (
    <section id="gallery" className="section section--ink">
      <div className="campaign-wrap gallery__head">
        <div>
          <p className="kicker on-dark">Life at the academy</p>
          <h2 className="campaign-display section__title">Rehearsal, class, and the night itself.</h2>
        </div>
        <p className="gallery__hint">Drag, or use the arrow keys. These are demo photographs.</p>
      </div>
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Studio photographs"
        className="film gallery__strip"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
      >
        {GALLERY.map((frame) => (
          <figure key={frame.src} className={`gallery__frame ${frame.wide ? "gallery__frame--wide" : "gallery__frame--tall"}`}>
            <img src={frame.src} alt={frame.alt} loading="lazy" draggable={false} />
            <figcaption aria-hidden className="gallery__cap">
              {frame.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
