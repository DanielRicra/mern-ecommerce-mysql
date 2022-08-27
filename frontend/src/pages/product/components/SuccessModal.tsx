import {
  Button,
  Group,
  Image,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/types';

type SuccessModalProps = {
  opened: boolean;
  product: Product;
  cartProductsLength: number;
  subtotal: string;
  setOpened: React.Dispatch<React.SetStateAction<boolean[]>>;
};

function SuccessModal({
  opened,
  product,
  cartProductsLength,
  subtotal,
  setOpened,
}: SuccessModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened([false, false])}
      centered
    >
      <Stack>
        <Group>
          <Image
            height={200}
            width={200}
            fit="contain"
            src={product.img_url ? product.img_url : undefined}
            withPlaceholder={!product.img_url}
          />
          <Text size={18}>Added to cart</Text>
        </Group>
        <Text align="right" size={20} weight={300}>
          Subtotal (
          {cartProductsLength}
          {' '}
          items):&nbsp;
          <span style={{ fontWeight: '500' }}>{subtotal}</span>
        </Text>
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <Button fullWidth>Go to cart</Button>
        </Link>
      </Stack>
    </Modal>
  );
}

export default SuccessModal;
