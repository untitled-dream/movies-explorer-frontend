import './FormSubmitButton.css';

const FormSubmitButton = ({ isValid, buttonText, isSubmitting }) => {
  return (
    <button
      type="submit"
      className={`submit-button ${(!isValid || isSubmitting) && "submit-button_disabled"}`}
      disabled={!isValid || isSubmitting}
    >
      {buttonText}
    </button>
  );
};

export default FormSubmitButton