import { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const App = () => {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  const headerRoutes = ["/", "/movies", "/saved-movies", "/profile"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  function goBack() {
    history.goBack();
  }

  function onClickBurgerMenu() {
    setIsBurgerMenuOpened(!isBurgerMenuOpened);
  }

  return (
    <div className="app">
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
            {!loggedIn ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signin">
            {!loggedIn ? <Login /> : <Redirect to="/" />}
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
          />
          <Route path="*">
            <NotFound goBack={goBack} />
          </Route>
        </Switch>
        <Route exact path={footerRoutes}>
          <Footer />
        </Route>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
