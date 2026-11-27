import { useState } from "react";
import { FAQS } from "../lib/data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section section--paper">
      <div className="campaign-wrap faq__layout">
        <div className="faq__aside">
          <p className="kicker">Questions</p>
          <h2 className="campaign-display section__title section__title--fit">Before you come in.</h2>
        </div>
        <div className="faq__list">
          {FAQS.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q} className="faq__item">
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    {item.q}
                    <span aria-hidden className="faq__mark">
                      {expanded ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div className={`faq__panel${expanded ? " is-open" : ""}`}>
                  <div>
                    <p className="faq__a">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="faq__end" />
        </div>
      </div>
    </section>
  );
}
