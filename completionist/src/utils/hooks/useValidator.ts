const useValidator = () => {
	const isEmailValid = (email: string): boolean => {
		const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	
	const isPasswordValid = (pw: string): boolean => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		return passwordRegex.test(pw);
	}
	
	const isNameValid = (name: string): boolean => {
		return name.length >= 2;
	}

	return {
		isEmailValid,
		isPasswordValid,
		isNameValid
	}
};

export default useValidator;