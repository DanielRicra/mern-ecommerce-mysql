import React from 'react';
import {
  Text,
  Container,
  ActionIcon,
  Group,
  Image,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import brandLogo from '../../assets/brand-logo.png';
import useStyles from './styles';

interface FooterProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

function Footer({ data }: FooterProps) {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link) => (
      <Text<'a'>
        key={`${link}-00${Math.random() * 10000}`}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image src={brandLogo} width={32} />
          <Text size="xs" color="dimmed" className={classes.description}>
            Buy the best products, quality is better than quantity.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2022 TS Store. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default Footer;
