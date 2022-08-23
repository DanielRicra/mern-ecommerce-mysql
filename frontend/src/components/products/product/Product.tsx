import {
  Card,
  CardSection,
  Group,
  Image,
  Text,
} from '@mantine/core';
import React from 'react';
import { ProductProps } from '../../../types/types';
import formatMoney from '../../../utils/format-money';

function Product({ product }: ProductProps) {
  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      key={product.product_id}
      style={{ minWidth: '240px', cursor: 'pointer' }}
    >
      <CardSection>
        <Image
          fit="cover"
          src={product.img_url ? product.img_url : undefined}
          height={160}
          width={240}
          alt={product.name}
          withPlaceholder
        />
      </CardSection>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{product.name}</Text>
      </Group>

      <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
        {formatMoney(Number(product.sale_price))}
      </Text>
    </Card>
  );
}

export default Product;
