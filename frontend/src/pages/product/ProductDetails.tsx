import {
  Alert,
  Button,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../features/cart/cart-slice';
import { useAppDispatch } from '../../hooks/hooks';
import useProduct from '../../hooks/useProduct';
import formatMoney from '../../utils/format-money';
import useStyles from './styles';

function ProductDetails() {
  const { productId } = useParams();
  const { classes } = useStyles();
  const { error, loading, product } = useProduct(productId);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<string | null>('0');

  const getSelectData = (stock: number): string[] => {
    const data: string[] = [];
    for (let i = 0; i <= stock; i += 1) {
      data.push(i.toString());
    }
    return data;
  };

  const selectData: string[] = getSelectData(product.stock);

  return (
    <Container size={1080} py={36}>
      {loading && <Center><Loader size="xl" color="violet" variant="bars" /></Center>}
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
      {(!error && !loading) && (
        <Group align="flex-start" spacing={48}>
          <Stack>
            <Image
              src={product.img_url ? product.img_url : undefined}
              width="100%"
              radius="md"
              alt={product.name}
              fit="cover"
              style={{ maxWidth: '460px' }}
              withPlaceholder={!product.img_url}
            />
          </Stack>

          <Stack align="flex-start" justify="flex-start">
            <Text className={classes.text} weight={500} size={20}>{product.name}</Text>
            <Stack spacing="sm" style={{ maxWidth: '400px' }}>
              <Text className={classes.text} size={18}>Description</Text>
              <Text>{product.description ? product.description : '--'}</Text>
              <Text
                size={26}
                weight={700}
                sx={{ lineHeight: 1 }}
                className={classes.priceText}
              >
                {formatMoney(Number(product.sale_price))}
              </Text>
            </Stack>
            <Group mt={18} style={{ width: '100%' }} noWrap>
              <Select
                radius="md"
                size="md"
                data={selectData}
                value={quantity}
                onChange={setQuantity}
              />
              <Button
                radius="md"
                size="md"
                fullWidth
                onClick={() => dispatch(addToCart({ product, quantity: Number(quantity) }))}
              >
                Add to cart
              </Button>
            </Group>
          </Stack>
        </Group>
      )}
    </Container>
  );
}

export default ProductDetails;
