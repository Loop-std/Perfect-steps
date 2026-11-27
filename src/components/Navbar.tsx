import { useEffect, useState } from "react";
import { NAV, STYLE_EVENT } from "../lib/data";
import { scrollToId } from "../lib/scroll";

const DELAYS = ["d2", "d3", "d4", "d5", "d6", "d7"] as const;

type Bar = "hero" | "dark" | "solid";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [bar, setBar] = useState<Bar>("hero");

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const stage = document.getElementById("stage");
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      const stageBottom = stage?.getBoundingClientRect().bottom ?? 0;
      if (heroBottom > 80) setBar("hero");
      else if (stage && stageBottom > 80) setBar("dark");
      else setBar("solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1150) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const setMenu = (next: boolean) => setOpen(next);

  const go = (id: string) => {
    setMenu(false);
    window.setTimeout(() => scrollToId(id), 40);
  };

  const book = () => {
    window.dispatchEvent(new CustomEvent(STYLE_EVENT, { detail: "" }));
    go("trial");
  };

  return (
    <header className="site-nav">
      <div className={`nav${bar === "dark" && !open ? " is-on-dark" : ""}${bar === "solid" && !open ? " is-solid" : ""}`}>
        <a
          className="logo rise d1"
          href="#top"
          aria-label="Prefect Steps — home"
          onClick={(event) => {
            event.preventDefault();
            go("top");
          }}
        >
          Prefect Steps
        </a>

        <nav aria-label="Primary">
          <ul className="nav__links">
            {NAV.map((link, index) => (
              <li key={link.href} className={`rise ${DELAYS[index] ?? "d7"}`}>
                <a
                  href={`#${link.href}`}
                  onClick={(event) => {
                    event.preventDefault();
                    go(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__right">
          <a
            className="btn-play rise d8"
            href="#trial"
            onClick={(event) => {
              event.preventDefault();
              book();
            }}
          >
            Book a trial
          </a>
          <button
            id="burger"
            type="button"
            className={`burger${open ? " is-active" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open ? "true" : "false"}
            aria-controls="menu"
            onClick={() => setMenu(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        inert={!open}
        className={`menu${open ? " is-open" : ""}`}
        id="menu"
        onClick={(event) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest("a")) setMenu(false);
        }}
      >
        <nav aria-label="Mobile">
          <ul className="menu__list">
            {NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  onClick={(event) => {
                    event.preventDefault();
                    go(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__rule" />
          <div className="menu__foot">
            <a
              className="btn-play"
              href="#trial"
              onClick={(event) => {
                event.preventDefault();
                book();
              }}
            >
              Book a trial
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
