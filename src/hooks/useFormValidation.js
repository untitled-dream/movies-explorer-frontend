import { useState, useCallback } from "react";
import isEmail from "validator/lib/isemail";

export function useFormValidation() {

  const [inputValue, setInputValue] = useState({});
  const [errorText, setErrorText] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!isEmail(value)) {
        target.setCustomValidity('Некорректый адрес почты');
      } else {
        target.setCustomValidity('');
      }
    }

    setInputValue({ ...inputValue, [name]: value });
    setErrorText({ ...errorText, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newInputValue = {}, newErrorText = {}, newIsValid = false) => {
      setInputValue(newInputValue);
      setErrorText(newErrorText);
      setIsValid(newIsValid);
    },
    [setInputValue, setErrorText, setIsValid]
  )

  return {
    inputValue,
    errorText,
    isValid,
    handleChange,
    resetForm
  };
}