import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const TRACK = "/media/atmosphere.mp3";
const TARGET = 0.22;
const MUTE_KEY = "prefect-music-muted";

function readMuted() {
  try {
    return sessionStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

function storeMuted(muted: boolean) {
  try {
    sessionStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    /* session storage can be blocked; the in-memory choice still applies */
  }
}

export function HeroMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef(0);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(readMuted);

  const fadeTo = (audio: HTMLAudioElement, target: number) => {
    cancelAnimationFrame(fadeRef.current);
    const step = () => {
      const next = audio.volume + (target - audio.volume) * 0.08;
      if (Math.abs(target - next) < 0.012) {
        audio.volume = target;
        return;
      }
      audio.volume = Math.min(1, Math.max(0, next));
      fadeRef.current = requestAnimationFrame(step);
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const begin = (audio: HTMLAudioElement) => {
    const silent = readMuted();
    audio.muted = silent;
    audio.volume = 0;
    return audio.play().then(() => {
      if (audioRef.current !== audio) return;
      setStarted(true);
      setPlaying(!audio.paused);
      setMuted(silent);
      fadeTo(audio, silent ? 0 : TARGET);
    });
  };

  useEffect(() => {
    let alive = true;
    const audio = new Audio(TRACK);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const onError = () => {
      if (alive) setFailed(true);
    };
    audio.addEventListener("error", onError);

    begin(audio).catch(() => {
      if (!alive || audioRef.current !== audio) return;
      setStarted(false);
      setPlaying(false);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(fadeRef.current);
      audio.pause();
      audio.removeEventListener("error", onError);
      audio.src = "";
      if (audioRef.current === audio) audioRef.current = null;
    };
    // One audio element for the life of the hero. Mute preference is read when playback starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (failed) return null;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!started || audio.paused) {
      begin(audio).catch(() => setFailed(true));
      return;
    }
    audio.pause();
    setPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    storeMuted(next);
    setMuted(next);
    if (!next && !audio.paused) fadeTo(audio, TARGET);
    if (next) fadeTo(audio, 0);
  };

  return (
    <div className="music">
      {!started ? (
        <button type="button" className="music__enable" onClick={togglePlay}>
          Tap to enable music
        </button>
      ) : (
        <div className="music__row">
          <button
            type="button"
            className="music__btn"
            aria-label={playing ? "Pause music" : "Play music"}
            onClick={togglePlay}
          >
            {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
          </button>
          <button
            type="button"
            className="music__btn"
            aria-label={muted ? "Unmute music" : "Mute music"}
            aria-pressed={muted}
            onClick={toggleMute}
          >
            {muted ? <VolumeX size={16} aria-hidden /> : <Volume2 size={16} aria-hidden />}
          </button>
        </div>
      )}
      <p className="music__credit">Comfortable Mystery by Kevin MacLeod, CC BY 4.0</p>
    </div>
  );
}
