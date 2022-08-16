import React from 'react';
import {
  Container, Title, Text, Button, Group,
} from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons';
import { Link } from 'react-router-dom';

import NotFoundImage from './NotFoundImage';
import useStyles from './styles';

function NothingFoundBackground() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <NotFoundImage className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group position="center">
            <Link to="/">
              <Button size="md" leftIcon={<IconArrowNarrowLeft stroke={1} />}>
                Take me back to home page
              </Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}

export default NothingFoundBackground;
