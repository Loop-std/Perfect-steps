import { PROGRAMS, STYLE_EVENT } from "../lib/data";
import { scrollToId } from "../lib/scroll";

const shots = ["0", "1", "2", "3", "4", "5"];

export function Programs() {
  const ask = (name: string) => {
    window.dispatchEvent(new CustomEvent(STYLE_EVENT, { detail: name }));
    scrollToId("trial");
  };

  return (
    <section id="programs" className="section section--ivory">
      <div className="campaign-wrap">
        <p className="kicker">Programs</p>
        <h2 className="campaign-display section__title section__title--program">Six ways into the room.</h2>
        <p className="lede lede--lg muted">
          Sample categories for this demo. The list lives in one file, ready to swap when the studio confirms what it
          teaches.
        </p>

        <div className="programs__list">
          {PROGRAMS.map((program, index) => {
            const flip = index % 2 === 1;
            return (
              <article key={program.id} className="programs__row">
                <div className={`programs__shot programs__shot--${shots[index]}${flip ? " programs__shot--end" : ""}`}>
                  <img src={program.image} alt={program.alt} loading="lazy" />
                </div>
                <div className={`programs__copy${flip ? " programs__copy--start" : ""}`}>
                  <p className="kicker accent">0{index + 1}</p>
                  <h3 className="campaign-display">{program.name}</h3>
                  <p className="programs__body soft">{program.description}</p>
                  <p className="meta">
                    {program.ages}
                    <span className="slash">/</span>
                    {program.level}
                  </p>
                  <button type="button" className="ask" onClick={() => ask(program.name)}>
                    Ask about {program.name}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
