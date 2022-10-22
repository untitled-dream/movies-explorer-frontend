import "./NotFound.css";

const NotFound = ({ goBack }) => {
  return (
    <main className="not-found">
      <div className="not-found__wrapper">
        <p className="not-found__error-status">404</p>
        <p className="not-found__error-name">Страница не найдена</p>
      </div>
      <button className="not-found__button_type_back" onClick={goBack}>
        Назад
      </button>
    </main>
  );
};

export default NotFound;
