const SHORTMOVIE_DURATION = 40; // IN MINUTES

const MOVIES_GRID = {
  desktop: {
    width: 1280,
    cards: {
      movieCardCount: 12,
      onLoadAdd: 3,
    },
  },
  tablet: {
    width: 768,
    cards: {
      movieCardCount: 8,
      onLoadAdd: 2,
    },
  },
  mobile: {
    width: 480,
    cards: {
      movieCardCount: 5,
      onLoadAdd: 2,
    },
  },
};

const ERROR_MESSAGE = {
  AUTH_ERROR: 'Неверный пароль или e-mail',
  INTERNAL_SERVER_ERROR: 'Что-то пошло не так...',
  NOT_UNIQUE_EMAIL_VALUE: 'Пользователь с таким Email уже зарегистрирован',
};

export { SHORTMOVIE_DURATION, MOVIES_GRID, ERROR_MESSAGE };