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
            <i className="ion-home header"></i>
          </Link>

          <Link to="editor" className="item">
            <i className="ion-compose header"></i>
          </Link>

          <Link to="settings" className="item">
            <i className="ion-gear-a header"></i>
          </Link>

          <Link
            to={`@${props.currentUser.username}`}
            className="item">
            <img src={props.currentUser.image} className="ui avatar image" />
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
        <div className="social-links-header">

          <Link to="/" className="navbar-branded">
            {this.props.appName}
          </Link>

          <button className="ui circular instagram icon button right floated">
            <i className="instagram icon"></i>
          </button>
          <button className="ui circular youtube icon button right floated">
            <i className="youtube icon"></i>
          </button>
          <button className="ui circular facebook icon button right floated">
            <i className="facebook icon"></i>
          </button>
          <button className="ui circular twitter icon button right floated">
            <i className="twitter icon"></i>
          </button>
        </div>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
      </nav>
    );
  }
}

export default Header;
