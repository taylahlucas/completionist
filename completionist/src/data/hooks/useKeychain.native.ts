import * as Keychain from 'react-native-keychain';

interface StoreCredentialsProps {
  username: string;
  password: string;
}

interface KeychainReturnTypes {
  storeCredentials: ({ username, password}: StoreCredentialsProps) => void;
  getCredentials: () => Promise<Keychain.UserCredentials | null>;
  deleteCredentials: () => Promise<void>
}

const useKeychain = (): KeychainReturnTypes => {
  const storeCredentials = async ({ username, password }: StoreCredentialsProps): Promise<void> => {
    if (!!username && !!password) {
      try {
        await Keychain.setGenericPassword(username, password, {});
      } catch (error) {
        console.error('Error storing credentials:', error);
      }
    }
  };

  const getCredentials = async (): Promise<Keychain.UserCredentials | null> => {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials && credentials?.password !== '1' ? credentials : null;
    } 
	catch (error) {
      console.error('Error retrieving credentials:', error);
      return null;
    }
  };

  const deleteCredentials = async (): Promise<void> => {
    try {
      await Keychain.resetGenericPassword();
			console.log("deleteCredentials")
    } catch (error) {
      console.error('Error deleting credentials:', error);
    }
  };

  return {
    storeCredentials,
    getCredentials,
    deleteCredentials
  }
};

export default useKeychain;