import {
  Card,
  CardSection,
  Group,
  Image,
  Text,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductProps } from '../../../types/types';
import formatMoney from '../../../utils/format-money';

function Product({ product }: ProductProps) {
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      key={product.product_id}
      style={{ minWidth: '240px', cursor: 'pointer' }}
      onClick={() => navigate(`/products/${product.product_id}`)}
    >
      <CardSection>
        <Image
          fit="cover"
          src={product.img_url ? product.img_url : undefined}
          height={160}
          width={240}
          alt={product.name}
          withPlaceholder={!product.img_url}
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
