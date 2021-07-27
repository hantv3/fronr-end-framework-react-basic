import React, { useState, useEffect } from "react";
import { NavLink, Redirect, useHistory, useLocation } from "react-router-dom";
import { isAuthenticated } from "auth";
import { signOut } from "../../auth";

const Header = () => {
  // Dùng để quay trở lại trang mong m
  const History = useHistory;
  // dùng để set đường dẫn
  const { pathName } = useLocation;
  // Sate dùng để gán và thay đổi giá trị của use khi login, mặt định isLogged sẽ là False(chưa đăng nhập)
  const [isLogged, setIsLogged] = useState(false);
  // const { user: { email, id } } = isAuthenticated();
  useEffect(() => {
    isAuthenticated() && setIsLogged(true);
  }, [pathName, isLogged]);
  //  checklogin để render lại menu
  const checklogin = () => {
    if (pathName !== "/signin" && isLogged) {
      return (
        <>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <a
            onClick={() => {
              signOut(() => {
                history.push("/");
                setIsLogged(false);
              });
            }}
          >
            Sign Out
          </a>
        </>
      );
    } else if (pathName === "/signIn" && isLogged) {
      <Redirect to="/" />;
    } else {
      return (
        <>
          <NavLink to="/signIn">Sign In</NavLink>
          <NavLink to="/signUp">Sign Up</NavLink>
        </>
      );
    }
  };
  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <svg
              className="bi me-2"
              width={40}
              height={32}
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Inventory
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Products
              </a>
            </li>
          </ul>
          {checkLogin()}
        </div>
      </div>
    </header>
  );
};

export default Header;
