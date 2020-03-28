import React from 'react';
import './OurSolution.css';
import solutionArrows from './images/pages/solution_arrows.jpg'
import ComponentHeader from './ComponentHeader';


export default function OurSolution() {
    return (
        <div className="OurSolution-comp">
            <ComponentHeader contentText="Solution to Our Own Problem"/>
            <h1>PainPad is a “Hello World” of a business!</h1>
            <p>In other words, PainPad is platform where problem miners can share a ‘headache’ (that can’t be solved on their own), 
                and where the problem will be exposed to a crowd full of entrepreneurs looking for real problems worth solving!</p>
            <h2>Benefits you get if you are:</h2>
            <img src={solutionArrows} className="solution-arrows"/>
            <div className="benefits">
                <div className="vant-garde">
                    <h3>Problem Miner (Avant-garde)</h3>
                    <ul>
                        <li>Solution to your problem in a long term</li>
                        <li>Opportunity to be part of future unicorn start-up</li>
                        <li>Rewards through “partner program” in a short term</li>
                    </ul>
                </div>
                <div className="or-div">OR</div>
                <div className="inventor">
                    <h3>Entrepreneur (Inventor)</h3>
                    <ul>
                        <li>Access to pool of real existing ‘pains’ (problems)</li>
                        <li>Crowdsourced problem validation</li>
                        <li>Continuous customer validation for product</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}