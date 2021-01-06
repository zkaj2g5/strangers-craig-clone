import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

const SidebarView = () => {
  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload(false);
  };

  return (
    <div className='sidebar'>
      <>
        {' '}
        {localStorage.getItem('token') ? (
          <div className='flexbox-column sidebar-links'>
            <Header as='h4' content='Everything is for Sale!' />
            <Link to='/create'>Post</Link>
            <button className='ui button log-out' onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Header as='h4' content='Everything is for Sale!' />
            <div className='account-link'>
              <Link to='/account'>My Account</Link>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default SidebarView;
