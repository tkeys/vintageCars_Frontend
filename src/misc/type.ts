export type ProductType = {
  _id: string;
  id: string;
  model: string;
  brand: string;
  year: number;
  rating: number;
  price: number;
  description: string;
  image: string;
};
export type ProductPageType = {
  cars: ProductType[];
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
};
export type Category = {
  id: number;
  name: string;
  image: string;
};

export type ProductCardProps = {
  product: ProductType;
};

export type RatingProps = {
  value: number;
  text: string;
};

export interface CartItem {
  _id: string;
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
  /*  _id: string;
  carId: string; */
  paymentMethod: string;
  orderItems: [];
  itemsPrice: number;
};

export type UserType = {
  _id: string;
  userName: string;
  firstName: string;
  email: string;
  role: string;
  lastName: string;
  banned: boolean;
  password: string;
  orderHistory: Order[];
};
