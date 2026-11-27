import { useEffect, useState, type FormEvent } from "react";
import { CLASSES, HOURS, PROGRAMS, STUDIOS, STYLE_EVENT } from "../lib/data";

import { matchesAge, NO_TIMING, SLOT_EVENT, slotLabel, studioName } from "../lib/studioExperience";
import { RHYTHM_EVENT, type RhythmPreference } from "../lib/rhythmRecommendation";

type Fields = {
  name: string;
  age: string;
  guardian: string;
  style: string;
  level: string;
  studio: string;
  timing: string;
  phone: string;
};

const empty: Fields = {
  name: "",
  age: "",
  guardian: "",
  style: "",
  level: "",
  studio: "",
  timing: NO_TIMING,
  phone: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

export function TrialForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Fields | null>(null);
  const [whatsappNote, setWhatsappNote] = useState(false);

  useEffect(() => {
    const onStyle = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail !== "string") return;
      setFields((current) => ({ ...current, style: detail, timing: NO_TIMING }));
      setErrors({});
      setSent(null);
    };
    const onSlot = (event: Event) => {
      const detail = (event as CustomEvent<{ slotId: string; age?: number }>).detail;
      const slot = CLASSES.find((item) => item.id === detail?.slotId);
      if (!slot) return;
      setFields((current) => ({ ...current, studio: slot.studioId, style: slot.style, level: slot.level, timing: slot.id, age: detail.age === undefined ? current.age : String(detail.age) }));
      setErrors({});
      setSent(null);
    };
    const onRhythm = (event: Event) => {
      const detail = (event as CustomEvent<RhythmPreference>).detail;
      if (!detail) return;
      setFields((current) => ({ ...current, age: String(detail.age), style: detail.style, level: detail.level, timing: NO_TIMING, studio: "" }));
      setErrors({});
      setSent(null);
    };
    window.addEventListener(RHYTHM_EVENT, onRhythm);
    window.addEventListener(STYLE_EVENT, onStyle);
    window.addEventListener(SLOT_EVENT, onSlot);
    return () => {
      window.removeEventListener(RHYTHM_EVENT, onRhythm);
      window.removeEventListener(STYLE_EVENT, onStyle);
      window.removeEventListener(SLOT_EVENT, onSlot);
    };
  }, []);

  const sentSlot = CLASSES.find((slot) => slot.id === sent?.timing);
  const ageNumber = Number(fields.age);
  const needsGuardian = fields.age !== "" && !Number.isNaN(ageNumber) && ageNumber < 18;

  const availableSlots = CLASSES.filter((slot) =>
    (!fields.studio || fields.studio === slot.studioId) &&
    (!fields.style || fields.style === "Not sure yet" || fields.style === slot.style) &&
    (!fields.level || fields.level === "Not sure yet" || fields.level === slot.level) &&
    (!fields.age || matchesAge(slot, ageNumber)));

  const set = (key: keyof Fields, value: string) => {
    setFields((current) => {
      if (key === "timing" && value !== NO_TIMING) {
        const slot = CLASSES.find((item) => item.id === value);
        if (slot) return { ...current, studio: slot.studioId, style: slot.style, level: slot.level, timing: slot.id };
      }
      const next = { ...current, [key]: value };
      const chosen = CLASSES.find((slot) => slot.id === current.timing);
      if (chosen && (next.studio !== chosen.studioId || next.style !== chosen.style || next.level !== chosen.level || (next.age && !matchesAge(chosen, Number(next.age))))) next.timing = NO_TIMING;
      return next;
    });
    setErrors((current) => ({ ...current, [key]: undefined, timing: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = "Add the student’s name.";
    if (!fields.age || !Number.isInteger(ageNumber) || ageNumber < 4 || ageNumber > 80) {
      next.age = "Add an age between 4 and 80.";
    }
    if (needsGuardian && fields.guardian.trim().length < 5) {
      next.guardian = "Add a parent or guardian name and a way to reach them.";
    }
    if (!fields.style) next.style = "Choose a dance style.";
    if (!fields.level) next.level = "Choose a level.";
    if (fields.timing !== NO_TIMING && !availableSlots.some((slot) => slot.id === fields.timing)) next.timing = "Choose a matching sample class or no preference.";
    const digits = fields.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) next.phone = "Add a phone number we can read.";
    return next;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSent(fields);
  };

  return (
    <section id="trial" className="section section--ink">
      <div className="campaign-wrap trial__grid">
        <div className="trial__intro">
          <p className="kicker accent">A first class</p>
          <h2 className="campaign-display trial__title">Your first step starts here.</h2>
          <p className="trial__copy">
            Tell us who is dancing, which studio and style, and when you can come. This demo keeps the note on the page. It does
            not book a class or message the academy.
          </p>
          <button type="button" className="btn btn-ghost trial__btn" onClick={() => setWhatsappNote(true)}>
            Ask on WhatsApp
          </button>
          {whatsappNote ? (
            <p className="trial__status" role="status">
              The studio WhatsApp number is not connected in this demo. Use the form to see how an enquiry is taken.
            </p>
          ) : null}
        </div>

        <div className="trial__panel">
          {sent ? (
            <div className="trial__card" role="status">
              <h3 className="campaign-display trial__held">Held on this page.</h3>
              <p className="trial__copy">
                Nothing was sent. A live site would pass this note to the academy. Here is what you wrote:
              </p>
              <dl className="trial__recap">
                <div>
                  <dt className="trial__dt">Student</dt>
                  <dd>
                    {sent.name}, age {sent.age}
                  </dd>
                </div>
                {sent.guardian ? (
                  <div>
                    <dt className="trial__dt">Parent or guardian</dt>
                    <dd>{sent.guardian}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="trial__dt">Style and level</dt>
                  <dd>
                    {sent.style}, {sent.level}
                  </dd>
                </div>
                <div>
                  <dt className="trial__dt">Preferred studio</dt>
                  <dd>{studioName(sent.studio)}</dd>
                </div>
                <div>
                  <dt className="trial__dt">Timing</dt>
                  <dd>{sentSlot ? slotLabel(sentSlot) : NO_TIMING}</dd>
                </div>
                <div>
                  <dt className="trial__dt">Phone</dt>
                  <dd>{sent.phone}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="btn btn-solid trial__btn"
                onClick={() => {
                  setSent(null);
                  setFields(empty);
                }}
              >
                Write another note
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="trial__form">
              <label className="trial__span">
                Student name
                <input
                  className="field"
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(event) => set("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                {errors.name ? (
                  <span id="err-name" className="trial__error" role="alert">
                    {errors.name}
                  </span>
                ) : null}
              </label>

              <label>
                Age
                <input
                  className="field"
                  name="age"
                  inputMode="numeric"
                  value={fields.age}
                  onChange={(event) => set("age", event.target.value)}
                  aria-invalid={Boolean(errors.age)}
                  aria-describedby={errors.age ? "err-age" : undefined}
                />
                {errors.age ? (
                  <span id="err-age" className="trial__error" role="alert">
                    {errors.age}
                  </span>
                ) : null}
              </label>

              <label>
                Phone
                <input
                  className="field"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={(event) => set("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                />
                {errors.phone ? (
                  <span id="err-phone" className="trial__error" role="alert">
                    {errors.phone}
                  </span>
                ) : null}
              </label>

              <label className="trial__span">
                Parent or guardian contact
                <span className="trial__hint">
                  {needsGuardian ? "Needed because the student is under 18." : "Add this if the student is under 18."}
                </span>
                <input
                  className="field"
                  name="guardian"
                  value={fields.guardian}
                  onChange={(event) => set("guardian", event.target.value)}
                  aria-invalid={Boolean(errors.guardian)}
                  aria-describedby={errors.guardian ? "err-guardian" : undefined}
                />
                {errors.guardian ? (
                  <span id="err-guardian" className="trial__error" role="alert">
                    {errors.guardian}
                  </span>
                ) : null}
              </label>

              <label className="trial__span">
                Preferred studio
                <select className="field" name="studio" value={fields.studio} onChange={(event) => set("studio", event.target.value)}>
                  <option value="">No studio preference</option>
                  {STUDIOS.map((studio) => <option key={studio.id} value={studio.id}>{studio.name} (demo)</option>)}
                </select>
              </label>

              <label>
                Preferred dance style
                <select
                  className="field"
                  name="style"
                  value={fields.style}
                  onChange={(event) => set("style", event.target.value)}
                  aria-invalid={Boolean(errors.style)}
                  aria-describedby={errors.style ? "err-style" : undefined}
                >
                  <option value="">Choose a style</option>
                  <option>Not sure yet</option>
                  {PROGRAMS.map((program) => (
                    <option key={program.id} value={program.name}>
                      {program.name}
                    </option>
                  ))}
                </select>
                {errors.style ? (
                  <span id="err-style" className="trial__error" role="alert">
                    {errors.style}
                  </span>
                ) : null}
              </label>

              <label>
                Experience level
                <select
                  className="field"
                  name="level"
                  value={fields.level}
                  onChange={(event) => set("level", event.target.value)}
                  aria-invalid={Boolean(errors.level)}
                  aria-describedby={errors.level ? "err-level" : undefined}
                >
                  <option value="">Choose a level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Not sure yet</option>
                </select>
                {errors.level ? (
                  <span id="err-level" className="trial__error" role="alert">
                    {errors.level}
                  </span>
                ) : null}
              </label>

              <label className="trial__span">
                Preferred class or timing
                <span className="trial__hint">Sample weekend sessions matching your preferences. No class is reserved.</span>
                <select
                  className="field"
                  name="timing"
                  value={fields.timing}
                  onChange={(event) => set("timing", event.target.value)}
                  aria-invalid={Boolean(errors.timing)}
                  aria-describedby={errors.timing ? "err-timing" : undefined}
                >
                  <option value={NO_TIMING}>{NO_TIMING}</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>{slotLabel(slot)}</option>
                  ))}
                </select>
                {availableSlots.length === 0 && <span className="trial__hint">No matching sample sessions. You can still prepare a general enquiry.</span>}
                {errors.timing ? (
                  <span id="err-timing" className="trial__error" role="alert">
                    {errors.timing}
                  </span>
                ) : null}
              </label>

              <button type="submit" className="btn btn-solid trial__submit">
                Submit trial note
              </button>
            </form>
          )}
        </div>
      </div>

      <div id="contact" className="campaign-wrap trial__visit">
        <div>
          <p className="kicker trial__kicker">Visit</p>
          <p className="trial__line">Studio address to be confirmed</p>
          <p className="trial__sub">
            <a className="trial__mail" href="mailto:hello@prefectsteps.example">
              hello@prefectsteps.example
            </a>
          </p>
          <p className="trial__sub trial__dim">Phone to be confirmed</p>
        </div>
        <div>
          <p className="kicker trial__kicker">Sample hours</p>
          <ul className="trial__hours">
            {HOURS.map((row) => (
              <li key={row.day} className="trial__hour">
                <span>{row.day}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
          <p className="trial__faint">Hours are a sample for the layout, not a published schedule.</p>
        </div>
        <div>
          <p className="kicker trial__kicker">Map</p>
          <p className="trial__sub trial__dim">
            A map will sit here once the address is confirmed. No pin is shown, because the studio location is not set.
          </p>
        </div>
      </div>
    </section>
  );
}
