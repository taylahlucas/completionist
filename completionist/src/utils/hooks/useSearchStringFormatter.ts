const useSearchStringFormatter = () => {
  const getFormattedSearchString = (value: string) => {
    return value.toLocaleLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  };
  
  return getFormattedSearchString;
};

export default useSearchStringFormatter;