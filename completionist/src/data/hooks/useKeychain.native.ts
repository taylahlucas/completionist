import * as Keychain from 'react-native-keychain';

interface StoreCredentialsProps {
  username: string;
  password: string;
}

// TODO: Add return types
const useKeychain = () => {
  const storeCredentials = async ({ username, password }: StoreCredentialsProps) => {
    try {
      await Keychain.setGenericPassword(username, password);
      console.log('Credentials stored successfully');
    } catch (error) {
      console.error('Error storing credentials:', error);
    }
  };

  const getCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials?.password !== '1') {
        return credentials;
      } else {
        console.log('No credentials found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      return null;
    }
  };

  const deleteCredentials = async () => {
    try {
      await Keychain.resetGenericPassword();
      console.log('Credentials deleted successfully');
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