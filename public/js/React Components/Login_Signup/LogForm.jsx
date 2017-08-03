import React, { PropTypes } from 'react';
import { Card, CardText, MuiThemeProvider, LinearProgress } from 'material-ui';
import Script from 'react-load-script';

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
    };
    this.Login = this.Login.bind(this);
  }

  Login() {
    if (this.state.submitted === false) {
      this.setState({
        submitted: true,
      });
      this.props.handler(this);
    }
  }

  Signout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Script
            url="https://apis.google.com/js/platform.js"
          />
          <Card>
            <CardText>
              <h1 style={{ textAlign: 'center' }}>{this.props.type}</h1>
              <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark" />
              <button href="#" onClick={this.Signout}>Sign out</button>
              <LinearProgress mode="indeterminate" style={(this.state.submitted === true) ? { display: 'block' } : { display: 'none' }} />
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

Signin.defaultProps = {
  type: 'Error',
  handler: (() => { }),
};
Signin.propTypes = {
  type: PropTypes.string,
  handler: PropTypes.func,
};

export default Signin;
