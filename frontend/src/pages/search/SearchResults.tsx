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
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../../components/products/ProductList';
import getProductsByNameAndCategory from '../../features/products/product-middleware';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function SearchResults() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsResponse = useAppSelector((state) => state.products.productsResponse);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    let isCancelled = false;

    const name = searchParams.get('name') || '%';
    const categoryId = searchParams.get('categoryId');
    const pg = searchParams.get('page') || '1';
    if (!isCancelled) {
      dispatch(getProductsByNameAndCategory({
        name,
        categoryId: Number(categoryId),
        page: Number(pg),
      }));
    }

    return () => {
      isCancelled = true;
    };
  }, [searchParams]);

  const handlePagination = (page: number) => {
    const name = searchParams.get('name') || '%';
    const categoryId = searchParams.get('categoryId') || '0';
    setSearchParams({ name, categoryId, page: page.toString() });
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
                onChange={(page: number) => {
                  handlePagination(page);
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
              {error}
            </Alert>
          </Center>
        )}
      </Paper>
    </Container>
  );
}

export default SearchResults;
