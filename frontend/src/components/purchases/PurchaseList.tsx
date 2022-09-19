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
            <Group>
              <Text weight="bold">Purchase N°:&nbsp;</Text>
              {index + 1}
            </Group>
            <Group>
              <Text weight="bold">Date: </Text>
              {purchase.purchase_date ? formatDatetime(purchase.purchase_date) : '--:--:--'}
            </Group>
            <Group>
              <Text weight="bold">Total: </Text>
              {formatMoney(purchase.products.reduce((quantity, item) => (
                Number(item.sale_price) * item.quantity + quantity
              ), 0))}
            </Group>
            <Group>
              {purchase.status === 1 ? (
                <Text color="green">Closed</Text>
              ) : (
                <Text color="orange">Pending order</Text>
              )}
            </Group>
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
                <Stack spacing="sm">
                  <Text>{product.name}</Text>
                  <Text>
                    Quantity:&nbsp;
                    {product.quantity}
                  </Text>
                </Stack>
              </Group>
            </Group>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default PurchaseList;
