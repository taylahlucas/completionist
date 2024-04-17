import React from 'react';
import VerificationEntryItem from './VerificationEntryItem.native';

interface VerificationEntryProps {
	tokenLength: number;
};

const VerificationEntry = ({ tokenLength }: VerificationEntryProps) => {
	const generateVerificationItems = () => {
		for (let i = 0; i < tokenLength; i++) {
			return <VerificationEntryItem />
		}
	}
	return (
		<>
			{generateVerificationItems()}
		</>
	);
};

export default VerificationEntry;