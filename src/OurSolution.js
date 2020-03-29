import React from 'react';
import './OurSolution.css';
import solutionArrows from './images/pages/solution_arrows.jpg'
import ComponentHeader from './ComponentHeader';
import ScrollAnimation from 'react-animate-on-scroll';


export default function OurSolution() {
    return (
        <div className="OurSolution-comp">
            <ScrollAnimation animateIn="fadeIn">
                <ComponentHeader contentText="PainPad is the Solution" />
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <h1>PainPad is a “Hello World” of a business!</h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <p>In other words, PainPad is platform where problem miners can share a ‘headache’ (that can’t be solved on their own),
                and where the problem will be exposed to a crowd full of entrepreneurs looking for real problems worth solving!</p>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <h2>Benefits you get if you are:</h2>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <img src={solutionArrows} className="solution-arrows" />
            </ScrollAnimation>
            <div className="benefits">
                <div className="vant-garde">
                    <ScrollAnimation animateIn="fadeIn">
                        <h3>Problem Miner (Avant-garde)</h3>
                    </ScrollAnimation>
                    <ul>
                        <ScrollAnimation animateIn="fadeIn">
                            <li>Solution to your problem in a long term</li>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeIn">
                            <li>Opportunity to be part of future unicorn start-up</li>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeIn">
                            <li>Rewards through “partner program” in a short term</li>
                        </ScrollAnimation>
                    </ul>
                </div>
                <ScrollAnimation animateIn="fadeIn">
                    <div className="or-div">OR</div>
                </ScrollAnimation>
                <div className="inventor">
                    <ScrollAnimation animateIn="fadeIn">
                        <h3>Entrepreneur (Inventor)</h3>
                    </ScrollAnimation>
                    <ul>
                        <ScrollAnimation animateIn="fadeIn">
                            <li>Access to pool of real and existing ‘pains’ (problems)</li>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeIn">
                            <li>Crowdsourced problem validation</li>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeIn">
                            <li>Continuous customer validation for product</li>
                        </ScrollAnimation>
                    </ul>
                </div>
            </div>
        </div>
    );
}