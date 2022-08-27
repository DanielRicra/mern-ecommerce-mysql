import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  cartListBg: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.2)',
  },
  cartListBorder: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'transparent',
    borderBottomColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3],
  },
}));

export default useStyles;
