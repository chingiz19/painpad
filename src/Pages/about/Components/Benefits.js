import React from 'react';
import '../About.css';
import Fade from 'react-reveal/Fade';
import Arrow from '../../../images/pages/solution_arrows.jpg';

export default function Benefits() {

    return (
        <div className="sec-TS">
            <Fade delay={2000}>
                <h3>Benefits you get if you are:</h3>
            </Fade>
            <Fade delay={1000}>
                <img src={Arrow} alt='arrow' className="arrow" />
            </Fade>
            <Fade delay={1000}>
                <h3 className="h3-pp">Problem Poster</h3>
            </Fade>
            <Fade delay={1000} cascade={true}>
                <ul className="ul-pp">
                    <li className="li-1">
                        <i className="fas fa-award"></i>
                        <div>Potential earnings provided by PainPad for active posts</div>
                    </li>
                    <li className="li-2">
                        <i className="far fa-handshake"></i>
                        <div>Opportunity to be part of future unicorn start-up</div>
                    </li>
                    <li className="li-3">
                        <i className="far fa-laugh-beam"></i>
                        <div>Solution to your problem in the long term</div>
                    </li>
                </ul>
            </Fade>
            <Fade delay={1000}>
                <img src={Arrow} alt='arrow' className="arrow" />
            </Fade>
            <Fade delay={1000}>
                <h3 className="h3-e">Entrepreneur</h3>
            </Fade>
            <Fade delay={1000} cascade={true}>
                <ul className="ul-e">
                    <li className="li-1">
                        <i className="fas fa-users"></i>
                        <div>Access to pool of real and existing ‘pains’ (problems)</div>
                    </li>
                    <li className="li-2">
                        <i className="far fa-thumbs-up"></i>
                        <div>Crowdsourced problem validation</div>
                    </li>
                    <li className="li-3">
                        <i className="fas fa-comment-medical"></i>
                        <div>Continuous customer validation for product</div>
                    </li>
                </ul>
            </Fade>
        </div>
    );
}