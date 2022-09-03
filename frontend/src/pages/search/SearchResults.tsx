import {
  Alert,
  Center,
  Container,
  Loader,
  Pagination,
  Paper,
  Title,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../../components/products/ProductList';
import getProductsByNameAndCategory from '../../features/products/product-middleware';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function SearchResults() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsResponse = useAppSelector((state) => state.products.productsResponse);
  const status = useAppSelector((state) => state.products.status);

  useEffect(() => {
    let isCancelled = false;

    const query = searchParams.get('q') || '%';
    const categoryId = searchParams.get('catId');
    const pg = searchParams.get('page') || '1';
    if (!isCancelled) {
      dispatch(getProductsByNameAndCategory({
        name: query,
        categoryId: Number(categoryId),
        page: Number(pg),
      }));
    }

    return () => {
      isCancelled = true;
    };
  }, [searchParams]);

  const handlePagination = (pg: number) => {
    const query = searchParams.get('q') || '%';
    const categoryId = searchParams.get('catId') || '0';
    setSearchParams({ q: query, catId: categoryId, page: pg.toString() });
  };

  return (
    <Container size={1080} py={36} style={{ minHeight: '100vh' }}>
      <Title order={2} style={{ fontSize: '22px' }} pl={4} mb={18}>Results</Title>
      <Paper mb={18}>
        {status === 'loading' && <Center><Loader size="xl" color="violet" variant="bars" /></Center>}
        {status === 'succeeded' && (
          <>
            <ProductList products={productsResponse.results} />
            <Center my={32}>
              <Pagination
                total={productsResponse.total_pages}
                color="violet"
                radius="md"
                page={productsResponse.page}
                onChange={(pg: number) => {
                  handlePagination(pg);
                }}
              />
            </Center>
          </>
        )}
        {status === 'failed' && (
          <Center>
            <Alert
              icon={<IconAlertCircle size={18} />}
              title="Error"
              color="red"
              variant="outline"
              radius="md"
            >
              Something bad happend, refresh the page or try again later
            </Alert>
          </Center>
        )}
      </Paper>
    </Container>
  );
}

export default SearchResults;
