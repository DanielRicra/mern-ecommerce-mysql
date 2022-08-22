import React from 'react';
import {
  Center,
  Container,
  Pagination,
  Paper,
  Title,
} from '@mantine/core';
import useProducts from './useProducts';
import ProductList from '../../components/products/ProductList';

function Home() {
  const { productsResponse, setPage } = useProducts();

  return (
    <Container size={1080} py={36}>
      <Title order={2} style={{ fontSize: '22px' }} pl={4} mb={18}>Results</Title>
      <Paper mb={18}>
        <ProductList products={productsResponse.results} />

        <Center my={32}>
          <Pagination
            total={productsResponse.total_pages}
            color="violet"
            radius="md"
            onChange={(page: number) => setPage(page)}
          />
        </Center>
      </Paper>
    </Container>
  );
}

export default Home;
