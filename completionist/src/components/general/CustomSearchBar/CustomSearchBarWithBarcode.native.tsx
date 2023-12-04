import { View } from 'react-native';
import CustomSearchBar, { CustomSearchBarProps } from './CustomSearchBar.native';
import { styles } from './CustomSearchBarStyles.native';

const CustomSearchBarWithBarcode = ({ placeholder }: CustomSearchBarProps) => {
  return (
    <View style={styles.searchContainerWithBarcode}>
      <CustomSearchBar placeholder={placeholder} />
    </View>
  );
};

export default CustomSearchBarWithBarcode;