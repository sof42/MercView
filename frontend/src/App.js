import React, { Component } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie";
import AboutView from "./customComponents/AboutView";
import HomeView from "./customComponents/HomeView";
import LoginView from "./customComponents/LoginView";
import AdminView from "./customComponents/AdminView";
import ManagerView from "./customComponents/ManagerView";
import SalesView from "./customComponents/SalesView";
import AddRemoveUser from "./customComponents/AddRemoveUser";

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: "home", // Default page
      userStatus: {
        logged: false,
        user: {},
      }
    };
  }

  // Determine which view to render based on the user's role and current page
  GetView = () => {
    const { CurrentPage, userStatus } = this.state;
    const { roleId } = userStatus.user;

    switch (CurrentPage) {
      case "home":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "login":
        return <LoginView QUserFromChild={this.QSetUser} />;
      case "admin":
        return roleId === 1 ? <AdminView user={userStatus.user} handleManageUsers={this.handleManageUsers} /> : <HomeView />;
      case "manager":
        return roleId === 2 ? <ManagerView /> : <HomeView />;
      case "sales":
        return roleId === 3 ? <SalesView /> : <HomeView />;
      case "addRemoveUser":
        return <AddRemoveUser />;
      default:
        return <HomeView />; // Fallback
    }
  };

  SetView = (page) => {
    console.log("Setting view to: " + page);
    this.setState({ CurrentPage: page });
  };

  QSetUser = (user) => {
    this.setState({
      CurrentPage: "home",
      userStatus: {
        logged: true,
        user: user,
      },
    });
    cookies.set("userSession", user, { path: "/" }); // Save the user session in a cookie
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
        toast.error("Login failed!");
      });
  };

  handleLogout = () => {
    axios
      .post(`http://88.200.63.148:8162/users/logout`, {}, { withCredentials: true })
      .then((res) => {
        this.setState({
          CurrentPage: "home",
          userStatus: { logged: false, user: {} }
        });
        cookies.remove("userSession"); // Remove the session cookie
        console.log("Logged out" + res.data.message);
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast.error("Error logging out!");
      });
  };

  handleManageUsers = () => {
    this.SetView("addRemoveUser");
  }

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
                src="/assets/logo1.png"
                height="30"
                style={{ marginRight: "0.5em", marginLeft: "0.5em" }}
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
                    <>
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
                      {this.state.userStatus.user.roleId === 1 && (
                        <li className="nav-item">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              this.SetView("admin");
                            }}
                            className="nav-link"
                            href="#"
                          >
                            Admin Panel
                          </a>
                        </li>
                      )}
                      {this.state.userStatus.user.roleId === 2 && (
                        <li className="nav-item">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              this.SetView("manager");
                            }}
                            className="nav-link"
                            href="#"
                          >
                            Manager Dashboard
                          </a>
                        </li>
                      )}
                      {this.state.userStatus.user.roleId === 3 && (
                        <li className="nav-item">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              this.SetView("sales");
                            }}
                            className="nav-link"
                            href="#"
                          >
                            Sales Dashboard
                          </a>
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-5 mt-5">
          {this.GetView()}
        </main>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
