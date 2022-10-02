import {
  Card,
  CardSection,
  Group,
  Image,
  Text,
  Tooltip,
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
      style={{ width: '240px', cursor: 'pointer' }}
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
        <Tooltip
          label={product.name}
          color="blue"
          withArrow
          offset={14}
          multiline
          transition="slide-up"
          transitionDuration={200}
          arrowSize={6}
        >
          <Text
            weight={500}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </Text>
        </Tooltip>
      </Group>

      <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
        {formatMoney(Number(product.sale_price))}
      </Text>
    </Card>
  );
}

export default Product;
