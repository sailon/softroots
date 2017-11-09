import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Modal, notification } from "antd";
import Header from "./components/Header.js";

// the different pages that can be rendered
import CreateOrEditChecklist from "./pages/CreateOrEditChecklist.js";
import Home from "./pages/Home.js";
import UserManagement from "./pages/UserManagement.js";
import ViewChecklists from "./pages/ViewChecklists.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";

import firebase from "./configs/firebaseConfig.js";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: undefined
    };
  }

  componentWillMount() {
    let auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("/users/verified/" + user.uid)
          .on("value", snapshot => {
            this.setState({
              ...this.state,
              userInfo: snapshot.val()
            });
          });
      } else {
        this.setState({
          ...this.state,
          userInfo: undefined
        });
      }
    });
  }

  onClickSignOut() {
    Modal.confirm({
      title: "Log Out?",
      onOk: () => this.signOut(),
      onCancel: () => {},
      okText: "Yes",
      cancelText: "No"
    });
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        window.location.href = "/";
      })
      .catch(function(error) {
        // An error happened.
        notification.open({
          message: "ERROR",
          description: "There was a problem logging you out.  Please try again."
        });
      });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div style={{ height: "100%", width: "100%" }}>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Login userInfo={this.state.userInfo} />}
              />
              <Route
                exact
                path="/home"
                component={() => <Home userInfo={this.state.userInfo} />}
              />
              <Route
                exact
                path="/createchecklist"
                component={() => (
                  <CreateOrEditChecklist userInfo={this.state.userInfo} />
                )}
              />
              <Route
                exact
                path="/viewchecklists"
                component={() => (
                  <ViewChecklists userInfo={this.state.userInfo} />
                )}
              />
              <Route
                exact
                path="/users"
                component={() => (
                  <UserManagement userInfo={this.state.userInfo} />
                )}
              />
              <Route
                exact
                path="/profile"
                component={() => <Profile userInfo={this.state.userInfo} />}
              />

              <Route
                render={function() {
                  return <p>Not Found</p>;
                }}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
