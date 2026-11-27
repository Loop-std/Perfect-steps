import { NOTES } from "../lib/data";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section id="notes" className="notes">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Sample notes</p>
          <h2 className="display notes__title">What the room can feel like.</h2>
          <p className="notes__intro">
            Written for this demo. These are not reviews from students, and they are not verified feedback.
          </p>
        </Reveal>
        <div className="notes__grid">
          {NOTES.map((note) => (
            <Reveal key={note.who}>
              <blockquote>
                <p className="display notes__quote">{note.quote}</p>
                <footer className="notes__who">{note.who}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
