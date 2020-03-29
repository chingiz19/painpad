
import React from 'react';
import './OurProblem.css';
import ScrollAnimation from 'react-animate-on-scroll';
import Fade from 'react-reveal/Fade';

export default function OurProblem() {
    return (
        <Fade opposite>
            <div className="OurProblem-comp">
                <p>
                    We are typical engineers (i.e. introverts), who always dreamed to build a scalable business that tackles problems worth solving.
                    However, the challenge was to find a validated problem without working in a particular industry for years.
                    So we thought, what if we could talk to experienced individuals from all industries and pick up a problem that matches our skill sets and resources?
            </p>
                <div></div>
                <text>After a quick research...</text>
            </div>
        </Fade>
    );
}