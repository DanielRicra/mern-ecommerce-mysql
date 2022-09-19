import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ShoppingCart from '../../components/cart/ShoppingCart';
import useStyles from '../../components/cart/styles';
import { cleanCart } from '../../features/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import savePurchaseReducer, { INITIAL_STATE } from '../../reducers/save-purchase-reducer';
import { savePurchase } from '../../services/services';
import { ActionsTypes, SavePurchaseBody } from '../../types/types';
import formatMoney from '../../utils/format-money';

function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartProducts);
  const { classes } = useStyles();
  const subtotal = formatMoney(cartItems.reduce((quantity, item) => (
    Number(item.product.sale_price) * item.quantity + quantity
  ), 0));
  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const [state, dispatch] = useReducer(savePurchaseReducer, INITIAL_STATE);
  const cartDispatch = useAppDispatch();
  const navigate = useNavigate();

  const subtotalText = (
    <Text align="right" size={20} weight={300}>
      Subtotal (
      {cartItems.length}
      {' '}
      items):&nbsp;
      <span style={{ fontWeight: '500' }}>{subtotal}</span>
    </Text>
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    if (user.userId === 0) {
      navigate('/auth');
    }

    const items = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const { product, quantity } of cartItems) {
      items.push({
        productId: product.product_id,
        quantity,
        total: quantity * Number(product.sale_price),
      });
    }

    const postData: SavePurchaseBody = {
      userId: user.userId,
      comment: '--',
      items,
      paymentType: 'credit_card',
      status: 0,
    };

    dispatch({ type: ActionsTypes.FETCH_START });
    try {
      const response = await savePurchase(postData);
      dispatch({ type: ActionsTypes.FETCH_SUCCESS, payload: response.data });
      localStorage.removeItem('shopping-cart');
      cartDispatch(cleanCart());
      setOpen(true);
    } catch (error) {
      dispatch({ type: ActionsTypes.FETCH_ERROR });
      setOpen(true);
    }
  };

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        centered
        title="Message:"
      >
        {state.error && (
          'Something went wrong, please login again, try again later or contact support'
        )}
        {!state.loading && !state.error && (
          'Your order was successful, please wait for the seller to aprove it, we will notify you'
        )}
      </Modal>

      <Group align="flex-start" spacing="xl" py={36} px={28}>
        <Stack style={{ flex: 1 }} className={classes.cartListBg} p={22}>
          <Title order={2}>Cart Shopping</Title>
          <Text align="right" className={classes.cartListBorder}>Price</Text>
          <ShoppingCart cartItems={cartItems} />
          {subtotalText}
        </Stack>
        <Stack className={classes.cartListBg} p={22}>
          {subtotalText}
          <Button onClick={handleCheckout}>Proceed to checkout</Button>
        </Stack>
      </Group>
    </>
  );
}

export default Cart;
