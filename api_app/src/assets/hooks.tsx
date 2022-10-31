import { useState } from "react";

export const useForm = (callback:any, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const onChange = (event:any) => {
		setValues({ ...values, [event.target.name]: event.target.value });
		console.log(values);
	};

	const onSubmit = (event:any) => {
		event.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
