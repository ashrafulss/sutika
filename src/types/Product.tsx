export interface Product {
  id: number;
  key: string; // Translation key identifier
  type: "gamcha" | "lungi";
  price: number;
  a: string;
  b: string;
}
