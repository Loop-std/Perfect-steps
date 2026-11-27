import { useState } from "react";
import { CLASSES, STUDIOS } from "../lib/data";
import { openPlanner } from "../lib/studioExperience";
import { scrollToId } from "../lib/scroll";

export function StudioFinder() {
  const [query, setQuery] = useState("");
  const studios = STUDIOS.filter((studio) => {
    const styles = CLASSES.filter((slot) => slot.studioId === studio.id).map((slot) => slot.style);
    return [studio.name, studio.area, ...styles].join(" ").toLowerCase().includes(query.trim().toLowerCase());
  });
  return (
    <section id="studios" className="section section--ivory network" aria-labelledby="network-title">
      <div className="campaign-wrap">
        <div className="network__intro">
          <div><p className="kicker accent">The studio network / 02</p>
            <h2 id="network-title" className="campaign-display section__title">Different neighbourhoods.<br /><span>One rhythm.</span></h2>
          </div>
          <div className="network__stat"><strong className="campaign-display">15+</strong><span>Studio network vision</span></div>
        </div>
        <p className="lede muted">Find a place to move, discover its dance styles and explore the weekend timetable.</p>
        <p className="network__demo">Demo network · Three illustrative studio zones. Actual locations, addresses and faculty assignments are awaiting confirmation.</p>
        <div className="network__search">
          <label htmlFor="studio-search">Find your studio or dance style</label>
          <div className="network__search-row"><input id="studio-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try North, Hip-hop or Kids dance" />{query && <button type="button" onClick={() => setQuery("")}>Clear</button>}</div>
          <p role="status" className="network__count">{studios.length} of {STUDIOS.length} sample studios</p>
        </div>
        <div className="network__grid">
          {studios.map((studio) => {
            const slots = CLASSES.filter((slot) => slot.studioId === studio.id);
            const styles = [...new Set(slots.map((slot) => slot.style))];
            return <article key={studio.id} className="network__card">
              <div className="network__media"><img src={studio.image} alt={studio.alt} loading="lazy" decoding="async" /><span>DEMO / {studio.area.toUpperCase()}</span></div>
              <div className="network__body"><p className="kicker accent">Saturday &amp; Sunday</p><h3 className="campaign-display">{studio.name}</h3><p>{studio.description}</p>
                <ul className="network__tags" aria-label="Sample programs">{styles.map((style) => <li key={style}>{style}</li>)}</ul>
                <p className="network__count">{slots.length} illustrative weekend sessions</p>
                <button type="button" className="network__action" onClick={() => { openPlanner({ studioId: studio.id }); scrollToId("schedule"); }}>Explore weekend classes <span aria-hidden="true">↗</span></button>
              </div>
            </article>;
          })}
        </div>
        {studios.length === 0 && <div className="network__empty"><p>No sample studio matches your search.</p><button type="button" onClick={() => setQuery("")}>Show all studios</button></div>}
      </div>
    </section>
  );
}
