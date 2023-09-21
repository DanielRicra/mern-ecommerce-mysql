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
import { useNavigate } from 'react-router-dom';
import PurchaseList from '../../components/purchases/PurchaseList';
import { useAppSelector } from '../../hooks/hooks';
import usePurchases from '../../hooks/usePurchases';

function Orders() {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const {
    error,
    loading,
    purchasesResponse,
    setPage,
  } = usePurchases(user.userId);

  useEffect(() => {
    if (user.email === '') {
      navigate('/auth');
    }
  }, []);

  return (
    <Container size={1080} py={36} style={{ minHeight: '100vh' }}>
      <Title order={2} style={{ fontSize: '22px' }} pl={4} mb={18}>Orders</Title>
      <Paper mb={18}>
        {loading && <Center><Loader size="xl" color="violet" variant="bars" /></Center>}
        {!error && !loading && (
          <>
            <PurchaseList purchases={purchasesResponse.results} />
            {purchasesResponse.results.length !== 0 && (
              <Center my={32}>
                <Pagination
                  total={purchasesResponse.total_pages}
                  color="violet"
                  radius="md"
                  page={purchasesResponse.page}
                  onChange={(pg: number) => setPage(pg)}
                />
              </Center>

            )}
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
              Something bad happened, refresh the page or try again later
            </Alert>
          </Center>
        )}
      </Paper>
    </Container>
  );
}

export default Orders;
