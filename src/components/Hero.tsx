import { useEffect, useState } from "react";
import { scrollToId } from "../lib/scroll";
import { HeroMusic } from "./HeroMusic";

const POSTER =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260908_122011_59c97465-4d23-4fdc-ac40-f6832f573e28.png&w=1920&q=85";
const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260908_125738_eb584080-9f98-489e-adb2-014760aa34da.mp4";
const LINES = ["Find", "your", "rhythm"] as const;

export function Hero() {
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const video = document.getElementById("heroVideo") as HTMLVideoElement | null;
    if (!video || reduced || videoFailed) return;

    const reveal = () => video.classList.add("is-ready");
    if (video.readyState >= 3) reveal();
    else video.addEventListener("loadeddata", reveal, { once: true });

    const kick = () => {
      const p = video.play();
      if (p && p.catch) p.catch(function () {});
    };
    kick();
    window.addEventListener("touchstart", kick, { once: true, passive: true });
    window.addEventListener("click", kick, { once: true });

    return () => {
      video.removeEventListener("loadeddata", reveal);
      window.removeEventListener("touchstart", kick);
      window.removeEventListener("click", kick);
    };
  }, [reduced, videoFailed]);

  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <img
          src={posterFailed ? "/media/n.jpg" : POSTER}
          onError={() => setPosterFailed(true)}
          alt={posterFailed ? "Dancers rehearsing together in a studio" : "A vintage turntable resting on a mossy rock in an alpine meadow at golden hour"}
        />
        {!reduced && !videoFailed && <video
          id="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          aria-hidden="true"
          src={VIDEO}
          onError={() => setVideoFailed(true)}
        />}
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">Prefect Steps Academy</p>
          <h1 className="headline">
            {LINES.map((line) => (
              <span className="line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero__lead">
            More than dance lessons. A room to learn the phrase, repeat it until it sticks, and find how you move.
          </p>
          <div className="hero__actions">
            <button type="button" className="hero__quiet" onClick={() => scrollToId("rhythm")}>
              Find my rhythm
            </button>
            <a
              className="btn-play"
              href="#trial"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("trial");
              }}
            >
              Book a free trial
            </a>
          </div>
          <button type="button" className="hero__scroll" onClick={() => scrollToId("rhythm")}>
            Scroll
            <i />
          </button>
        </div>
      </div>
      <HeroMusic />
    </section>
  );
}
