import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router";

type NavbarProps = {
  count: number; // items in the cart
  onCartClick: () => void;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const BagIcon = () => (
  <svg {...iconProps}>
    <path d="M6 8h12l1 12H5L6 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
);
const MenuIcon = () => (
  <svg {...iconProps}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
const CloseIcon = () => (
  <svg {...iconProps}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export default function Navbar({ count, onCartClick }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isEn = i18n.resolvedLanguage === "en";
  const n = count.toLocaleString(isEn ? "en-US" : "bn-BD"); // Bangla digits in Bangla mode

  const links = [
    // { to: "/", label: t("navHome") },
    { to: "/shop", label: t("navShop") },
    { to: "/why-sutika", label: t("navWhy") },
    { to: "/contact", label: t("navContact") },
  ];

  return (
    <>
      {/* Announcement bar */}
      {/* <p className="bg-ink px-4 py-1.5 text-center text-sm font-medium text-white/90">
        {t("announce")}
      </p> */}

      <header className="sticky top-0 z-10 border-b border-line bg-cotton/95 backdrop-blur">
        <div className="flex items-center gap-3 px-[clamp(16px,5vw,56px)] py-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t("menuAria")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-ink hover:bg-turmeric md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Logo: a rainbow thread ring + name */}
          <Link to="/" className="flex items-center gap-3">
            <span
              className="rainbow-wheel grid size-11 place-items-center rounded-full"
              aria-hidden="true"
            >
              <span className="size-6 rounded-full bg-cotton" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-3xl text-ink">
                {t("brand")}
              </span>
              <span className="hidden text-xs text-stone-500 sm:block">
                {t("tagline")}
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            aria-label="Main"
            className="ml-auto hidden items-center gap-1 md:flex"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-medium hover:bg-turmeric ${isActive ? "bg-turmeric" : ""}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Language + cart */}
          <div className="ml-auto flex items-center gap-2 md:ml-3">
            <button
              onClick={() => i18n.changeLanguage(isEn ? "bn" : "en")}
              aria-label={t("switchAria")}
              className="cursor-pointer rounded-full border-2 border-ink px-4 py-1.5 font-medium text-ink hover:bg-turmeric"
            >
              {t("switchTo")}
            </button>
            <button
              onClick={onCartClick}
              aria-label={t("cartAria", { n })}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-gamcha-red px-4 py-2 font-semibold text-white hover:bg-gamcha-red-dark focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <BagIcon />
              <span className="hidden sm:inline">{t("cart")}</span>
              <span className="grid min-w-6 place-items-center rounded-full bg-white px-1.5 text-sm text-gamcha-red">
                {n}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-t border-line px-[clamp(16px,5vw,56px)] pb-3 pt-2 md:hidden"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-medium hover:bg-turmeric ${isActive ? "bg-turmeric" : ""}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
