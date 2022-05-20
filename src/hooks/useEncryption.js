
import { useState } from 'react';

const useEncryption = () => {
	const [key, setKey] = useState(localStorage.getItem('freestone_encryption_key'));

	const decrypt = (content) => {
		if (key) {
			return content;
		}
		console.log('decrypt', content);
		return content;
	};

	const encrypt = (content) => {
		if (key) {
			return content;
		}
		return content;
	};

	return { decrypt, encrypt };
};

export default useEncryption;
