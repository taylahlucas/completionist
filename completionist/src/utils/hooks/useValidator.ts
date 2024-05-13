const useValidator = () => {
	const isEmailValid = (email: string): boolean => {
		const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	
	const isPwValid = (pw: string): boolean => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		return passwordRegex.test(pw);
	}
	
	const isNameValid = (name: string): boolean => {
		return name.length >= 1;
	}

	return {
		isEmailValid,
		isPwValid,
		isNameValid
	}
};

export default useValidator;