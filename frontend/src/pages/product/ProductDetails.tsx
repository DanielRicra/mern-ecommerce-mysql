import {
  Alert,
  Button,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Modal,
  Notification,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../features/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import useProduct from '../../hooks/useProduct';
import getDataForSelectUIComponent from '../../utils/data-generator';
import formatMoney from '../../utils/format-money';
import SuccessModal from './components/SuccessModal';
import useStyles from './styles';

function ProductDetails() {
  const { productId } = useParams();
  const { classes } = useStyles();
  const { error, loading, product } = useProduct(productId);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<string | null>('1');
  const { cartProducts } = useAppSelector((state) => state.cart);
  const [opened, setOpened] = useState([false, false]);

  const selectData: string[] = getDataForSelectUIComponent(1, product.stock);

  const handleAddToCartClick = () => {
    const cartItem = cartProducts.find((cp) => cp.product.product_id === product.product_id);
    if (cartItem && Number(quantity) + cartItem.quantity > product.stock) {
      setOpened([true, false]);
    } else {
      dispatch(addToCart({ product, quantity: Number(quantity) }));
      setOpened([false, true]);
    }
  };

  const subtotal = formatMoney(cartProducts.reduce((total, cp) => (
    Number(cp.product.sale_price) * cp.quantity + total
  ), 0));

  return (
    <>
      <Modal
        opened={opened[0]}
        onClose={() => setOpened([false, false])}
        title="Something bad happend"
        centered
      >
        <Notification icon={<IconCheck size={20} />} color="red" style={{ backgroundColor: 'transparent' }} disallowClose>
          There is no enought products
        </Notification>
      </Modal>

      <SuccessModal
        cartProductsLength={cartProducts.length}
        opened={opened[1]}
        product={product}
        subtotal={subtotal}
        setOpened={setOpened}
      />

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
                width={420}
                height={420}
                radius="md"
                alt={product.name}
                fit="contain"
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
                  onClick={handleAddToCartClick}
                >
                  Add to cart
                </Button>
              </Group>
            </Stack>
          </Group>
        )}
      </Container>
    </>
  );
}

export default ProductDetails;
