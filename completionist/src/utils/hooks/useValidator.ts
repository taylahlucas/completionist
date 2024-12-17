const useValidator = () => {
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPwValid = (pw: string): boolean => {
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return pwRegex.test(pw);
  };

  const isNameValid = (username: string): boolean => {
    return username.length >= 1;
  };

  return {
    isEmailValid,
    isPwValid,
    isNameValid,
  };
};

export default useValidator;
