import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const PAD = "px-[clamp(16px,5vw,56px)]";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === "en";
  const year = new Date()
    .getFullYear()
    .toLocaleString(isEn ? "en-US" : "bn-BD", { useGrouping: false });

  const shopLinks = [
    { to: "/shop", label: t("gamcha") },
    { to: "/shop", label: t("lungi") },
    { to: "/why-sutika", label: t("navWhy") },
  ];

  const social = [
    { href: "https://facebook.com/", label: "Facebook" },
    { href: "https://wa.me/", label: "WhatsApp" },
  ];

  const linkClass =
    "hover:text-white hover:underline focus-visible:text-white focus-visible:underline transition-colors";

  return (
    <footer id="contact" className="group relative z-30 bg-ink text-white">
      {/* Upward Overlay Dropup Menu for Desktop Hover / Focus */}
      <div className="pointer-events-none absolute bottom-full left-0 right-0 w-full opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div className="bg-ink/95 backdrop-blur-md border-t border-white/15 shadow-2xl">
          <div
            className={`grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 ${PAD}`}
          >
            <div>
              <p className="text-sm text-white/75 leading-relaxed">
                {t("others.footTagline")}
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-display text-lg">{t("navShop")}</h2>
              <ul className="space-y-1.5 text-sm text-white/80">
                {shopLinks.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-2 font-display text-lg">{t("footContact")}</h2>
              <ul className="space-y-1.5 text-sm text-white/80">
                <li>{t("footPhone")}</li>
                <li>{t("footEmail")}</li>
                <li>{t("footCity")}</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 font-display text-lg">{t("footFollow")}</h2>
              <ul className="space-y-1.5 text-sm text-white/80">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Always visible base bar at bottom */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 py-4 ${PAD}`}
      >
        <Link to="/" className="flex items-center gap-3">
          <span
            className="rainbow-wheel grid size-10 place-items-center rounded-full"
            aria-hidden="true"
          >
            <span className="size-5 rounded-full bg-ink" />
          </span>
          <span className="font-display text-2xl">{t("brand")}</span>
        </Link>

        <p className="text-xs text-white/65">
          © {year} {t("brand")}. {t("footRights")}
        </p>
      </div>
    </footer>
  );
}
