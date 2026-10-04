import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";

interface ProductDetailsProps {
  products: Product[];
  onAddToCart: (id: number, quantity?: number) => void;
  weave: (a: string, b: string, size?: number) => React.CSSProperties;
}

const SIZES = [
  { label: "২৮ × ৫৬ ইঞ্চি", enLabel: "28 × 56 in" },
  { label: "৩০ × ৬০ ইঞ্চি", enLabel: "30 × 60 in" },
];

export default function ProductDetails({
  products,
  onAddToCart,
  weave,
}: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isEn = i18n.resolvedLanguage === "en";

  // State
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"fabric" | "delivery">("fabric");
  const [copied, setCopied] = useState<boolean>(false);
  const [zoomPattern, setZoomPattern] = useState<number>(18);

  const product = products.find((p) => p.id === Number(id)) || products[0];

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl">Product not found!</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 rounded-full bg-ink px-6 py-2 text-white"
        >
          {t("backToShop")}
        </button>
      </div>
    );
  }

  const formatPrice = (n: number) =>
    "৳" + (n * quantity).toLocaleString(isEn ? "en-US" : "bn-BD");

  const singlePrice = (n: number) =>
    "৳" + n.toLocaleString(isEn ? "en-US" : "bn-BD");

  const name = t(`${product.key}.name`);
  const note = t(`${product.key}.note`);

  const relatedProducts = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-[clamp(16px,5vw,56px)] py-10">
      {/* Navigation Breadcrumb & Share */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/shop"
          className="inline-flex items-center text-sm font-medium text-stone-600 transition-colors hover:text-gamcha-red"
        >
          {t("backToShop")}
        </Link>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50"
        >
          <span>🔗</span> {copied ? t("copied") : t("share")}
        </button>
      </div>

      {/* Hero Showcase Grid */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Handloom Interactive Visualizer (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-md group">
            {/* Weave Preview Window */}
            <div
              className="h-[360px] sm:h-[480px] w-full transition-transform duration-700 ease-out group-hover:scale-110"
              style={weave(product.a, product.b, zoomPattern)}
              role="img"
              aria-label={name}
            />
            <div className="paar h-5" aria-hidden="true" />

            <div className="absolute bottom-4 right-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white">
              {t("patternPreview")}
            </div>
          </div>

          {/* Pattern Density Controls / Thumbnails */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-stone-500">
              {t("patternView")}
            </span>
            {[12, 18, 24].map((density) => (
              <button
                key={density}
                onClick={() => setZoomPattern(density)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                  zoomPattern === density
                    ? "border-gamcha-red bg-gamcha-red/10 text-gamcha-red"
                    : "border-line bg-white text-stone-600 hover:bg-stone-50"
                }`}
              >
                {density === 12
                  ? t("patternFine")
                  : density === 18
                    ? t("patternMedium")
                    : t("patternZoom")}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Details Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Header Badge & Category */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-leaf/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-leaf">
                {t(product.type)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500"></span>
                {t("inStock")}
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="mt-3 font-display text-3xl sm:text-4xl leading-tight text-ink">
              {name}
            </h1>
            <p className="mt-2 text-stone-600 text-sm leading-relaxed">
              {note}
            </p>

            {/* Price Box */}
            <div className="mt-5 flex items-baseline gap-3 rounded-2xl bg-stone-50 p-4 border border-line">
              <span className="text-3xl font-extrabold text-gamcha-red">
                {formatPrice(product.price)}
              </span>
              {quantity > 1 && (
                <span className="text-sm font-medium text-stone-500">
                  ({singlePrice(product.price)} × {quantity})
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {t("size")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SIZES.map((sizeObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(idx)}
                    className={`rounded-2xl border py-2.5 px-4 text-xs font-semibold transition-all ${
                      selectedSize === idx
                        ? "border-ink bg-ink text-white shadow-sm"
                        : "border-line bg-white text-stone-700 hover:border-stone-400"
                    }`}
                  >
                    {isEn ? sizeObj.enLabel : sizeObj.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {t("quantity")}
              </span>
              <div className="flex items-center rounded-full border border-line bg-stone-50 p-1">
                <button
                  onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))}
                  className="flex size-8 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition hover:bg-stone-200 font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((p) => p + 1)}
                  className="flex size-8 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition hover:bg-stone-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Interactive Tabs (Fabric & Delivery) */}
            <div className="mt-8 border-t border-line pt-6">
              <div className="flex gap-4 border-b border-line pb-2">
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${
                    activeTab === "fabric"
                      ? "border-gamcha-red text-gamcha-red"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {t("fabricCare")}
                </button>
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${
                    activeTab === "delivery"
                      ? "border-gamcha-red text-gamcha-red"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {t("deliveryReturn")}
                </button>
              </div>

              <div className="py-4 text-xs text-stone-600 leading-relaxed">
                {activeTab === "fabric" ? (
                  <p>🧵 {t("washTip")}</p>
                ) : (
                  <p>🚚 {t("deliveryTip")}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => onAddToCart(product.id, quantity)}
              className="w-full cursor-pointer rounded-full bg-ink py-3.5 text-sm font-bold text-white transition-all hover:bg-gamcha-red shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              {t("addToCart")}
            </button>
            <button
              onClick={() => {
                onAddToCart(product.id, quantity);
                navigate("/cart");
              }}
              className="w-full cursor-pointer rounded-full border-2 border-ink bg-transparent py-3 text-sm font-bold text-ink transition-all hover:bg-ink hover:text-white active:scale-[0.99]"
            >
              {t("buyNow")}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="mb-8 font-display text-2xl text-ink">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={(id) => onAddToCart(id, 1)}
                weave={weave}
                formatPrice={(price) =>
                  "৳" + price.toLocaleString(isEn ? "en-US" : "bn-BD")
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
