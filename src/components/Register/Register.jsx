import { Link } from "react-router-dom";

import "./Register.css";

import Logo from "../Logo/Logo";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";
import FormSupport from "../FormSupport/FormSupport";

import { useFormValidation } from "../../hooks/useFormValidation";

const Register = ({ isSubmitting, handleRegister }) => {
  const { inputValue, errorText, isValid, handleChange } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(inputValue);
  }

  return (
    <main className="register">
      <form
        className="register__form"
        name="register"
        noValidate
        onSubmit={handleSubmit}
      >
        <Link to="/" className="register__link">
          <Logo />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <fieldset className="register__field-wrapper ">
          <label className="register__field">
            <span className="register__field-label">Имя</span>
            <input
              className={`register__input ${
                errorText.name && "register__input_error"
              }`}
              type="text"
              name="name"
              id="name"
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              value={inputValue.name || ""}
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              autoComplete="off"
              required
              disabled={isSubmitting}
            />
            <span className="register__error">{errorText.name || ""}</span>
          </label>
          <label className="register__field">
            <span className="register__field-label">E-mail</span>
            <input
              className={`register__input ${
                errorText.email && "register__input_error"
              }`}
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={inputValue.email || ""}
              autoComplete="off"
              required
              disabled={isSubmitting}
            />
            <span className="register__error">{errorText.email || ""}</span>
          </label>
          <label className="register__field">
            <span className="register__field-label">Пароль</span>
            <input
              className={`register__input ${
                errorText.password && "register__input_error"
              }`}
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={inputValue.password || ""}
              autoComplete="off"
              required
              disabled={isSubmitting}
            />
            <span className="register__error">{errorText.password || ""}</span>
          </label>
        </fieldset>
        <FormSubmitButton
          buttonText={"Зарегистрироваться"}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
        <FormSupport
          supportText="Уже зарегистрированы?"
          route="/signin"
          routeText="Войти"
        />
      </form>
    </main>
  );
};

export default Register;