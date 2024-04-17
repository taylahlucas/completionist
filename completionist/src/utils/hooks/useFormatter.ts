interface FormatterReturnType {
  capitalize: (str: string) => string;
  getFormattedSearchString: (value: string) => string;
}

const useFormatter = (): FormatterReturnType => {
  const capitalize = (str: string) => {
		const words = str.split(' ');
		
		const capitalizedWords = words.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		});
    return capitalizedWords.join(' ');
  };

  const getFormattedSearchString = (value: string) => {
    return value.toLocaleLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  };

  return { capitalize, getFormattedSearchString };
};

export default useFormatter;