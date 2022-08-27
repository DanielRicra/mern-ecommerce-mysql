import {
  Button,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';

import ShoppingCart from '../../components/products/cart/ShoppingCart';
import useStyles from '../../components/products/cart/styles';
import { useAppSelector } from '../../hooks/hooks';
import formatMoney from '../../utils/format-money';

function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartProducts);
  const { classes } = useStyles();
  const subtotal = formatMoney(cartItems.reduce((quantity, item) => (
    Number(item.product.sale_price) * item.quantity + quantity
  ), 0));

  const subtotalText = (
    <Text align="right" size={20} weight={300}>
      Subtotal (
      {cartItems.length}
      {' '}
      items):&nbsp;
      <span style={{ fontWeight: '500' }}>{subtotal}</span>
    </Text>
  );

  return (
    <Group align="flex-start" spacing="xl" py={36} px={28}>
      <Stack style={{ flex: 1 }} className={classes.cartListBg} p={22}>
        <Title order={2}>Cart Shopping</Title>
        <Text align="right" className={classes.cartListBorder}>Price</Text>
        <ShoppingCart cartItems={cartItems} />
        {subtotalText}
      </Stack>
      <Stack className={classes.cartListBg} p={22}>
        {subtotalText}
        <Button>Proceed to checkout</Button>
      </Stack>
    </Group>
  );
}

export default Cart;
