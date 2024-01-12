const useGetLocationString = ({ hold = '', location = '' }): string => {
  let locationString = ''
  if (hold?.length === 0) {
    locationString = location
  }
  else if (location?.length === 0) {
    locationString = hold;
  }
  else {
    locationString = `${location ?? ''} - ${hold ?? ''}`
  }
  return locationString;
};

export default useGetLocationString;