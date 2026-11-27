import { HOURS } from "../lib/data";
import { scrollToId } from "../lib/scroll";

export function Contact() {
  return (
    <section id="contact" className="section section--deep">
      <div className="wrap contact__grid">
        <div className="contact__aside">
          <p className="eyebrow">Visit</p>
          <h2 className="display contact__title">The studio, when you are ready.</h2>
          <dl className="contact__facts">
            <div>
              <dt className="contact__label">Address</dt>
              <dd>Studio address to be confirmed</dd>
            </div>
            <div>
              <dt className="contact__label">Email</dt>
              <dd>
                <a className="text-link" href="mailto:hello@prefectsteps.example">
                  hello@prefectsteps.example
                </a>
              </dd>
            </div>
            <div>
              <dt className="contact__label">Phone</dt>
              <dd>Phone to be confirmed</dd>
            </div>
          </dl>
          <button type="button" className="btn btn-line trial__btn" onClick={() => scrollToId("trial")}>
            Use the trial form
          </button>
          <p className="contact__note">
            WhatsApp opens once the studio shares a number. Until then, the trial form is the enquiry.
          </p>
        </div>

        <div className="contact__main">
          <div className="contact__map">
            <div>
              <p className="display">Map</p>
              <p>
                A map will sit here once the address is confirmed. No pin is shown, because the studio location is not
                set.
              </p>
            </div>
          </div>
          <div className="hours">
            <p className="contact__label">Sample hours</p>
            <ul className="hours__list">
              {HOURS.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="hours__note">Hours are a sample for the layout, not a published schedule.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
