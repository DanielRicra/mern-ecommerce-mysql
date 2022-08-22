import { Group } from '@mantine/core';
import React from 'react';
import { ProductListProps } from '../../types/types';
import Product from './product/Product';

function ProductList({ products }: ProductListProps) {
  return (
    <Group spacing="sm" noWrap={false} position="center" grow>
      {products.map((product) => (
        <Product product={product} key={product.product_id} />
      ))}
    </Group>
  );
}

export default ProductList;
