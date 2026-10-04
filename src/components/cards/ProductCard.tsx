import { useTranslation } from "react-i18next";

export interface Product {
  id: number;
  key: string; // Translation key identifier
  type: "gamcha" | "lungi";
  price: number;
  a: string;
  b: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  weave: (a: string, b: string, size?: number) => React.CSSProperties;
  formatPrice: (price: number) => string;
}

export default function ProductCard({
  product,
  onAddToCart,
  weave,
  formatPrice,
}: ProductCardProps) {
  const { t } = useTranslation();

  // Extract translated product name and note dynamically
  const name = t(`${product.key}.name`);
  const note = t(`${product.key}.note`);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div
        className="h-[170px]"
        style={weave(product.a, product.b)}
        role="img"
        aria-label={name}
      />
      <div className="paar" aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-3">
        <span className="text-sm font-semibold text-leaf">
          {t(product.type)}
        </span>
        <h3 className="font-display text-xl leading-snug">{name}</h3>
        <p className="text-sm text-stone-600">{note}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <strong className="text-lg text-gamcha-red">
            {formatPrice(product.price)}
          </strong>
          <button
            onClick={() => onAddToCart(product.id)}
            className="cursor-pointer rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gamcha-red"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </article>
  );
}
