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
import AllUsers from "./customComponents/AllUsers.js";
import EditProfile from "./customComponents/EditProfile.js";
import AllProducts from "./customComponents/AllProducts.js";
import AddRemovePart from "./customComponents/AddRemovePart.js";
import EditPart from "./customComponents/EditPart.js";
import ViewAllModels from "./customComponents/ViewAllModels.js";
import AddRemoveModel from "./customComponents/AddRemoveModel.js";
import {API_URL} from './customComponents/utils/config.js';
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
        return roleId === 1 ? <AdminView
                      user={userStatus.user}
                      handleManageUsers={this.handleManageUsers}
                      showAllUsers={this.showAllUsers}
                      handleEditProfile={this.handleEditProfile} /> : <HomeView />;
      case "manager":
        return roleId === 2 ? <ManagerView
                      user={userStatus.user}
                      handleEditProfile = {this.handleEditProfile}
                      showAllProds = {this.showAllProds}
                      addRemovePart = {this.addRemovePart}
                      editPart={this.editPart}
                      viewAllModels={this.viewAllModels}
                      addRemoveModel={this.addRemoveModel}/> : <HomeView />;
      case "sales":
        return roleId === 3 ? <SalesView
                      user={userStatus.user}
                      handleEditProfile={this.handleEditProfile}/> : <HomeView />;
      case "addRemoveUser":
        return <AddRemoveUser
                      handleBack = {this.handleBack}/>;
      case "allUsers":
        return <AllUsers
                      handleBack = {this.handleBack} />;
      case "editProfile":
        return <EditProfile
                      user={userStatus.user}
                      handleBack = {this.handleBack}/>;
      case "allProds":
        return <AllProducts
                      handleBack = {this.handleBack}/>;
      case "addRemovePart":
        return <AddRemovePart
                      handleBack = {this.handleBack}/>;
      case "editPart":
        return <EditPart
                      handleBack = {this.handleBack}/>;
      case "viewAllModels":
        return <ViewAllModels
                      handleBack = {this.handleBack}/>;
      case "addRemoveModel":
        return <AddRemoveModel
                      handleBack = {this.handleBack}/>;
      default:
        return <HomeView />; // Fallback
    }
  };

  SetView = (page) => {
    this.setState({ CurrentPage: page });
  };

  QSetUser = (user) => {
    let roleId = user.roleId;
    let page = "";
    if(roleId === 1) page = "admin"
    else if(roleId === 2) page = "manager"
    else if(roleId === 3) page = "sales";
    this.setState({
      CurrentPage: page,
      userStatus: {
        logged: true,
        user: user,
      },
    });
    toast.success ("Logged in as " + user.username);
    cookies.set("userSession", user, { path: "/" }); // Save the user session in a cookie
  };

  handleLogin = (credentials) => {
    console.log("Logging in with credentials:", credentials);
    axios
      .post(API_URL + "/users/login", credentials, { withCredentials: true })
      .then((response) => {
        if (response.data.message === 'Login successful') {
          console.log("API Response:", response.data); // Log the API response for debugging
          // Set user state and cookies
          this.QSetUser({
            userId: response.data.userId,
            username: credentials.username,
            roleId: response.data.roleId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
        } else {
          // Show error message
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
        toast.error("Login failed!");
      });
  };
  

  handleLogout = () => {
    axios
      .post(API_URL + `/users/logout`, {}, { withCredentials: true })
      .then((res) => {
        this.setState({
          CurrentPage: "home",
          userStatus: { logged: false, user: {} }
        });
        cookies.remove("userSession"); // Remove the session cookie
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

  editPart = () => {
    this.SetView("editPart");
  }

  addRemovePart = () => {
    this.SetView("addRemovePart");
  }

  viewAllModels = () => {
    this.SetView("viewAllModels");
  }

  addRemoveModel = () => {
    this.SetView("addRemoveModel");
  }

  handleBack = () => {
    const { roleId } = this.state.userStatus.user;
    switch (roleId) {
      case 1:
        this.SetView("admin");
        break;
      case 2:
        this.SetView("manager");
        break;
      case 3:
        this.SetView("sales");
        break;
      default:
        this.SetView("home");
    }
  };

  showAllUsers = () => {
    this.SetView("allUsers");
  }

  handleEditProfile = () => {
    this.SetView("editProfile");
  }

  showAllProds = () => {
    this.SetView("allProds");
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
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
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
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
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
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
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
