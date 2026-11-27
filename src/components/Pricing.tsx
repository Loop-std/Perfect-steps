import { PLANS, STYLE_EVENT } from "../lib/data";
import { scrollToId } from "../lib/scroll";

export function Pricing() {
  return (
    <section id="pricing" className="section section--ivory">
      <div className="campaign-wrap fees">
        <div className="fees__intro">
          <p className="kicker">Sample fees</p>
          <h2 className="campaign-display section__title section__title--fit">A place in the room.</h2>
          <p className="lede muted">Sample figures for the layout. They are not an offer, a discount, or a confirmed fee.</p>
        </div>
        <ul className="fees__plans">
          {PLANS.map((plan) => (
            <li key={plan.name} className="fees__plan">
              <h3 className="campaign-display">{plan.name}</h3>
              <p className="fees__price">{plan.price}</p>
              <p className="fees__detail soft">{plan.detail}</p>
              <ul className="fees__includes">
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="fees__ask">
          <button
            type="button"
            className="ask"
            onClick={() => {
              window.dispatchEvent(new CustomEvent(STYLE_EVENT, { detail: "" }));
              scrollToId("trial");
            }}
          >
            Ask about a class
          </button>
        </div>
      </div>
    </section>
  );
}
