import { useMemo, useState } from "react";
import { CLASSES, LEVELS, STYLE_EVENT, STYLES, TIMING_EVENT, type Level } from "../lib/data";
import { scrollToId } from "../lib/scroll";

const levelClass: Record<Level, string> = {
  Beginner: "level--beginner",
  Intermediate: "level--intermediate",
  Advanced: "level--advanced",
};

export function Schedule() {
  const [style, setStyle] = useState("All");
  const [level, setLevel] = useState("All");

  const rows = useMemo(
    () =>
      CLASSES.filter((slot) => (style === "All" || slot.style === style) && (level === "All" || slot.level === level)),
    [style, level],
  );

  const ask = (slot: (typeof CLASSES)[number]) => {
    window.dispatchEvent(new CustomEvent(STYLE_EVENT, { detail: slot.style }));
    window.dispatchEvent(new CustomEvent(TIMING_EVENT, { detail: `${slot.day} ${slot.time}, ${slot.style}` }));
    scrollToId("trial");
  };

  return (
    <section id="schedule" className="section section--paper">
      <div className="campaign-wrap">
        <p className="kicker">Sample timetable</p>
        <h2 className="campaign-display section__title">A week in the studio.</h2>
        <p className="lede muted">
          Demo classes only. This is not a live list of open spots, and it does not reserve a place.
        </p>

        <fieldset className="filters">
          <legend className="kicker">Dance style</legend>
          <div className="chips">
            {["All", ...STYLES].map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={style === item}
                className={`chip${style === item ? " is-on" : ""}`}
                onClick={() => setStyle(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="filters">
          <legend className="kicker">Level</legend>
          <div className="chips">
            {["All", ...LEVELS].map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={level === item}
                className={`chip${level === item ? " is-on" : ""}`}
                onClick={() => setLevel(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <ul className="schedule__cards">
          {rows.map((slot) => (
            <li key={slot.id}>
              <p className="campaign-display schedule__style">{slot.style}</p>
              <p className="schedule__when">
                {slot.day}
                <span className="slash slash--mute">/</span>
                {slot.time}
              </p>
              <p className={`schedule__meta ${levelClass[slot.level]}`}>
                {slot.level}
                <span className="slash slash--faint">/</span>
                {slot.ages}
              </p>
              <button type="button" className="enquire" onClick={() => ask(slot)}>
                Enquire
              </button>
            </li>
          ))}
        </ul>

        <div className="schedule__table-wrap">
          <table className="schedule__table">
            <thead className="kicker">
              <tr>
                <th>Style</th>
                <th>Day</th>
                <th>Time</th>
                <th>Level</th>
                <th>Ages</th>
                <th>
                  <span className="sr-only">Enquire</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.style}</td>
                  <td>{slot.day}</td>
                  <td>{slot.time}</td>
                  <td className={levelClass[slot.level]}>{slot.level}</td>
                  <td>{slot.ages}</td>
                  <td>
                    <button type="button" className="enquire enquire--xs" onClick={() => ask(slot)}>
                      Enquire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? <p className="empty">No sample class matches those filters.</p> : null}
      </div>
    </section>
  );
}
