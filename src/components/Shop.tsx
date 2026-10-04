import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "./products/ProductCard";
import type { Product } from "../types/Product";

const PRODUCTS: Product[] = [
  { id: 1, key: "p1", type: "gamcha", price: 280, a: "#b91c2e", b: "#fffdf7" },
  { id: 2, key: "p2", type: "gamcha", price: 320, a: "#1f2a5a", b: "#fffdf7" },
  { id: 3, key: "p3", type: "gamcha", price: 300, a: "#1f6b4a", b: "#f4efe0" },
  { id: 4, key: "p4", type: "gamcha", price: 340, a: "#d9971a", b: "#fffdf7" },
  { id: 5, key: "p5", type: "lungi", price: 650, a: "#27407a", b: "#dfe6f3" },
  { id: 6, key: "p6", type: "lungi", price: 720, a: "#7a1f2b", b: "#f1e2dc" },
  { id: 7, key: "p7", type: "lungi", price: 690, a: "#4b525c", b: "#e6e8eb" },
  { id: 8, key: "p8", type: "lungi", price: 850, a: "#1a1a1a", b: "#e0a526" },
];

const weave = (a: string, b: string, size = 14) => ({
  backgroundColor: b,
  backgroundImage: `repeating-linear-gradient(0deg, color-mix(in srgb, ${a} 70%, transparent) 0 ${size}px, transparent ${size}px ${size * 2}px),
    repeating-linear-gradient(90deg, color-mix(in srgb, ${a} 70%, transparent) 0 ${size}px, transparent ${size}px ${size * 2}px)`,
});

interface ShopProps {
  onAddToCart?: (id: number) => void;
}

export default function Shop({ onAddToCart }: ShopProps) {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState("all");

  const isEn = i18n.resolvedLanguage === "en";

  // Formats currency according to active language (en-US vs bn-BD)
  const taka = (n: number) => "৳" + n.toLocaleString(isEn ? "en-US" : "bn-BD");

  const filters = [
    { key: "all", label: t("filterAll") },
    { key: "gamcha", label: t("gamcha") },
    { key: "lungi", label: t("lungi") },
  ];

  const shown = useMemo(
    () => PRODUCTS.filter((p) => filter === "all" || p.type === filter),
    [filter]
  );

  return (
    <section id="shop" className="px-[clamp(16px,5vw,56px)] py-16">
      {/* Header & Translated Filter Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl">{t("shopTitle")}</h1>

        <div className="flex gap-2" role="group" aria-label="Filter products">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={f.key === filter}
              className={`cursor-pointer rounded-full border-2 border-gamcha-red px-5 py-1 text-sm font-medium transition-colors ${
                f.key === filter
                  ? "bg-gamcha-red text-white"
                  : "bg-transparent text-gamcha-red hover:bg-gamcha-red/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
        {shown.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart || (() => {})}
            weave={weave}
            formatPrice={taka}
          />
        ))}
      </div>
    </section>
  );
}
