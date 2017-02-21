'use strict';

import React from 'react';
import { Link } from 'react-router';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <div className="ui three item menu">

          <Link to="/" className="item">
            Home
          </Link>

          <Link to="login" className="item">
            Sign in
          </Link>

          <Link to="register" className="item">
            Sign up
          </Link>

      </div>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <div className="ui four item menu">
          <Link to="" className="item">
            <i className="ion-home"></i>
          </Link>

          <Link to="editor" className="item">
            <i className="ion-compose"></i>&nbsp;Create
          </Link>

          <Link to="settings" className="item">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>

          <Link
            to={`@${props.currentUser.username}`}
            className="item">
            <img src={props.currentUser.image} className="ui avatar image" />
            {props.currentUser.username}
          </Link>
      </div>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="">

          <Link to="/" className="navbar-branded">
            {this.props.appName.toLowerCase()}
          </Link>

          <button className="ui circular facebook icon button right floated">
            <i className="facebook icon"></i>
          </button>
          <button className="ui circular twitter icon button right floated">
            <i className="twitter icon"></i>
          </button>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
