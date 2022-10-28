import "./Profile.css";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../hooks/useFormValidation";

const Profile = ({ handleSignOut, handleProfile }) => {
  const { inputValue, handleChange, resetForm, errorText, isValid } =
    useFormValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleProfile(inputValue);
  }

  useEffect(() => {
      resetForm(currentUser, {}, true);
  }, [currentUser, resetForm]);

  const requirementValidation =
    !isValid ||
    (currentUser.name === inputValue.name &&
      currentUser.email === inputValue.email);

  return (
    <main className="profile">
      <form
        className="profile__form"
        name="profile"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="profile__heading">{`Привет, ${
          currentUser.name.replace(/\s/g, "\u00A0") || ""
        }!`}</h1>
        <fieldset className="profile__input-wrapper">
          <label className="profile__field">
            <span className="profile__field-label">Имя</span>
            <input
              className={`profile__input ${
                errorText.name && "profile__input_type_error"
              }`}
              name="name"
              id="name"
              onChange={handleChange}
              type="text"
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              value={inputValue.name || ""}
              autoComplete="off"
              required
            />
            <span className="profile__error_type_name">
              {errorText.name || ""}
            </span>
          </label>
          <label className="profile__field">
            <span className="profile__field-label">E-mail</span>
            <input
              className={`profile__input ${
                errorText.email && "profile__input_type_error"
              }`}
              onChange={handleChange}
              name="email"
              id="email"
              type="email"
              value={inputValue.email || ""}
              autoComplete="off"
              required
            />
            <span className="profile__error_type_email">
              {errorText.email || ""}
            </span>
          </label>
        </fieldset>
        <div className="profile__button-wrapper">
          <button
            type="submit"
            className={`profile__button profile__button_type_edit ${
              requirementValidation ? "profile__button_state_disabled" : ""
            }`}
            disabled={requirementValidation ? true : false}
          >
            Редактировать
          </button>
          <button
            type="submit"
            className="profile__button profile__button_type_exit"
            onClick={handleSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
};

export default Profile;
