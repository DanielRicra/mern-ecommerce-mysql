import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9],
  },
  priceText: {
    color: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.colors.dark[7],
  },
}));

export default useStyles;
