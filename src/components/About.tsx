import { EXPECTATIONS } from "../lib/data";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section section--sheet">
      <div className="wrap">
        <div className="about__grid">
          <Reveal className="about__copy">
            <p className="eyebrow">The academy</p>
            <h2 className="display about__title">Practice first. The showing comes after.</h2>
            <p className="about__lead">
              Prefect Steps is a studio for people who want clear teaching, repetition that sticks, and a room that feels
              alive.
            </p>
            <p className="about__body">
              We teach steps, musicality, and how to be in a group. You should leave a class able to repeat the phrase,
              not only impressed for three minutes.
            </p>
          </Reveal>
          <Reveal className="about__photo" delay={0.08}>
            <img src="/media/n.jpg" alt="Dancers rehearsing a phrase together in a studio" />
          </Reveal>
        </div>

        <p className="display about__quote">Repetition is the teaching. Performance is what it turns into.</p>

        <div className="about__points">
          {EXPECTATIONS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <h3 className="display">{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
