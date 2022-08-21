import React, { useEffect, useState } from 'react';
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
  Notification,
} from '@mantine/core';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconX } from '@tabler/icons';

import { useUserDispatch } from '../../hooks/useUser';
import { saveUser } from '../../features/user/user-slice';
import { signin, signup } from '../../services/services';
import useLocalStorage from '../../hooks/useLocalStorage';
import { AuthResponse } from '../../types/types';

enum AuthForm {
  LOGIN = 'Log in',
  SIGNUP = 'Sign up',
}

function Authentication(props: PaperProps) {
  const [type, toggle] = useToggle([AuthForm.LOGIN, AuthForm.SIGNUP]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useLocalStorage<AuthResponse>('user');
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

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

  const handleSubmit = async () => {
    setLoading(true);
    if (type === AuthForm.LOGIN) {
      await signin(form.values)
        .then((response) => {
          dispatch(saveUser(response.data.result));
          setUser(response.data);
        })
        .catch((error: AxiosError) => {
          const err = error.response?.data;
          if (err !== undefined) {
            setErrorMessage(JSON.stringify(err).slice(12, -2));
          } else {
            setErrorMessage('Something went wrong try again later');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      await signup(form.values)
        .then((response) => {
          dispatch(saveUser(response.data.result));
          setUser(response.data);
        })
        .catch((error: AxiosError) => {
          const err = error.response?.data;
          if (err !== undefined) {
            setErrorMessage(JSON.stringify(err).slice(12, -2));
          } else {
            setErrorMessage('Something went wrong try again later');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      navigate('/');
    }
  }, [user]);

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

            {errorMessage !== '' && (
              <Notification color="red" icon={<IconX size={18} />} onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Notification>
            )}
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
            <Button type="submit" loading={loading}>{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}

export default Authentication;
