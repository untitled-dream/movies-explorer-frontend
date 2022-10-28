import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import "./App.css";

import mainAPI from "../../utils/MainAPI.js";

import Header from "../Header/Header";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";

import Preloader from "../Preloader/Preloader";
import Tooltip from "../Tooltip/Tooltip";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const {
  ERROR_MESSAGE: { AUTH_ERROR, INTERNAL_SERVER_ERROR, NOT_UNIQUE_EMAIL_VALUE },
} = require("../../utils/constants");

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoad, setIsLoad] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isTooltip, setIsTooltip] = useState({
    isOpen: false,
    state: false,
    messageText: "",
  });
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  const headerRoutes = ["/", "/movies", "/saved-movies", "/profile"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  function handleRegister(registrationValue) {
    setIsLoader(true);
    mainAPI
      .createUser(registrationValue)
      .then(() => {
        handleLogin({
          email: registrationValue.email,
          password: registrationValue.password,
        });
      })
      .catch((err) =>
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: (err = "409"
            ? NOT_UNIQUE_EMAIL_VALUE
            : `Error: ${err} - ${INTERNAL_SERVER_ERROR}`),
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleLogin(authenticationData) {
    setIsLoader(true);
    mainAPI
      .login(authenticationData)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem("jwt", jwt.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) =>
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: (err = "401"
            ? AUTH_ERROR
            : `Error: ${err} - ${INTERNAL_SERVER_ERROR}`),
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleProfile(newUserData) {
    setIsLoader(true);
    mainAPI
      .updateCurrentUser(newUserData)
      .then((res) => {
        setCurrentUser(res);
        setIsTooltip({
          isOpen: true,
          state: true,
          messageText: "Ваши данные успешно обновлены!",
        });
      })
      .catch((err) => {
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: (err = "409"
            ? NOT_UNIQUE_EMAIL_VALUE
            : `Error: ${err} - ${INTERNAL_SERVER_ERROR}`),
        });
      })
      .finally(() => {
        setIsLoader(false);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  }

  function handleLikeMovie(movie) {
    mainAPI
      .createSavedMovie(movie)
      .then((newMovie) => setSavedMovies([newMovie, ...savedMovies]))
      .catch((err) =>
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: `Error: ${err}`,
        })
      );
  }

  function handleDislikeMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );

    mainAPI
      .removeSavedMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((item) => {
          if (movie.id === item.movieId || movie.movieId === item.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
      })
      .catch((err) =>
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: err,
        })
      );
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLoader(true);
      mainAPI
        .getCurrentUser()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.push(location.pathname);
          }
        })
        .catch((err) =>
          setIsTooltip({
            isOpen: true,
            state: false,
            messageText: `Error: ${err}`,
          })
        )
        .finally(() => {
          setIsLoader(false);
          setIsLoad(true);
        });
    } else {
      setIsLoad(true);
    }
  }, [history, location.pathname]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainAPI
        .getCurrentUser()
        .then((res) => setCurrentUser(res))
        .catch((err) =>
          setIsTooltip({
            isOpen: true,
            state: false,
            messageText: `Error: ${err}`,
          })
        )
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainAPI
        .getSavedMovies()
        .then((data) => {
          const userMovies = data.filter(
            (movie) => movie.owner === currentUser._id
          );
          setSavedMovies(userMovies);
        })
        .catch((err) =>
          setIsTooltip({
            isOpen: true,
            state: false,
            messageText: `Error: ${err}`,
          })
        );
    }
  }, [currentUser, loggedIn]);

  function goBack() {
    history.goBack();
  }

  function onClickBurgerMenu() {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
  }

  function closeTooltip() {
    setIsTooltip({ ...isTooltip, isOpen: false });
  }

  return (
    <div className="app">
      {!isLoad ? (
        <Preloader isOpen={isLoader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path={headerRoutes}>
            <Header
              loggedIn={loggedIn}
              onClickBurgerMenu={onClickBurgerMenu}
              isBurgerMenuOpened={isBurgerMenuOpened}
            />
          </Route>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/signup">
              {!loggedIn ? (
                <Register handleRegister={handleRegister} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/signin">
              {!loggedIn ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              setIsLoader={setIsLoader}
              setIsTooltip={setIsTooltip}
              savedMovies={savedMovies}
              onLikeClick={handleLikeMovie}
              onDislikeClick={handleDislikeMovie}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              onDislikeClick={handleDislikeMovie}
              setIsTooltip={setIsTooltip}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              handleSignOut={handleSignOut}
              handleProfile={handleProfile}
            />
            <Route path="*">
              <NotFound goBack={goBack} />
            </Route>
          </Switch>
          <Route exact path={footerRoutes}>
            <Footer />
          </Route>
          <Preloader isOpen={isLoader} />
          <Tooltip status={isTooltip} onClose={closeTooltip} />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
};

export default App;
