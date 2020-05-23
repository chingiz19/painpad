import React from 'react';
import '../About.css';

import LogoTransperent from '../../../images/logos/logo_transparent.png';

export default function AboutHeader() {

    return (
        <div className="div-header">
            <img src={LogoTransperent} alt="header logo"/>
        </div>
    );
}