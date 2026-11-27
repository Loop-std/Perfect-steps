import { useRef, useState, useEffect } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCE } from "../lib/data";

function useStack() {
  const reduced = useReducedMotion();
  const [stack, setStack] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setStack(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return stack || reduced === true;
}

export function Experience() {
  const stack = useStack();
  return stack ? <ExperienceStack /> : <ExperiencePin />;
}

function ExperienceStack() {
  return (
    <section id="experience" className="experience">
      {EXPERIENCE.map((item) => (
        <article key={item.id} className="experience__beat">
          <img src={item.image} alt={item.alt} className="experience__photo" />
          <div className="experience__wash experience__wash--stack" />
          <div className="wrap experience__copy">
            <h2 className="display stack__title">{item.title}</h2>
            <p className="experience__body">{item.body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function ExperiencePin() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const index = useTransform(scrollYProgress, (value) =>
    Math.min(EXPERIENCE.length - 1, Math.floor(value * EXPERIENCE.length)),
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = index.on("change", (value) => setActive(value));
    return () => unsub();
  }, [index]);

  const item = EXPERIENCE[active];

  return (
    <section ref={ref} id="experience" className="experience experience--pin">
      <div className="experience__sticky">
        {EXPERIENCE.map((beat, beatIndex) => (
          <img
            key={beat.id}
            src={beat.image}
            alt={beatIndex === active ? beat.alt : ""}
            className={`experience__photo${beatIndex === active ? "" : " is-off"}`}
          />
        ))}
        <div className="experience__wash experience__wash--pin" />
        <div className="wrap experience__panel">
          <p className="experience__kicker">In the room</p>
          <div className="experience__layout">
            <ol className="experience__index">
              {EXPERIENCE.map((beat, beatIndex) => (
                <li key={beat.id} className={beatIndex === active ? "is-on" : undefined}>
                  {beat.title}
                </li>
              ))}
            </ol>
            <div className="experience__current">
              <h2 className="display">{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
