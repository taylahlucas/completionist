const useGetLocationString = ({ hold = '', location = '' }): string => {
  let locationString = ''
  if (hold?.length === 0) {
    locationString = location?.toLocaleUpperCase();
  }
  else if (location?.length === 0) {
    locationString = hold?.toLocaleUpperCase();
  }
  else {
    locationString = `${location?.toLocaleUpperCase() ?? ''} - ${hold?.toLocaleUpperCase() ?? ''}`
  }
  return locationString;
};

export default useGetLocationString;