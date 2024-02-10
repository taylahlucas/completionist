import React from 'react';
import { render, fireEvent } from '@utils/TestLibraryUtils.native';
import LoginForm from '../LoginForm.native';
import { initialState as loginState } from '../LoginState';

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

  it('shows the password on button press', () => {
    const { getByTestId } = render(<LoginForm />);
    const passwordInput = getByTestId('password');
		fireEvent.changeText(passwordInput, 'password123');

    expect(getByTestId('show-password')).toBeTruthy();
  });

  it('updates username value on TextInput change when signing up', () => {
		const initialState = {
			login: {
				...loginState,
				isSigningUp: true
			}
		};
    const { getByTestId } = render(<LoginForm />, { initialState });
    const usernameInput = getByTestId('username');
    fireEvent.changeText(usernameInput, 'user123');

    expect(usernameInput.props.value).toBe('user123');
  });

  it('resets username value on Reset button press when signing up', () => {
		const initialState = {
			login: {
				...loginState,
				isSigningUp: true
			}
		};
    const { getByTestId } = render(<LoginForm />, { initialState });
    const usernameInput = getByTestId('username');
		fireEvent.changeText(usernameInput, 'user123');

    const resetButton = getByTestId('reset-input');
    fireEvent.press(resetButton);
		
    expect(usernameInput.props.value).toBe('');
  });

  it('renders Forgot Password button when not signing up', () => {
    const { queryByTestId } = render(<LoginForm />);
    expect(queryByTestId('forgot-password')).toBeTruthy();
  });

  it('does not render Forgot Password button when signing up', () => {
		const initialState = {
			login: {
				...loginState,
				isSigningUp: true
			}
		};
    const { queryByTestId } = render(<LoginForm />, { initialState });
    expect(queryByTestId('forgot-password')).toBeFalsy();
  });
});