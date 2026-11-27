import { useState, type ReactNode } from "react";
import { Facebook, Instagram, Music2, Youtube } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FOOTER_GROUPS, FOOTER_VIDEO, SOCIAL_LINKS } from "../lib/data";
import { scrollToId } from "../lib/scroll";

const ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  music: Music2,
} as const;

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function destination(href: string) {
  return href || "#contact";
}

function FooterLink({
  href,
  className,
  children,
  label,
}: {
  href: string;
  className: string;
  children: ReactNode;
  label?: string;
}) {
  const to = destination(href);
  const hash = to.startsWith("#");
  const external = to.startsWith("http");

  return (
    <a
      href={to}
      className={className}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onClick={
        hash
          ? (event) => {
              event.preventDefault();
              scrollToId(to.slice(1));
            }
          : undefined
      }
    >
      {children}
    </a>
  );
}

function Mark() {
  return (
    <span className="site-footer__badge" aria-hidden>
      <span className="display site-footer__badge-mark">Ps</span>
    </span>
  );
}

export function Footer() {
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const year = new Date().getFullYear();
  const showVideo = !reduced && !failed;

  return (
    <footer className="site-footer">
      <div className="site-footer__media" aria-hidden>
        <img src="/media/g.jpg" alt="" />
        {showVideo ? (
          <video autoPlay muted loop playsInline preload="metadata" poster="/media/g.jpg" onError={() => setFailed(true)}>
            <source src={FOOTER_VIDEO} type="video/mp4" />
          </video>
        ) : null}
        <div className="site-footer__shade" />
        <div className="site-footer__glow" />
      </div>

      <div className="site-footer__frame">
        <motion.div
          className="liquid-glass site-footer__glass"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduced ? { duration: 0 } : { duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <div className="site-footer__grid">
            <div className="site-footer__brand">
              <FooterLink href="#top" className="site-footer__logo">
                <span className="site-footer__mark">
                  <Mark />
                </span>
                <span className="display site-footer__name">
                  Prefect
                  <em> Steps</em>
                </span>
              </FooterLink>
              <p className="display site-footer__tag">Find your rhythm, then stay with it long enough to trust it.</p>
              <p className="site-footer__blurb">
                Hip-hop, contemporary, Bollywood, and freestyle, plus a first class for children and people who have
                never been in a studio. You learn the phrase in the room, and you repeat it until it is yours.
              </p>
              <p className="site-footer__address">Address to be confirmed</p>
              <a href="mailto:hello@prefectsteps.example" className="site-footer__mail">
                hello@prefectsteps.example
              </a>
            </div>

            <motion.div
              className="site-footer__groups"
              initial={reduced ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: {},
                      show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
                    }
              }
            >
              {FOOTER_GROUPS.map((group) => (
                <motion.div key={group.title} variants={reduced ? undefined : groupVariants}>
                  <p className="site-footer__label">{group.title}</p>
                  <ul className="site-footer__links">
                    {group.links.map((link) => {
                      const social = SOCIAL_LINKS.find((item) => item.label === link.label);
                      const href = social ? destination(social.href) : link.href;
                      return (
                        <li key={link.label}>
                          <FooterLink
                            href={href}
                            label={
                              social && !social.href
                                ? `${link.label}. Profile link to be added. Go to contact.`
                                : link.label === "WhatsApp Enquiry"
                                  ? "WhatsApp enquiry. The studio number is not connected yet. Go to the trial form."
                                  : undefined
                            }
                            className="site-footer__link"
                          >
                            {link.label}
                          </FooterLink>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="site-footer__bar">
            <div>
              <p className="site-footer__legal">
                © {year} Prefect Steps Academy
                <span className="site-footer__quiet"> · The room is open.</span>
              </p>
              <p className="site-footer__credit">Demo photographs from Unsplash and Pexels.</p>
            </div>
            <div className="site-footer__socials">
              <p className="site-footer__follow">Follow the Movement</p>
              <ul className="site-footer__icons">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = ICONS[item.id];
                  const linked = Boolean(item.href);
                  return (
                    <li key={item.id}>
                      <FooterLink
                        href={item.href}
                        label={linked ? item.label : `${item.label}. Profile link to be added. Go to contact.`}
                        className="site-footer__icon"
                      >
                        <Icon size={16} aria-hidden />
                      </FooterLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
