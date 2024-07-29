import { Component } from "react";
import AboutView from "./customComponents/AboutView";
import HomeView from "./customComponents/HomeView";
import LoginView from "./customComponents/LoginView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: "home", // Set a default page
    };
  }

  GetView = () => {
    const { CurrentPage } = this.state;

    switch (CurrentPage) {
      case "home":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "login":
        return <LoginView />;
      default:
        return <HomeView />; // Fallback to home if no match is found
    }
  };

  SetView = (page) => {
    this.setState({ CurrentPage: page });
  };

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
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-5 mt-5">{this.GetView()}</main>
      </div>
    );
  }
}

export default App;
