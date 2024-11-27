// import * as useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';

// jest.mock('@data/api/hooks/useAuthEndpoints.native', () => ({
//   useAuthEndpoints: jest.fn(),
// }));

// export const mockAuthEndpoints = () => {
//   const checkUserExistsMock = jest.fn();
//   const signUpMock = jest.fn();
//   const signInMock = jest.fn();
//   const linkAndSignInMock = jest.fn();
//   const sendVerificationEmailMock = jest.fn();
//   const forgotPwMock = jest.fn();

//   jest.spyOn(useAuthEndpoints, 'default')
//     .mockReturnValue({
//       checkUserExists: checkUserExistsMock,
//       signUp: signUpMock,
//       signIn: signInMock,
//       linkAndSignIn: linkAndSignInMock,
//       sendVerificationEmail: sendVerificationEmailMock,
//       forgotPw: forgotPwMock
//     });

//   return {
//     checkUserExistsMock,
//     signUpMock,
//     signInMock,
//     linkAndSignInMock,
//     sendVerificationEmailMock,
//     forgotPwMock,
//   };
// };
