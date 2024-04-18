export type Product = {
  model: string;
  year: number;
  id: string;
  rating: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type ProductCardProps = {
  product: Product;
};

export type RatingProps = {
  value: number;
  text: string;
};

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  title: string;
  description: string;
  image?: string;
  category?: Category;
}

export interface CartState {
  cartItems: CartItem[];
  itemsPrice: number;
  paymentMethod: string;
}
export type Order = {
  //userId: string;
  paymentMethod: string;
  orderItems: [];
  itemsPrice: number;
};
