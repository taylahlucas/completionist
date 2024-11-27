import React from 'react';
import { render, screen, fireEvent } from '@utils/testing/TestLibraryUtils.native';
import VerificationContent from '../VerificationContent.native';
import * as useSendVerificationEmail from '@components/custom/LoginForm/hooks/useSendVerificationEmail';
import { mockAlert } from '@utils/testing/mocks';

describe('VerificationContent', () => {
  const buttonActionMock = jest.fn();
  const alertMock = jest.fn();
  const props = {
    email: 'test@gmail.com',
    token: 'ABC123',
    action: buttonActionMock
  }

  beforeEach(() => {
    mockAlert(alertMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<VerificationContent {...props} />);

    expect(screen.getByText('common:login.accountVerification'));
    expect(screen.getByText('common:login.resendToken'));
    expect(screen.getByText('common:continue'));
  });

  it("disables the continue button if user hasn't finished entering value", () => {
    render(<VerificationContent {...props} />);

    fireEvent.press(screen.getByText('common:continue'));
    
    expect(buttonActionMock).toHaveBeenCalledTimes(0);
  });
  
  it('calls buttonAction on continue button press with correct code', () => {
    render(<VerificationContent {...props} />);

    props.token.split("").forEach((value, index) => {
      fireEvent.changeText(screen.getByTestId(`verification-entry-input-${index}`), value);
    });

    const continueButton = screen.getByText('common:continue');
    expect(continueButton.props.disabled).toBeFalsy()
    fireEvent.press(continueButton);
    
    expect(buttonActionMock).toHaveBeenCalledTimes(1);
  });

  it('shows the incorrect code alert when an incorrect code is given', () => {
    render(<VerificationContent {...props} />);

    'asd12c'.split("").forEach((value, index) => {
      fireEvent.changeText(screen.getByTestId(`verification-entry-input-${index}`), value);
    });

    const continueButton = screen.getByText('common:continue');
    expect(continueButton.props.disabled).toBeFalsy()
    fireEvent.press(continueButton);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('common:errors.incorrectCode', 'common:errors.incorrectCodeDesc');
  });

  describe('when the resend token button is pressed', () => {
    it.only('calls sendVerification and displays an alert when resend button is pressed', () => {
      const sendVerificationMock = jest.fn();
      jest.spyOn(useSendVerificationEmail, 'default')
        .mockReturnValue(sendVerificationMock);

      render(<VerificationContent {...props} />);
  
      fireEvent.press(screen.getByText('common:login.resendToken'));
  
      expect(sendVerificationMock).toHaveBeenCalledTimes(1);
      expect(sendVerificationMock).toHaveBeenCalledWith("test@gmail.com", "common:sendRequest.verifyAccount");
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith('common:login.tokenResent');
    });
  
    // TODO: Not working -- fix when api mocks are working
    // it('calls the sendVerificationEmail api when the resend button is pressed', async () => {
    //   const sendVerificationEmailMock = authMocks.sendVerificationEmailMock;

    //   render(<VerificationContent {...props} />);

    //   fireEvent.press(screen.getByText('common:login.resendToken'));

    //   await waitFor(() => {
    //     expect(sendVerificationEmailMock).toHaveBeenCalledTimes(1);
    //     // expect(sendVerificationEmailMock).toHaveBeenCalledWith({
    //     //   emailTo: props.email,
    //     //   subject: 'common:screens.verifyAccount',
    //     //   text: props.token
    //     // });
    //   });
    // });

    // it('navigates to the correct screen', () => {});
  });
});