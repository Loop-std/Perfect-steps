import { useState } from "react";

const DOLLS = [
  { x: 144, phase: "rhythm-doll--one", skin: "#c78b67", hair: "#291f1c", top: "#d46a49", pants: "#ebe0cb", shoe: "#f4e9d6", style: "bun" },
  { x: 320, phase: "rhythm-doll--two", skin: "#9c6548", hair: "#211c1a", top: "#e9d9b9", pants: "#a83f23", shoe: "#e9d9b9", style: "cap" },
  { x: 496, phase: "rhythm-doll--three", skin: "#e1ad8b", hair: "#3d2b25", top: "#a3a887", pants: "#d6b18c", shoe: "#f4e9d6", style: "bob" },
];

function Doll({ doll }: { doll: (typeof DOLLS)[number] }) {
  return (
    <g transform={`translate(${doll.x} 225)`} className={`rhythm-doll ${doll.phase}`}>
      <ellipse className="rhythm-doll__shadow" cx="0" cy="105" rx="49" ry="7" fill="#120f0e" opacity=".32" />
      <g className="rhythm-doll__bounce">
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(${side * 13} 0)`}>
            <g className={`rhythm-doll__joint rhythm-doll__leg-${side < 0 ? "left" : "right"}`}>
              <path d="M0 0 L0 47" fill="none" stroke={doll.pants} strokeWidth="24" strokeLinecap="round" />
              <g transform="translate(0 45)">
                <g className={`rhythm-doll__joint rhythm-doll__shin-${side < 0 ? "left" : "right"}`}>
                  <path d="M0 0 L0 43" fill="none" stroke={doll.pants} strokeWidth="20" strokeLinecap="round" />
                  <path d={`M-9 40 Q0 36 9 40 L${side * 20} 47 Q${side * 24} 54 ${side * 17} 55 L-9 55 Q-13 54 -13 49Z`} fill={doll.shoe} stroke="#29211d" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M-8 51 H12" stroke="#29211d" strokeWidth="1.2" opacity=".6" />
                </g>
              </g>
            </g>
          </g>
        ))}
        <g className="rhythm-doll__joint rhythm-doll__torso">
          {[-1, 1].map((side) => (
            <g key={side} transform={`translate(${side * 25} -57)`}>
              <g className={`rhythm-doll__joint rhythm-doll__arm-${side < 0 ? "left" : "right"}`}>
                <path d="M0 0 L0 25" stroke={doll.top} strokeWidth="19" strokeLinecap="round" />
                <path d="M0 20 L0 36" stroke={doll.skin} strokeWidth="12" strokeLinecap="round" />
                <g transform="translate(0 34)">
                  <g className={`rhythm-doll__joint rhythm-doll__forearm-${side < 0 ? "left" : "right"}`}>
                    <path d="M0 0 L0 25" stroke={doll.skin} strokeWidth="11" strokeLinecap="round" />
                    <ellipse cy="29" rx="7" ry="9" fill={doll.skin} />
                  </g>
                </g>
              </g>
            </g>
          ))}
          <path d="M-10 -79 H10 V-65 H-10Z" fill={doll.skin} />
          <path d="M-14 -68 Q-27 -68 -31 -56 L-26 -34 L-23 -5 Q0 3 23 -5 L26 -34 L31 -56 Q27 -68 14 -68 Q0 -58 -14 -68Z" fill={doll.top} stroke="#29211d" strokeOpacity=".25" strokeWidth="1.5" />
          <path d="M-22 -8 Q0 -3 22 -8" fill="none" stroke="#29211d" strokeOpacity=".3" strokeWidth="2" />
          <path d="M-13 -68 Q0 -55 13 -68" stroke="#29211d" strokeOpacity=".25" strokeWidth="2" fill="none" />
          <path d="M-13 -36 L-9 -14 M14 -38 L11 -14" stroke="#29211d" opacity=".16" strokeWidth="1.5" strokeLinecap="round" />
          <g transform="translate(0 -79)">
            <g className="rhythm-doll__joint rhythm-doll__head">
              {doll.style === "bob" && <path d="M-23 -27 Q-25 -51 0 -52 Q25 -51 25 -26 L29 -3 Q10 4 0 -5 Q-13 4 -29 -3Z" fill={doll.hair} />}
              {doll.style === "bun" && <circle cx="-14" cy="-49" r="11" fill={doll.hair} />}
              <ellipse cx="0" cy="-26" rx="20" ry="25" fill={doll.skin} />
              <ellipse cx="-20" cy="-24" rx="4" ry="6" fill={doll.skin} />
              <ellipse cx="20" cy="-24" rx="4" ry="6" fill={doll.skin} />
              {doll.style === "cap" ? (
                <><path d="M-23 -33 Q-24 -52 1 -53 Q22 -52 23 -33Z" fill="#a83f23" /><path d="M-22 -34 Q7 -39 30 -31 Q32 -28 18 -27 L-19 -29Z" fill="#87321e" /></>
              ) : (
                <path d="M-21 -29 Q-29 -49 -8 -53 Q14 -59 22 -39 L21 -23 Q14 -41 8 -43 Q-4 -30 -21 -29Z" fill={doll.hair} />
              )}
              <path d="M-9 -24 H-7 M7 -24 H9" stroke="#30231f" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M-4 -13 Q0 -9 4 -13" fill="none" stroke="#69392d" strokeWidth="1.7" strokeLinecap="round" />
              {doll.style === "bun" && <circle cx="19" cy="-16" r="2.7" fill="#e8bc70" />}
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

export function RhythmDolls() {
  const [paused, setPaused] = useState(false);
  return (
    <figure className={`rhythm__visual rhythm-dolls${paused ? " rhythm-dolls--paused" : ""}`}>
      <svg className="rhythm-dolls__stage" viewBox="0 0 640 400" role="img" aria-label="Three illustrated dance dolls moving together on a rhythmic stage">
        <rect width="640" height="400" fill="#29231f" />
        <circle cx="320" cy="200" r="157" fill="#9f432b" opacity=".84" />
        <circle cx="320" cy="200" r="170" fill="none" stroke="#e8bda0" strokeOpacity=".23" strokeWidth="1" />
        <circle cx="320" cy="200" r="184" fill="none" stroke="#e8bda0" strokeOpacity=".11" strokeWidth="1" />
        <path d="M27 27 H54 M27 27 V54 M613 27 H586 M613 27 V54 M27 373 H54 M27 373 V346 M613 373 H586 M613 373 V346" stroke="#e7c6a5" strokeOpacity=".65" fill="none" />
        <path d="M56 334 H584" stroke="#e7c6a5" strokeOpacity=".38" />
        <path className="rhythm-dolls__wave" d="M55 210 H72 L79 196 L87 226 L96 182 L105 238 L114 202 L123 210 H144 M496 210 H516 L523 196 L531 226 L540 182 L549 238 L558 202 L567 210 H585" fill="none" stroke="#f4d4b4" strokeOpacity=".65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <g fill="#eacbad" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="2.5">
          <text x="46" y="49">THE ART OF MOVEMENT</text>
          <text x="594" y="49" textAnchor="end">01—08</text>
          <text x="46" y="365">MOVE / FEEL / REPEAT</text>
          <text x="594" y="365" textAnchor="end">PERFECT STEPS</text>
        </g>
        {DOLLS.map((doll) => <Doll key={doll.phase} doll={doll} />)}
        <g transform="translate(286 365)" fill="#f4d4b4">
          {[0, 1, 2, 3].map((beat) => <circle key={beat} className="rhythm-dolls__beat" style={{ animationDelay: `${beat * .6}s` }} cx={beat * 22} cy="-3" r="3.5" />)}
        </g>
      </svg>
      <figcaption className="rhythm-dolls__caption">
        <span>01 / Movement is a language.</span>
        <button type="button" className="rhythm-dolls__toggle" onClick={() => setPaused((value) => !value)}>{paused ? "Play animation" : "Pause animation"}</button>
      </figcaption>
    </figure>
  );
}
