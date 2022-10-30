import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import Logo from "../Logo/Logo";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";
import FormSupport from "../FormSupport/FormSupport";

import { useFormValidation } from "../../hooks/useFormValidation";

const Login = ({ isSubmitting, handleLogin }) => {
  const { inputValue, errorText, isValid, handleChange, resetForm } =
    useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(inputValue);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="login">
      <form
        className="login__form"
        name="login"
        noValidate
        onSubmit={handleSubmit}
      >
        <Link to="/" className="login__link">
          <Logo />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <fieldset className="login__input-wrapper">
          <label className="login__field">
            <span className="login__field-label">E-mail</span>
            <input
              className={`login__input ${
                errorText.email && "login__input_error"
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
            <span className="login__error">{errorText.email || ""}</span>
          </label>
          <label className="login__field">
            <span className="login__field-label">Пароль</span>
            <input
              className={`login__input ${
                errorText.password && "login__input_error"
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
            <span className="login__error">{errorText.password || ""}</span>
          </label>
        </fieldset>
        <FormSubmitButton
          isValid={isValid}
          buttonText={"Войти"}
          isSubmitting={isSubmitting}
        />
        <FormSupport
          supportText="Ещё не зарегистрированы?"
          route="/signup"
          routeText="Регистрация"
        />
      </form>
    </main>
  );
};

export default Login;
