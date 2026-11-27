import { EXPECTATIONS, INSTRUCTORS } from "../lib/data";

export function Instructors() {
  return (
    <section id="instructors" className="section section--ivory">
      <div className="campaign-wrap">
        <p className="kicker">Demo faculty</p>
        <h2 className="campaign-display section__title">The people in the room.</h2>
        <p className="lede muted">
          Stand-in profiles for the layout. Names, photographs, and biographies are samples, not a record of the
          studio’s teachers.
        </p>
        <ol className="points">
          {EXPECTATIONS.map((item, index) => (
            <li key={item.title}>
              <p className="kicker accent">0{index + 1}</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="people__list">
          {INSTRUCTORS.map((person, index) => {
            const flip = index % 2 === 1;
            return (
              <article key={person.name} className="people__card">
                <img
                  src={person.image}
                  alt={person.alt}
                  loading="lazy"
                  className={`people__photo${flip ? " people__photo--end" : ""}`}
                />
                <div className={`people__copy${flip ? " people__copy--start" : " people__copy--end"}`}>
                  <p className="kicker accent">{person.specialty}</p>
                  <h3 className="campaign-display people__name">{person.name}</h3>
                  <p className="people__bio soft">{person.bio}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
