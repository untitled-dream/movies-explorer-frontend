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

  const [isLoad, setIsLoad] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isTooltip, setIsTooltip] = useState({
    isOpen: false,
    state: false,
    messageText: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const headerRoutes = ["/", "/movies", "/saved-movies", "/profile"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  function handleRegister(registrationData) {
    setIsPreloader(true);
    setIsSubmitting(true);
    mainAPI
      .createUser(registrationData)
      .then(() => {
        handleLogin({
          email: registrationData.email,
          password: registrationData.password,
        });
      })
      .catch((err) => {
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: (err === "409"
            ? NOT_UNIQUE_EMAIL_VALUE
            : `Error: ${err} - ${INTERNAL_SERVER_ERROR}`),
        });
      })
      .finally(() => {
        setIsPreloader(false);
        setIsSubmitting(false);
      });
  }

  function handleLogin(authenticationData) {
    setIsPreloader(true);
    setIsSubmitting(true);
    mainAPI
      .login(authenticationData)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem("jwt", jwt.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: (err === "401"
            ? AUTH_ERROR
            : `Error: ${err} - ${INTERNAL_SERVER_ERROR}`),
        });
      })
      .finally(() => {
        setIsPreloader(false);
        setIsSubmitting(false);
      });
  }

  function handleProfile(newUserData) {
    setIsPreloader(true);
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
        console.log(err);
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: (err === "409"
            ? NOT_UNIQUE_EMAIL_VALUE
            : `Error: ${err} - ${INTERNAL_SERVER_ERROR}`),
        });
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function handleSignOut() {
    history.push("/");
    setLoggedIn(false);
    localStorage.clear();
  }

  function handleSaveMovie(movie) {
    mainAPI
      .createSavedMovie(movie)
      .then((newMovie) => setSavedMovies([newMovie, ...savedMovies]))
      .catch((err) => {
        setIsTooltip({
          isOpen: true,
          state: false,
          messageText: `Error: ${err}`,
        });
      });
  }

  function handleUnsaveMovie(movie) {
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
          messageText: `Error: ${err} - ${INTERNAL_SERVER_ERROR}`,
        })
      );
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsPreloader(true);
      mainAPI
        .getCurrentUser()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          handleSignOut();
        })
        .finally(() => {
          setIsPreloader(false);
          setIsLoad(true);
        });
    } else {
      setIsLoad(true);
    }
  }, [history, location.pathname]);

  useEffect(() => {
    if (loggedIn) {
      setIsPreloader(true);
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
        .finally(() => setIsPreloader(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainAPI
        .getSavedMovies()
        .then((res) => {
          const userMovies = res.filter(
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
    setIsBurgerMenu(!isBurgerMenu);
  }

  function onCloseTooltip() {
    setIsTooltip({ ...isTooltip, isOpen: false });
  }

  return (
    <div className="app">
      {!isLoad ? (
        <Preloader isPreloader={isPreloader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path={headerRoutes}>
            <Header
              loggedIn={loggedIn}
              isBurgerMenu={isBurgerMenu}
              onClickBurgerMenu={onClickBurgerMenu}
            />
          </Route>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/signup">
              {!loggedIn ? (
                <Register
                  handleRegister={handleRegister}
                  isSubmitting={isSubmitting}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/signin">
              {!loggedIn ? (
                <Login handleLogin={handleLogin} isSubmitting={isSubmitting} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              setIsTooltip={setIsTooltip}
              onSaveClick={handleSaveMovie}
              setIsPreloader={setIsPreloader}
              onUnsaveClick={handleUnsaveMovie}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              savedMovies={savedMovies}
              setIsTooltip={setIsTooltip}
              onUnsaveClick={handleUnsaveMovie}
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
          <Preloader isPreloader={isPreloader} />
          <Tooltip isTooltip={isTooltip} onCloseTooltip={onCloseTooltip} />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
};

export default App;
