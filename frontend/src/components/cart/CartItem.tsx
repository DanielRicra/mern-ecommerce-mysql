import {
  Button,
  Group,
  Image,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';
import { updateQuantityFromCart } from '../../features/cart/cart-slice';
import { useAppDispatch } from '../../hooks/hooks';
import { CartItemProps } from '../../types/types';
import getDataForSelectUIComponent from '../../utils/data-generator';
import formatMoney from '../../utils/format-money';
import useStyles from './styles';

function CartItem({ product, quantity }: CartItemProps) {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  return (
    <Group
      px={12}
      py={18}
      style={{ justifyContent: 'space-between' }}
      align="flex-start"
      className={classes.cartListBorder}
    >
      <Group align="flex-start">
        <div style={{ maxWidth: '200px', width: '100%', height: '200px' }}>
          <Image
            src={product.img_url ? product.img_url : undefined}
            alt={product.name}
            height="200px"
            width="200px"
            radius="md"
            fit="contain"
            withPlaceholder={!product.img_url}
          />
        </div>
        <Stack spacing="xl">
          <Text size={22} weight={400}>{product.name}</Text>
          <Group noWrap grow={false}>
            <Select
              radius="md"
              size="sm"
              defaultValue={quantity.toString()}
              style={{ width: '100px' }}
              data={getDataForSelectUIComponent(1, product.stock)}
              onChange={(value) => {
                dispatch(updateQuantityFromCart({
                  productId: product.product_id, quantity: Number(value),
                }));
              }}
            />
            <Button
              variant="subtle"
              onClick={() => {
                dispatch(updateQuantityFromCart({ productId: product.product_id, quantity: 0 }));
              }}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Group>
      <Text size={24} weight={700} align="right">{formatMoney(Number(product.sale_price))}</Text>
    </Group>
  );
}

export default CartItem;
