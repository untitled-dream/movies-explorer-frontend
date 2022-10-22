import './FormSubmitButton.css';

const FormSubmitButton = ({ isValid, buttonText }) => {
  return (
    <button
      type="submit"
      className={`submit-button ${!isValid && "submit-button_disabled"}`}
      disabled={!isValid}
    >
      {buttonText}
    </button>
  );
};

export default FormSubmitButton