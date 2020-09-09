import React from 'react';
import '../About.css';

import LogoTransperent from '../../../images/logos/logo_transparent.png';

export default function AboutHeader() {

    return (
        <div className="main-header about">
            <img src={LogoTransperent} className="header-logo" alt="Transperent Logo" />
        </div>
    );
}