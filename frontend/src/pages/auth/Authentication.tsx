import React from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Center,
} from '@mantine/core';

enum AuthForm {
  LOGIN = 'Log in',
  SIGNUP = 'Sign up',
}

function Authentication(props: PaperProps) {
  const [type, toggle] = useToggle([AuthForm.LOGIN, AuthForm.SIGNUP]);
  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 8 ? 'Password should include at least 8 characters' : null),
    },
  });

  const handleSubmit = () => {
    // TODO: Use services to make the signin d signup
  };

  return (
    <Center style={{ minHeight: '90vh' }}>
      <Paper radius="md" p="xl" withBorder {...props} style={{ maxWidth: '600px', width: '100%' }}>
        <Text size="xl" weight={500} mb={12}>
          {type}
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === AuthForm.SIGNUP && (
              <>
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  value={form.values.firstName}
                  onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  value={form.values.lastName}
                  onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                />
              </>
            )}

            <TextInput
              required
              label="Email"
              placeholder="tsstore@example.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === AuthForm.SIGNUP
                ? 'Already have an account? Log In'
                : "Don't have an account? Sign Up"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}

export default Authentication;
