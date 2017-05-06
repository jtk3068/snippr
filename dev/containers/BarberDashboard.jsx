import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BarberChat from './BarberChat';
import Header from '../components/PageElements/Header';
import BarberSideBar from '../components/PageElements/BarberSideBar';
import Footer from '../components/PageElements/Footer';

class BarberDashboard extends Component {
  constructor(props) {
    super(props);

    console.log('profile', props.profile);
    this.state = {
      name: `${this.props.profile.fname}${this.props.profile.lname}`,
      displayBarberChat: 'hidden',
    };

    this.handleChatToggle = this.handleChatToggle.bind(this);
  }

  handleChatToggle() {
    if (this.state.displayBarberChat === '') {
      this.setState({
        displayBarberChat: 'hidden',
      });
    } else if (this.state.displayBarberChat === 'hidden') {
      this.setState({
        displayBarberChat: '',
      });
    }
  }

  render() {
    return (
      <div className="profile">
        <Header />
        <div className="profile-box">
          <BarberSideBar logout={this.props.logout} />

          <div className="profile-body">
            <h1>{this.state.name}</h1>
            <p>some address</p>
            <img
              onClick={this.handleChatToggle}
              alt="chat-svg" className="chat-svg"
              src="/public/assets/speech-bubble.svg"
            />
            <BarberChat className={this.state.displayBarberChat} name={this.state.name} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

BarberDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  profile: PropTypes.string.isRequired,
};

export default BarberDashboard;
