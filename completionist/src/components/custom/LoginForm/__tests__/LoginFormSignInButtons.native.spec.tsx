import React from 'react';
import { screen, render, waitFor, fireEvent } from '@utils/testing/TestLibraryUtils.native';
import LoginFormSignInButtons from '../LoginFormSignInButtons.native';
import { initialState as loginState } from '../provider/LoginState';
import * as useGetLoginMethods from '../hooks/useGetLoginMethods';

describe('LoginFormSignInButtons', () => {
	const checkUserAccountMock = jest.fn();

	beforeEach(() => {
		jest.spyOn(useGetLoginMethods, 'default')
			.mockReturnValue({
				checkUserAccount: checkUserAccountMock,
				googleUserSignIn: jest.fn(),
				signOut: jest.fn()
			});
	});

	afterEach(() => {
    jest.clearAllMocks();
  });


	describe('when logging in', () => {
		it('renders correctly', () => {
			render(<LoginFormSignInButtons />);
	
			expect(screen.getByTestId('google-sign-in')).toBeTruthy();
			expect(screen.getByText('common:auth.login')).toBeTruthy();
			expect(screen.getByText('common:auth.requestAccount')).toBeTruthy();
			expect(screen.getByText('common:auth.signUp')).toBeTruthy();
		});

		// TODO: Fix here
		it.only('calls userSignIn function on login button press', async () => {
			const initialState = {
				login: {
					loginFormData: {
						username: 'Test',
						email: 'test@gmail.com',
						pw: 'TestPass1!'
					},
					isSigningUp: true
				}
			};
			render(<LoginFormSignInButtons />, { initialState });

			fireEvent.press(screen.getByTestId('login-button'));

			await waitFor(() => {
				expect(checkUserAccountMock).toHaveBeenCalledTimes(1);
			});
			// const test = result.current.userSignIn()
			// Add expectations for userSignIn function being called
		});
	});

	describe('when signing up', () => {
		const initialState = {
			login: {
				...loginState,
				isSigningUp: true
			}
		};

		it('renders correctly', () => {
			render(<LoginFormSignInButtons />, { initialState });
	
			expect(screen.getByText('common:auth.createAccount')).toBeTruthy();
			expect(screen.getByText('common:auth.backToLogin')).toBeTruthy();
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