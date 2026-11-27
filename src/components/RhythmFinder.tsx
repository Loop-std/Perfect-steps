import { useState, type FormEvent } from "react";
import { LEVELS, type Level } from "../lib/data";
import { recommendRhythm, RHYTHM_EVENT, RHYTHM_GOALS, type RhythmAnswers, type RhythmPreference, type RhythmResult } from "../lib/rhythmRecommendation";
import { openPlanner } from "../lib/studioExperience";
import { scrollToId } from "../lib/scroll";
import { RhythmDolls } from "./RhythmDolls";
import "../styles/rhythm-finder.css";

export function RhythmFinder() {
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState<RhythmAnswers["goal"] | "">("");
  const [level, setLevel] = useState<Level | "">("");
  const [outcome, setOutcome] = useState<{ result: RhythmResult | null; answers: RhythmAnswers } | null>(null);
  const [error, setError] = useState("");

  function discover(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const number = Number(age);
    if (!age.trim() || !Number.isInteger(number) || number < 4 || number > 80 || !goal || !level) {
      setError("Enter an age from 4 to 80 and choose both your motivation and experience.");
      return;
    }
    setError("");
    const answers = { age: number, goal, level };
    setOutcome({ result: recommendRhythm(answers), answers });
  }

  function ask(destination: "trial" | "schedule") {
    if (!outcome?.result) return;
    const detail: RhythmPreference = {
      style: outcome.result.program.name,
      level: outcome.answers.level,
      age: outcome.answers.age,
    };
    window.dispatchEvent(new CustomEvent<RhythmPreference>(RHYTHM_EVENT, { detail }));
    if (destination === "schedule") openPlanner(detail);
    scrollToId(destination);
  }

  return (
    <section id="rhythm" className="section section--ivory rhythm" aria-labelledby="rhythm-title">
      <div className="campaign-wrap rhythm__layout">
        <div className="rhythm__intro">
          <p className="kicker">The rhythm finder / 01</p>
          <h2 id="rhythm-title" className="campaign-display rhythm__title">Every body<br /> has a <span>rhythm.</span></h2>
          <p className="rhythm__lede">The first step is not about getting it right. It is about finding the movement that feels like you.</p>
          <RhythmDolls />
        </div>
        <div className="rhythm__panel">
          <p className="kicker rhythm__eyebrow">Your starting point / 3 questions</p>
          {!outcome ? (
            <form onSubmit={discover} noValidate className="rhythm__form">
              <fieldset>
                <legend><span>01</span> What brings you to dance?</legend>
                <div className="rhythm__options">
                  {RHYTHM_GOALS.map((item) => (
                    <label className="rhythm__option" key={item.id}>
                      <input type="radio" name="rhythm-goal" value={item.id} checked={goal === item.id} onChange={() => setGoal(item.id)} required />
                      <span><strong>{item.label}</strong><small>{item.note}</small></span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend><span>02</span> How much have you danced?</legend>
                <div className="rhythm__levels">
                  {LEVELS.map((item) => (
                    <label className="rhythm__option rhythm__level" key={item}>
                      <input type="radio" name="rhythm-level" value={item} checked={level === item} onChange={() => setLevel(item)} required />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="rhythm__age" htmlFor="rhythm-age"><span><b>03</b> How old is the dancer?</span>
                <input id="rhythm-age" type="number" min={4} max={80} step={1} value={age} onChange={(event) => setAge(event.target.value)} placeholder="Age in years" required />
              </label>
              {error && <p className="rhythm__error" role="alert">{error}</p>}
              <button type="submit" className="rhythm__submit">Discover my rhythm <span aria-hidden="true">↗</span></button>
            </form>
          ) : (
            <div className="rhythm__result" aria-live="polite">
              {outcome.result ? (
                <>
                  <img className="rhythm__result-image" src={outcome.result.program.image} alt={outcome.result.program.alt} />
                  <p className="kicker rhythm__eyebrow">Your suggested program</p>
                  <h3 className="campaign-display">{outcome.result.program.name}</h3>
                  <p>{outcome.result.reason}</p>
                  <p className="rhythm__meta">{outcome.result.program.ages} / {outcome.answers.level}</p>
                  <button type="button" className="rhythm__submit" onClick={() => ask("schedule")}>Explore matching weekend classes <span aria-hidden="true">↗</span></button>
                  <button type="button" className="rhythm__reset" onClick={() => ask("trial")}>Go directly to trial enquiry</button>
                </>
              ) : (
                <>
                  <h3 className="campaign-display">Your rhythm is your own.</h3>
                  <p>No sample program matches this age and experience yet. The academy can help you explore suitable options.</p>
                  <button type="button" className="rhythm__submit" onClick={() => scrollToId("trial")}>Explore trial enquiries <span aria-hidden="true">↗</span></button>
                </>
              )}
              <button className="rhythm__reset" type="button" onClick={() => { setOutcome(null); setError(""); }}>Change my answers</button>
            </div>
          )}
          <p className="rhythm__fine">Demo recommendation only. No data is sent, and no class is reserved.</p>
        </div>
      </div>
    </section>
  );
}
