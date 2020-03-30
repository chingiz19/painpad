import React from 'react';
import './Header.css';
import logo_transperent from './images/logos/logo_transparent.png'

export default function Header() {
  return (
    <div className='header'>
        <img src={logo_transperent} className='header_logo' alt='header logo'/>
    </div>
  );
}