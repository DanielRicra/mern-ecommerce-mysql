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

import useProducts from '../../hooks/useProducts';
import ProductList from '../../components/products/ProductList';

function Home() {
  const {
    loading,
    error,
    productsResponse,
    setPage,
  } = useProducts();

  return (
    <Container size={1080} py={36}>
      <Title order={2} style={{ fontSize: '22px' }} pl={4} mb={18}>Results</Title>
      <Paper mb={18}>
        {loading && <Center><Loader size="xl" color="violet" variant="bars" /></Center>}
        {(!error && !loading) && (
          <>
            <ProductList products={productsResponse.results} />
            <Center my={32}>
              <Pagination
                total={productsResponse.total_pages}
                color="violet"
                radius="md"
                page={productsResponse.page}
                onChange={(page: number) => setPage(page)}
              />
            </Center>
          </>
        )}
        {error && (
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

export default Home;
