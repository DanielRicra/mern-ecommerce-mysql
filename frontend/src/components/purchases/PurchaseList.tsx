import {
  Center,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';
import { PurchaseListProps } from '../../types/types';
import formatDatetime from '../../utils/format-datetime';
import formatMoney from '../../utils/format-money';

function PurchaseList({ purchases }: PurchaseListProps) {
  if (purchases.length === 0) {
    return (
      <Center>
        <Text>You dont have any purchases yet</Text>
      </Center>
    );
  }

  return (
    <Stack>
      {purchases.map((purchase, index) => (
        <Stack key={purchase.purchase_id} spacing="sm">
          <Group style={{ borderBottom: '1px solid #666' }}>
            <Text>
              Purchase N°:&nbsp;
              {index + 1}
            </Text>
            <Group>
              <Text>Date: </Text>
              {purchase.purchase_date ? formatDatetime(purchase.purchase_date) : '--:--:--'}
            </Group>
            <Text>
              Total:&nbsp;
              {formatMoney(purchase.products.reduce((quantity, item) => (
                Number(item.sale_price) * item.quantity + quantity
              ), 0))}
            </Text>
          </Group>
          {purchase.products.map((product) => (
            <Group key={product.product_id} px={16} position="apart">
              <Group>
                <Image
                  fit="contain"
                  width={94}
                  height={94}
                  src={product.img_url ? product.img_url : undefined}
                  withPlaceholder={!product.img_url}
                  alt={product.name}
                />
                <Text>{product.name}</Text>
              </Group>
              <Stack spacing="sm">
                <Text>{formatMoney(Number(product.sale_price))}</Text>
                <Text>
                  Quantity:&nbsp;
                  {product.quantity}
                </Text>
              </Stack>
            </Group>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default PurchaseList;
