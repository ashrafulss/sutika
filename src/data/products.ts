import type { Product } from "../types/Product";

export const PRODUCTS: Product[] = [
  { id: 1, key: "p1", type: "gamcha", price: 280, a: "#b91c2e", b: "#fffdf7" },
  { id: 2, key: "p2", type: "gamcha", price: 320, a: "#1f2a5a", b: "#fffdf7" },
  { id: 3, key: "p3", type: "gamcha", price: 300, a: "#1f6b4a", b: "#f4efe0" },
  { id: 4, key: "p4", type: "gamcha", price: 340, a: "#d9971a", b: "#fffdf7" },
  { id: 5, key: "p5", type: "lungi", price: 650, a: "#27407a", b: "#dfe6f3" },
  { id: 6, key: "p6", type: "lungi", price: 720, a: "#7a1f2b", b: "#f1e2dc" },
  { id: 7, key: "p7", type: "lungi", price: 690, a: "#4b525c", b: "#e6e8eb" },
  { id: 8, key: "p8", type: "lungi", price: 850, a: "#1a1a1a", b: "#e0a526" },
];

export const weave = (a: string, b: string, size = 14) => ({
  backgroundColor: b,
  backgroundImage: `repeating-linear-gradient(0deg, color-mix(in srgb, ${a} 70%, transparent) 0 ${size}px, transparent ${size}px ${size * 2}px),
    repeating-linear-gradient(90deg, color-mix(in srgb, ${a} 70%, transparent) 0 ${size}px, transparent ${size}px ${size * 2}px)`,
});
