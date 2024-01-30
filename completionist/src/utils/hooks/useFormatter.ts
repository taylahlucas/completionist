const useFormatter = () => {
  const getFormattedSearchString = (value: string) => {
    return value.toLocaleLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const convertToTranslationKey = (value: string) => {
    let splitValue = value.split(/\s+|-/);

    if (splitValue.length > 1) {
      splitValue = splitValue.map((item, index) => index === 0 ? item.toLocaleLowerCase() : capitalize(item));
      return splitValue.join().replaceAll(",", '');
    }
    return splitValue[0].toLocaleLowerCase();
  };
  
  return { getFormattedSearchString, convertToTranslationKey };
};

export default useFormatter;