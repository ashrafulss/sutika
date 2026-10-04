import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function ProductCard({
  product,
  onAddToCart,
  weave,
  formatPrice,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const name = t(`${product.key}.name`);
  const note = t(`${product.key}.note`);

  // কার্ডে ক্লিক করলে বিবরণী পেজে নিয়ে যাবে
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gamcha-red/40"
    >
      <div
        className="h-[170px] transition-transform duration-300 group-hover:scale-105"
        style={weave(product.a, product.b)}
        role="img"
        aria-label={name}
      />
      <div className="paar" aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-3">
        <span className="text-sm font-semibold text-leaf">
          {t(product.type)}
        </span>
        <h3 className="font-display text-xl leading-snug group-hover:text-gamcha-red">
          {name}
        </h3>
        <p className="text-sm text-stone-600">{note}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <strong className="text-lg text-gamcha-red">
            {formatPrice(product.price)}
          </strong>
          <button
            onClick={(e) => {
              e.stopPropagation(); // ডিটেইলস পেজে না গিয়ে সরাসরি কার্টে যোগ করার জন্য
              onAddToCart(product.id);
            }}
            className="cursor-pointer rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gamcha-red"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </article>
  );
}
