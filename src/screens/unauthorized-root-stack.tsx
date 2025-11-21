// export const UnAuthorizedRootStack = () => {
//   const { user } = useAuthState();
//   const navigation = useReactNavigation();

//   useEffect(() => {
//     if (!navigation) return;

//     if (!user?.signup.verification) {
//       navigation.navigate(UnAuthorizedScreenEnum.VerifyAccount);
//     } else if (!user?.signup.setUsername) {
//       navigation.navigate(UnAuthorizedScreenEnum.SetUsername);
//     } else if (!user?.signup.selectGame) {
//       navigation.navigate(UnAuthorizedScreenEnum.SelectFirstGame);
//     }
//   }, [navigation, user]);

//   return <Login />;
// };

// export const UnAuthorizedRootStack = () => {
//   const { user } = useAuthState();

//   if (!user?.signup) {
//     return <Login />;
//   }

//   if (!user.signup.verification) {
//     return <VerifyAccount />;
//   }

//   if (!user.signup.setUsername) {
//     return <SetUsername />;
//   }

//   if (!user.signup.selectGame) {
//     return <SelectFirstGame />;
//   }

//   return <Login />;
// };
