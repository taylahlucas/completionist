import React from 'react';
import { render, fireEvent, renderHook } from '@utils/testing/TestLibraryUtils.native';
import LoginFormSignInButtons from '../LoginFormSignInButtons.native';
import { initialState as loginState } from '../provider/LoginState';
import useGetLoginMethods from '../hooks/useGetLoginMethods';

describe('LoginFormSignInButtons', () => {
	afterEach(() => {
    jest.clearAllMocks();
  });

	it('renders the google sign in button', () => {
		const { getByTestId } = render(<LoginFormSignInButtons />);

		expect(getByTestId('google-sign-in')).toBeTruthy();
	});

	describe('when logging in', () => {
		it('renders the correct button title', () => {
			const { getByText } = render(<LoginFormSignInButtons />);
	
			expect(getByText('common:auth.login')).toBeTruthy();
		});

		it('renders the request account button', () => {
			const { getByTestId } = render(<LoginFormSignInButtons />);
	
			expect(getByTestId('request-account')).toBeTruthy();
		});
	
		it('renders the request account button', () => {
			const { getByTestId } = render(<LoginFormSignInButtons />);
	
			expect(getByTestId('request-account')).toBeTruthy();
		});
	
		it('renders the correct back button title', () => {
			const { getByText } = render(<LoginFormSignInButtons />);
	
			expect(getByText('common:auth.signUp')).toBeTruthy();
		});

		// TODO: Issue with renderHook(useGetLoginMethods) - Could not find react-redux context value; please ensure the component is wrapped in a <Provider>
		// it('calls userSignIn function on login button press', () => {
		// 	const { getByTestId } = render(<LoginFormSignInButtons />);
		// 	const { result } = renderHook(() => useGetLoginMethods());
		// 	const loginButton = getByTestId('login-button');

		// 	fireEvent.press(loginButton);

		// 	const test = result.current.userSignIn()
		// 	// Add expectations for userSignIn function being called
		// });
	});

	describe('when signing up', () => {
		const initialState = {
			login: {
				...loginState,
				isSigningUp: true
			}
		};
		it('renders the correct button title', () => {
			const { getByText } = render(<LoginFormSignInButtons />, { initialState });
	
			expect(getByText('common:auth.createAccount')).toBeTruthy();
		});

		it('renders the correct back button title', () => {
			const { getByText } = render(<LoginFormSignInButtons />, { initialState });
	
			expect(getByText('common:auth.backToLogin')).toBeTruthy();
		});

	// it('calls createUser function on create account button press', () => {});


  // it('calls googleSignIn function on Google Sign-In button press', () => {
  //   const { getByText } = render(<LoginFormSignInButtons />);
  //   const googleSignInButton = getByText('Google Sign-In');
  //   fireEvent.press(googleSignInButton);
  //   // Add expectations for googleSignIn function being called
  // });

	  // it('toggles isSigningUp state on Sign-Up/Back to Login button press', () => {
  //   const { getByText } = render(<LoginFormSignInButtons />);
  //   const signUpButton = getByText('common:auth.signUp');
  //   fireEvent.press(signUpButton);
  //   // Add expectations for triggerIsSigningUp function being called with the correct argument
  // });
	})
});