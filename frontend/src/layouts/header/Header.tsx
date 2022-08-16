import React, { useState } from 'react';
import {
  Header, Autocomplete, Group, Image, Text, Center, Indicator, Avatar,
  Menu, UnstyledButton, Select,
} from '@mantine/core';
import {
  IconSearch, IconShoppingCart, IconTruckDelivery,
  IconChevronDown, IconSettings, IconSwitchHorizontal, IconLogout,
} from '@tabler/icons';
import { NavLink } from 'react-router-dom';

import ToggleThemetButton from '../../components/ToggleThemeButton';
import useHeaderStyles from './styles';
import brandLogo from '../../assets/brand-logo.png';

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

function HeaderSearch({ links }: HeaderSearchProps) {
  const { classes, cx } = useHeaderStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.link}
    >
      {link.label}
    </NavLink>
  ));

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

  return (
    <Header height="auto" className={classes.header}>
      <div className={classes.inner}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Group spacing={8}>
            <Image src={brandLogo} alt="Brand Logo" width={28} />
            <Text className={classes.textLogo}>TS Store</Text>
          </Group>
        </NavLink>

        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

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

        <Group spacing={12}>
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
                    Dua Lipa
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
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <NavLink to="/orders" className={classes.link}>
            <Center style={{ gap: 8 }}>
              <IconTruckDelivery size={28} stroke={1} />
              <Text>Orders</Text>
            </Center>
          </NavLink>

          <NavLink to="/cart" className={classes.link}>
            <Center style={{ gap: 8 }}>
              <Indicator size={16} label="0">
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
