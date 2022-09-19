import {
  Stack,
} from '@mantine/core';
import React from 'react';
import { ShoppingCartProps } from '../../types/types';
import CartItem from './CartItem';

function ShoppingCart({ cartItems }: ShoppingCartProps) {
  return (
    <Stack>
      {cartItems.map(({ product, quantity }) => (
        <CartItem product={product} quantity={quantity} key={product.product_id} />
      ))}
    </Stack>
  );
}

export default ShoppingCart;
