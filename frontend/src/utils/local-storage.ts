import { CartProduct } from '../types/types';

export const getCartProducts = (): CartProduct[] => {
  const rawValue = localStorage.getItem('shopping-cart');
  if (rawValue) {
    try {
      const saved: CartProduct[] = JSON.parse(rawValue);
      return saved;
    } catch (error) {
      return [];
    }
  }
  return [];
};

export function saveCartState<T>(key: string, state: T) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // Ignore
  }
}
