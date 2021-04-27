import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ShippingDetails from '../../components/ShippingDetails/ShippingDetails';
import { fetchContactDetails } from '../../store/actions/user';

import './ProfilePage.scss';

class ProfilePage extends Component {
  componentDidMount() {
    const { contactDetails, fetchContactDetails, userId } = this.props;
    //loading only when contactDetails are empty
    if (contactDetails === null) {
      fetchContactDetails(userId);
    }
  }

  render() {
    const {
      user: { username, email, createdAt },
      orderHistory,
    } = this.props;

    return (
      <div className='ProfilePage'>
        <div className='ProfilePage__contactDetails'>
          <h3>Your Contact Details</h3>
          <ShippingDetails content='Save Changes' />
        </div>
        <div className='ProfilePage__account'>
          <h3>Your Account</h3>
          <div className='ProfilePage__account-details'>
            <div>
              <span>Your username: </span>
              <span>{username !== null ? username : ''}</span>
            </div>
            <div>
              <span>Your email: </span>
              <span>{email !== null ? email : ''}</span>
            </div>
            <div>
              <span>Number of Purchases:</span>
              <span>{orderHistory.length > 0 ? orderHistory.length : ''}</span>
            </div>
            <div>
              <span>Last Purchase:</span>
              <span>
                {orderHistory.length > 0
                  ? moment(orderHistory[0].createdAt).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )
                  : ''}
              </span>
            </div>
            <div>
              <span>Member since:</span>
              <span>
                {createdAt !== null
                  ? moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')
                  : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, orderHistory }) => ({
  contactDetails: user?.contactDetails,
  userId: user.currentUser?.userDbId,
  user: user.currentUser,
  orderHistory: orderHistory?.orderHistory,
});

export default connect(mapStateToProps, { fetchContactDetails })(ProfilePage);
