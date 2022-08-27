import React, { useState } from 'react';
import {
  Header, Autocomplete, Group, Image, Text, Center, Indicator, Avatar,
  Menu, UnstyledButton, Select,
} from '@mantine/core';
import {
  IconSearch, IconShoppingCart, IconTruckDelivery,
  IconChevronDown, IconSettings, IconSwitchHorizontal, IconLogout, IconUserCircle,
} from '@tabler/icons';
import { NavLink } from 'react-router-dom';

import ToggleThemetButton from '../../components/ToggleThemeButton';
import useHeaderStyles from './styles';
import brandLogo from '../../assets/brand-logo.png';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { deleteUser } from '../../features/user/user-slice';

function HeaderSearch() {
  const { classes, cx } = useHeaderStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);

  const cartProductsQuantity = cartProducts.reduce((amount, cp) => cp.quantity + amount, 0);

  const categoriesSelect = (
    <Select
      data={['All', 'Milks', 'Meat', 'Drinks', 'Vegetables']}
      defaultValue="All"
      variant="filled"
      size="md"
      styles={{
        input: {
          borderRadius: '8px',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  const logout = () => {
    dispatch(deleteUser());
    localStorage.clear();
  };

  return (
    <Header height="auto" className={classes.header}>
      <div className={classes.inner}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Group spacing={8}>
            <Image src={brandLogo} alt="Brand Logo" width={28} />
            <Text className={classes.textLogo}>TS Store</Text>
          </Group>
        </NavLink>

        <Autocomplete
          size="md"
          radius="md"
          style={{ flex: 1 }}
          className={classes.search}
          icon={<IconSearch size={16} stroke={1.5} />}
          data={['item 1', 'key 4', 'mouse 3', 'lantern 4', 'perro 5', 'gato 6', 'computer 7', 'pencil 8']}
          placeholder="Search"
          rightSection={categoriesSelect}
          rightSectionWidth={120}
        />

        <Group spacing={4}>
          {user.email !== '' ? (
            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group spacing={7}>
                    <Avatar radius="xl" size={28} />
                    <Text weight={500} size="md" sx={{ lineHeight: 1 }} mr={3}>
                      {`${user.firstName} ${user.lastName.charAt(0)}.`}
                    </Text>
                    <IconChevronDown size={20} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                  Change account
                </Menu.Item>
                <Menu.Item
                  icon={<IconLogout size={14} stroke={1.5} />}
                  onClick={logout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <NavLink to="/auth" className={classes.link}>
              <Center style={{ gap: 8 }}>
                <IconUserCircle stroke={1} size={28} />
                <Text>Sign In</Text>
              </Center>
            </NavLink>
          )}

          <NavLink to="/orders" className={classes.link}>
            <Center style={{ gap: 8 }}>
              <IconTruckDelivery size={28} stroke={1} />
              <Text>Orders</Text>
            </Center>
          </NavLink>

          <NavLink to="/cart" className={classes.link}>
            <Center style={{ gap: 8 }}>
              <Indicator size={16} label={cartProductsQuantity}>
                <IconShoppingCart size={28} stroke={1} />
              </Indicator>
              <Text>Cart</Text>
            </Center>
          </NavLink>
          <ToggleThemetButton />
        </Group>
      </div>
    </Header>
  );
}

export default HeaderSearch;
