import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import ImportData from "./components/import-data.component";
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";
import OneA from "./components/onea.component"
import TwoA from "./components/twoa.component"

import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import OneB from "./components/oneb.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
    window.location.reload();
  }

  render() {
    const { currentUser } = this.state;

    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand myTestClass">
              AzureAcrobats
            </Link>
            <div className="navbar-nav mr-auto">
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/onea"} className="nav-link">
                    Question 1A/Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/oneb"} className="nav-link">
                    Question 1B
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/twoa"} className="nav-link">
                    Question 2A
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/import"} className="nav-link">
                    Import Data
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" onClick={this.logOut}>
                    Log Out
                  </Link>
                </li>
              </div>
            ) : (
              <div>
                
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={"/", "/login"} component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/import" component={ImportData} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/onea" component={OneA} />
              <Route exact path="/oneb" component={OneB} />
              <Route exact path="/twoa" component={TwoA} />
            </Switch>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { household } = state.household;
  const { onea } = state.onea;
  const { category } = state.category;
  const { hshd } = state.hshd;
  const { twoa } = state.twoa;
  const { upload } = state.upload;
  return {
    user,
    household,
    onea,
    category,
    hshd,
    twoa,
    upload
  };
}

export default connect(mapStateToProps)(App);