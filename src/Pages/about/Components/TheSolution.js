import React from 'react';
import '../About.css';
import Tada from 'react-reveal/HeadShake';
import Fade from 'react-reveal/Fade';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';

import Arrow from '../../../images/pages/solution_arrows.jpg';

export default function TheSolution() {
    return (
        // TS - TS
        <div className="sec-TS">
            <Fade delay={1200}>
                <Tada count={3} delay={800}>
                    <h1>PainPad - “Hello World” of a business!</h1>
                </Tada>
            </Fade>
            <Fade delay={2000}>
                <p>
                    In other words, PainPad is a platform where people share <span className="str">daily experiences</span> that
                    drive them crazy or inject inefficiency or needless complication into their <span className="str">everyday
                    lives</span> that can’t be solved on their own. Consequently, problems will be exposed to a
                    crowd full of entrepreneurs looking for real problems worth solving!
                </p>
            </Fade>
            <Fade delay={2000}>
                <h3>Benefits you get if you are:</h3>
            </Fade>
            <Fade delay={1000}>
                <img src={Arrow} alt='arrow' className="arrow" />
            </Fade>
            <Fade delay={1000}>
                <h3 className="h3-pp">Problem poster</h3>
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
                        <div>Solution to your problem in a long term</div>
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
            <Fade delay={1000} cascade={true}>
                <div className="div-lottie">
                    <DynamicIcon type="networkIcon" width='200' height='200' />
                    <h2>Share Your 'Pain'</h2>
                    <p><a href="/">Tell</a> the serrounding a problem that can't be solved on your own.</p>
                </div>
            </Fade>
        </div>
    );
}