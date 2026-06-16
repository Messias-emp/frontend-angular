// Modelo simples de produto — use em services + components
// Modelo ÚNICO de produto para TODO o front
// Modelo espelha exatamente o backend product
export interface Product {
  id?: number; // opcional para CREATE
  name: string;
  description?: string;
  details?: string;
  price: number;
  stock? : number;
  imageUrl?: string;
  active: boolean;
  
}
