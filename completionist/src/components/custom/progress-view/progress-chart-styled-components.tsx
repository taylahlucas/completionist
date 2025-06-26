import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  label: {
		position: 'absolute',
		paddingLeft: 8
  },
	percentage: {
		position: 'absolute',
		right: 8
	},
  progressBar: {
    width: '100%',
		height: 25,
    borderRadius: 5,
		marginBottom: 8,
    overflow: 'hidden',
		justifyContent: 'center'
  },
  progress: {
    height: '100%',
  },
});