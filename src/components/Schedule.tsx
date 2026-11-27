import { useEffect, useState } from "react";
import { LEVELS, STYLES, STUDIOS, type ClassSlot } from "../lib/data";
import { ALL_FILTERS, filterSlots, PLANNER_EVENT, SLOT_EVENT, studioName, WEEKEND_DAYS, type PlannerFilters, type PlannerPreference } from "../lib/studioExperience";
import { scrollToId } from "../lib/scroll";

export function Schedule() {
  const [filters, setFilters] = useState<PlannerFilters>(ALL_FILTERS);
  useEffect(() => {
    const onPreference = (event: Event) => {
      const detail = (event as CustomEvent<PlannerPreference>).detail;
      if (detail) setFilters({ ...ALL_FILTERS, studioId: detail.studioId ?? "All", style: detail.style ?? "All", level: detail.level ?? "All", age: detail.age });
    };
    window.addEventListener(PLANNER_EVENT, onPreference);
    return () => window.removeEventListener(PLANNER_EVENT, onPreference);
  }, []);
  const rows = filterSlots(filters);
  const set = (key: "studioId" | "day" | "style" | "level", value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const ask = (slot: ClassSlot) => {
    window.dispatchEvent(new CustomEvent(SLOT_EVENT, { detail: { slotId: slot.id, age: filters.age } }));
    scrollToId("trial");
  };
  return (
    <section id="schedule" className="section section--paper weekend" aria-labelledby="weekend-title">
      <div className="campaign-wrap">
        <p className="kicker accent">The weekend planner / 03</p>
        <h2 id="weekend-title" className="campaign-display section__title">Make your weekend <span>move.</span></h2>
        <p className="lede muted">One weekend. Many ways to move. Find the studio, style and class that suit you.</p>
        <p className="network__demo">Illustrative timetable only · Not live availability or a confirmed instructor allocation.</p>
        <div className="weekend__filters">
          <fieldset className="weekend__days"><legend>Choose a day</legend><div className="weekend__tabs">{["All", ...WEEKEND_DAYS].map((day) => <button key={day} type="button" aria-pressed={filters.day === day} onClick={() => set("day", day)}>{day === "All" ? "Both days" : day}</button>)}</div></fieldset>
          <div className="weekend__selects">
            <label>Studio<select value={filters.studioId} onChange={(e) => set("studioId", e.target.value)}><option value="All">All studios</option>{STUDIOS.map((studio) => <option value={studio.id} key={studio.id}>{studio.name}</option>)}</select></label>
            <label>Dance style<select value={filters.style} onChange={(e) => set("style", e.target.value)}><option value="All">All styles</option>{STYLES.map((style) => <option key={style}>{style}</option>)}</select></label>
            <label>Experience<select value={filters.level} onChange={(e) => set("level", e.target.value)}><option value="All">All levels</option>{LEVELS.map((level) => <option key={level}>{level}</option>)}</select></label>
          </div>
          <div className="weekend__summary"><p role="status">{rows.length} sample {rows.length === 1 ? "class" : "classes"}{filters.age !== undefined ? ` · Age ${filters.age}` : ""}</p><button type="button" onClick={() => setFilters(ALL_FILTERS)}>Reset filters ↺</button></div>
        </div>
        {WEEKEND_DAYS.map((day) => {
          const dayRows = rows.filter((slot) => slot.day === day);
          if (!dayRows.length) return null;
          return <div key={day} className="weekend__group"><h3 className="campaign-display">{day}<span>{dayRows.length} sessions</span></h3><ul className="weekend__rows">{dayRows.map((slot) => <li key={slot.id} className="weekend__row"><div className="weekend__time"><strong>{slot.time}</strong><small>{studioName(slot.studioId)}</small></div><div className="weekend__style"><h4>{slot.style}</h4><p>{slot.instructor} · Sample faculty</p></div><div className="weekend__meta"><span>{slot.level}</span><small>Ages {slot.ages}</small></div><button type="button" className="network__action" onClick={() => ask(slot)} aria-label={`Enquire about ${slot.style}, ${day}, ${slot.time}, ${studioName(slot.studioId)}`}>Enquire <span aria-hidden="true">↗</span></button></li>)}</ul></div>;
        })}
        {!rows.length && <div className="network__empty"><h3>No matching sample classes.</h3><p>Try a different studio, day or experience level, or use the trial form to ask about other options.</p><button type="button" onClick={() => setFilters(ALL_FILTERS)}>Reset filters</button> <button type="button" onClick={() => scrollToId("trial")}>Explore trial enquiries</button></div>}
      </div>
    </section>
  );
}
