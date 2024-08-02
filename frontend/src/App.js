import React, { Component } from "react";
import axios from "axios";
import AboutView from "./customComponents/AboutView";
import HomeView from "./customComponents/HomeView";
import LoginView from "./customComponents/LoginView";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: "home", // Set a default page
      userStatus: {
        logged: false,
        user: {},
      }
    };
  }

  GetView = () => {
    const { CurrentPage, userStatus } = this.state;

    switch (CurrentPage) {
      case "home":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "login":
        return <LoginView QUserFromChild={this.QSetUser} />;
      default:
        return <HomeView />; // Fallback to home if no match is found
    }
  };

  SetView = (page) => {
    this.setState({ CurrentPage: page });
  };

  QSetUser = (user) => {
    this.setState({
      userStatus: {
        logged: true,
        user: user,
      },
    });
    cookies.set("userSession", user, { path: "/" }); // Save the user session in a cookie
    this.SetView("home");
  };

  handleLogin = (credentials) => {
    axios
      .post("http://88.200.63.148:8162/users/login", credentials, { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          this.QSetUser(response.data.user);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
        // Handle error (show toast or alert)
      });
  };

 /* handleLogout = () => {
    axios
      .post("http://88.200.63.148:8162/users/logout", {}, { withCredentials: true })
      .then((response) => {
        this.setState({
          userStatus: { logged: false, user: {} }
        });
        cookies.remove("userSession"); // Remove the session cookie
        console.log("Logged out successfully");
        // Handle success (show toast or alert)
      })
      .catch((error) => {
        console.error("Error during logout:", error.message);
        // Handle error (show toast or alert)
      });
  };*/

  componentDidMount() {
    const userSession = cookies.get("userSession");
    if (userSession) {
      this.setState({
        userStatus: { logged: true, user: userSession }
      });
    }
  }

  render() {
    return (
      <div id="APP" className="container">
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a
              onClick={(e) => {
                e.preventDefault();
                this.SetView("home");
              }}
              className="navbar-brand"
              href="#"
            >
              <img
                src="./assets/logo1.png"
                height="30"
                style={{ marginRight: "0.5em", marginLeft: "0.5em" }}
                alt="Logo"
              />
              MercView
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabIndex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  MercView
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        this.SetView("home");
                      }}
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        this.SetView("about");
                      }}
                      className="nav-link"
                      href="#"
                    >
                      About us
                    </a>
                  </li>
                  {!this.state.userStatus.logged ? (
                    <li className="nav-item">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          this.SetView("login");
                        }}
                        className="nav-link"
                        href="#"
                      >
                        Login
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleLogout();
                        }}
                        className="nav-link"
                        href="#"
                      >
                        Logout
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-5 mt-5">
          {this.GetView()}
        </main>
      </div>
    );
  }
}

export default App;
