interface FormatterReturnType {
  capitalize: (str: string) => string;
  getFormattedSearchString: (value: string) => string;
}

const useFormatter = (): FormatterReturnType => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getFormattedSearchString = (value: string) => {
    return value.toLocaleLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  };

  return { capitalize, getFormattedSearchString };
};

export default useFormatter;