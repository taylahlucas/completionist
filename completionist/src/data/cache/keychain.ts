import * as Keychain from 'react-native-keychain';

interface StoreCredentialsProps {
  username: string;
  password: string;
}

export const storeCredentials = async ({
  username,
  password,
}: StoreCredentialsProps): Promise<void> => {
  if (!!username && !!password) {
    try {
      await Keychain.setGenericPassword(
        username,
        password.replace(' ', ''),
        {},
      );
    } catch (error) {
      console.error('Error storing credentials:', error);
    }
  }
};

export const getCredentials =
  async (): Promise<Keychain.UserCredentials | null> => {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials && credentials?.password !== '1' ? credentials : null;
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      return null;
    }
  };

export const deleteCredentials = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Error deleting credentials:', error);
  }
};
