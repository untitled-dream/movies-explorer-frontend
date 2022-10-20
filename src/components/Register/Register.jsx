import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Register.css";

import Logo from "../Logo/Logo";
import PasswordDisplay from "../PasswordDisplay/PasswordDisplay";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";
import FormSupport from "../FormSupport/FormSupport";

import { useFormValidation } from "../../hooks/useFormValidation";

const Register = ({ isPasswordDisplay, onPasswordDisplay }) => {
  const { inputValue, errorText, isValid, handleChange, resetForm } =
    useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
            />
            <span className="register__error">{errorText.email || ""}</span>
          </label>
          <label className="register__field">
            <span className="register__field-label">Пароль</span>
            <input
              className={`register__input ${
                errorText.password && "register__input_error"
              }`}
              type={isPasswordDisplay ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              value={inputValue.password || ""}
              autoComplete="off"
              required
            />
            <PasswordDisplay
              isDisplay={isPasswordDisplay}
              onDisplay={onPasswordDisplay}
            />
            <span className="register__error">{errorText.password || ""}</span>
          </label>
        </fieldset>
        <FormSubmitButton buttonText={"Зарегистрироваться"} isValid={isValid} />
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