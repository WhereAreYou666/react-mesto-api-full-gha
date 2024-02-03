import React from "react";
import { Link, useLocation } from 'react-router-dom';

function Header(props) {

  const currLocation = useLocation();
  let headerUserLink;

  if (currLocation.pathname === '/sign-in') {
    headerUserLink = <Link to="/sign-up" className="header__link">Регистрация</Link>
  }

  if (currLocation.pathname === '/sign-up') {
    headerUserLink = <Link to="/sign-in" className="header__link">Войти</Link>
  }

  if (currLocation.pathname === '/') {
    headerUserLink = <div className="header__user-container">
      <p className="header__user-email">{props.email}</p>
      <Link to="/sign-in" className="header__link" onClick={props.signOut}>Выйти</Link>
    </div>
  }

  return (
    <header className="header">
      <div className="header__logo" />
      {headerUserLink}
    </header>
  );
}

export default Header;