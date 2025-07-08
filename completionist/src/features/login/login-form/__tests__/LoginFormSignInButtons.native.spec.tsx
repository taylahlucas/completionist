import React from 'react';
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from '@utils/testing/test-library-utils';
import LoginFormSignInButtons from '../login-form-sign-in-buttons';
import { initialState as loginState } from '../../provider/login-state';
import * as useGetLoginMethods from '../hooks/use-get-login-methods';
import { mockAuthEndpoints } from '@utils/testing/mocks';
import { userLoggedInMock } from '@utils/testing/test-helper/__mocks__/mocks';

describe('LoginFormSignInButtons', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when logging in', () => {
    const initialState = {
      login: {
        loginFormData: {
          username: 'Test',
          email: 'test@gmail.com',
          pw: 'TestPass1!',
        },
        isSigningUp: false,
      },
    };

    it('renders correctly', () => {
      render(<LoginFormSignInButtons />);

      expect(screen.getByTestId('google-sign-in')).toBeTruthy();
      expect(screen.getByText('common:auth.login')).toBeTruthy();
      expect(screen.getByText('common:auth.requestAccount')).toBeTruthy();
      expect(screen.getByText('common:auth.signUp')).toBeTruthy();
    });

    it('calls the checkUserAccount function on login button press', () => {
      const checkUserAccountMock = jest.fn();
      jest.spyOn(useGetLoginMethods, 'default').mockReturnValue({
        checkUserAccount: checkUserAccountMock,
        googleUserSignIn: jest.fn(),
        signOut: jest.fn(),
      });

      render(<LoginFormSignInButtons />, { initialState });

      fireEvent.press(screen.getByTestId('login-button'));

      expect(checkUserAccountMock).toHaveBeenCalledTimes(1);
      expect(checkUserAccountMock).toHaveBeenCalledWith({
        email: 'test@gmail.com',
        pw: 'TestPass1!',
      });
    });

    // TODO: Fix here
    it('calls checkUserExists api', async () => {
      const checkUserExistsMock = jest.fn();
      mockAuthEndpoints({
        checkUserExists: checkUserExistsMock.mockResolvedValue({
          data: {
            regular: true,
            google: false,
          },
        }),
      });
      render(<LoginFormSignInButtons />, { initialState });

      fireEvent.press(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(checkUserExistsMock).toHaveBeenCalledTimes(1);
        expect(checkUserExistsMock).toHaveBeenCalledWith('test@gmail.com');
      });
    });

    // TODO: Fix here
    it('calls the signIn api if user account exists', async () => {
      const signInMock = jest.fn();
      mockAuthEndpoints({
        signIn: signInMock.mockResolvedValue({
          data: {
            user: userLoggedInMock,
            token: 'abc123',
          },
        }),
      });

      render(<LoginFormSignInButtons />, { initialState });

      fireEvent.press(screen.getByTestId('login-button'));

      await waitFor(() => {
        expect(signInMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when signing up', () => {
    const initialState = {
      login: {
        ...loginState,
        isSigningUp: true,
      },
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
  });
});
