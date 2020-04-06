import React from 'react';
import './HeaderWeb.css';
import LogoTransperent from '../images/logos/logo_transparent.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';

export default function HeaderWeb() {
    return (
        <>
            <div className="header-div">
                <img src={LogoTransperent} className="header-logo"/>
                <ul>
                    <li>
                        <div>Sign in / Sign up</div>
                    </li>
                    <li>
                        <div>
                            <Link to="/about">About</Link>
                        </div>                      
                    </li>
                </ul>
            </div>
        </>
    );
}