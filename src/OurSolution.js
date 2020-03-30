import React from 'react';
import './OurSolution.css';
import solutionArrows from './images/pages/solution_arrows.jpg'
import ComponentHeader from './ComponentHeader';
import ScrollAnimation from 'react-animate-on-scroll';


export default function OurSolution() {
    return (
        <div className="OurSolution-comp">
            <ScrollAnimation animateIn="fadeIn">
                {/* <ComponentHeader contentText="PainPad is the Solution" /> */}
                <ComponentHeader contentText="Here is the solution to the problem" />
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <h1>PainPad is a “Hello World” of a business!</h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <p>
                    In other words, PainPad is a platform where people share <b><i>daily experiences</i></b> that drive them crazy or inject inefficiency or needless complication into their <b><i>everyday lives</i></b> that can’t be solved on their own.
                    Consequently, problems will be exposed to a crowd full of entrepreneurs looking for real problems worth solving!
                </p>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <h2>Benefits you get if you are:</h2>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <img src={solutionArrows} className="solution-arrows" alt='solution arrows'/>
            </ScrollAnimation>
            <div className="avant-garde">
                <ScrollAnimation animateIn="fadeIn">
                    <h3><b>Problem Owner (Avant-garde)</b></h3>
                </ScrollAnimation>
                <ul>
                    <ScrollAnimation animateIn="fadeIn">
                        <li><i class="fas fa-award"></i>Potential earnings provided by PainPad for active and upvoted posts</li>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                        <li><i class="far fa-handshake"></i>Opportunity to be part of future unicorn start-up</li>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                        <li><i class="far fa-laugh-beam"></i>Solution to your problem in a long term</li>
                    </ScrollAnimation>
                </ul>
            </div>
            <ScrollAnimation animateIn="fadeIn">
                <img src={solutionArrows} className="solution-arrows" alt='solution arrows'/>
            </ScrollAnimation>
            <div className="inventor">
                <ScrollAnimation animateIn="fadeIn">
                    <h3><b>Entrepreneur (Inventor)</b></h3>
                </ScrollAnimation>
                <ul>
                    <ScrollAnimation animateIn="fadeIn">
                        <li><i class="fas fa-users"></i>Access to pool of real and existing ‘pains’ (problems)</li>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                        <li><i class="far fa-thumbs-up"></i>Crowdsourced problem validation</li>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                        <li><i class="fas fa-comment-medical"></i>Continuous customer validation for product</li>
                    </ScrollAnimation>
                </ul>
            </div>
        </div>
    );
}