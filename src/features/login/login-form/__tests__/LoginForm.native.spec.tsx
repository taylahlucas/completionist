import React from 'react';
import { render, fireEvent } from '@utils/testing/test-library-utils';
import LoginForm from '../login-form';
import { initialState as loginState } from '../../provider/login-state';

describe('LoginForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates email value on TextInput change', () => {
    const { getByTestId } = render(<LoginForm />);
    const emailInput = getByTestId('email');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('resets email value on Reset button press', () => {
    const { getByTestId } = render(<LoginForm />);
    const emailInput = getByTestId('email');
    fireEvent.changeText(emailInput, 'test@example.com');

    const resetButton = getByTestId('reset-input');
    fireEvent.press(resetButton);

    expect(emailInput.props.value).toBe('');
  });

  it('updates password value on TextInput change', () => {
    const { getByTestId } = render(<LoginForm />);
    const passwordInput = getByTestId('password');
    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  it('renders the show/hide option on password entry', () => {
    const { getByTestId } = render(<LoginForm />);
    const passwordInput = getByTestId('password');
    fireEvent.changeText(passwordInput, 'password123');

    expect(getByTestId('show-password')).toBeTruthy();
  });

  describe('when logging in', () => {
    it('renders Forgot Password button', () => {
      const { queryByTestId } = render(<LoginForm />);
      expect(queryByTestId('forgot-password')).toBeTruthy();
    });
  });

  describe('when signing up', () => {
    const initialState = {
      login: {
        ...loginState,
        isSigningUp: true,
      },
    };

    it('updates username value on TextInput change when signing up', () => {
      const { getByTestId } = render(<LoginForm />, { initialState });
      const usernameInput = getByTestId('username');
      fireEvent.changeText(usernameInput, 'user123');

      expect(usernameInput.props.value).toBe('user123');
    });

    it('resets username value on Reset button press', () => {
      const { getByTestId } = render(<LoginForm />, { initialState });
      const usernameInput = getByTestId('username');
      fireEvent.changeText(usernameInput, 'user123');

      const resetButton = getByTestId('reset-input');
      fireEvent.press(resetButton);

      expect(usernameInput.props.value).toBe('');
    });

    it('does not render Forgot Password button', () => {
      const { queryByTestId } = render(<LoginForm />, { initialState });
      expect(queryByTestId('forgot-password')).toBeFalsy();
    });

    // TODO: Navigates to ForgotPassword screen on button press
  });
});
