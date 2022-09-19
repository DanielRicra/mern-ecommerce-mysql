export type SigninPostData = {
  email: string,
  password: string
};

export type SignupPostData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export interface User {
  address?: string;
  cellphone?: string;
  email: string;
  firstName: string;
  isAdmin: number;
  lastName: string;
  userId: number;
  password?: string;
}

export interface AuthResponse {
  result: User;
  token: string;
}

export interface ProductsResponse {
  page: number;
  results: Product[];
  total_pages: number;
  total_results: number;
}

export interface Product {
  bar_code: null | string;
  category_id: number;
  description: null | string;
  img_url: null | string;
  name: string;
  product_id: number;
  sale_price: string | number;
  stock: number;
}

export interface PurchasedProduct {
  description: null | string;
  img_url: null | string;
  name: string;
  product_id: number;
  sale_price: string | number;
  quantity: number;
}

export interface ProductProps {
  product: Product
}

export interface ProductListProps {
  products: Product[]
}

export enum ActionsTypes {
  FETCH_START = 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

export interface ProductsAction {
  type: ActionsTypes;
  payload?: ProductsResponse;
}

export interface ProductAction {
  type: ActionsTypes;
  payload?: Product;
}

export interface ProductsState {
  loading: boolean;
  productsResponse: ProductsResponse;
  error: boolean;
}

export interface ProductState {
  loading: boolean;
  product: Product;
  error: boolean;
}

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface CartProducts {
  cartProducts: CartProduct[];
}

export type ShoppingCartProps = {
  cartItems: CartProduct[]
};

export type CartItemProps = {
  product: Product;
  quantity: number;
};

export interface Category {
  category_id: number;
  name: string;
}

export interface CategoriesResponse {
  results: Category[];
}

export interface ProductsSliceState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  productsResponse: ProductsResponse
}

export interface Purchase {
  comment: null | string;
  payment_type: string;
  products: PurchasedProduct[];
  purchase_date: string | null;
  purchase_id: number;
  status: 0 | 1;
  user_id: number | null;
}

export interface PurchaseListProps {
  purchases: Purchase[]
}

export interface PurchasesResponse {
  page: number;
  results: Purchase[];
  total_pages: number;
  total_results: number;
}

export interface PurchasesState {
  loading: boolean;
  purchasesResponse: PurchasesResponse;
  error: boolean;
}

export interface PurchasesAction {
  type: ActionsTypes;
  payload?: PurchasesResponse;
}

export interface SavePurchaseResponse {
  comment: string;
  paymentType: 'cash' | 'paypal' | 'credit_card' | 'debit_card';
  purchaseDate: string;
  purchaseId: number;
  userId: number;
}

export interface SavePurchaseBody {
  userId: number;
  paymentType: 'cash' | 'paypal' | 'credit_card' | 'debit_card';
  comment: string;
  status: 0 | 1;
  items: {
    productId: number;
    quantity: number;
    total: number;
  } [];
}

export interface SavePurchaseState {
  loading: boolean;
  error: boolean;
  response: SavePurchaseResponse;
}

export interface SavePurchaseAction {
  type: ActionsTypes;
  payload?: SavePurchaseResponse;
}
