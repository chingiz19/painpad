
import React from 'react';
import './EntrepreneurComp.css';
import PG from './images/pages/paul_graham.jpg'
import KS from './images/pages/kevin_systrom.jpg'
import ComponentHeader from './ComponentHeader';
import Fade from 'react-reveal/Fade';

export default function EntrepreneurComp() {
    return (
        <Fade opposite>
            <div className="entrepreneur-comp">
                <ComponentHeader contentText="Entrepreneur Advice" />
                <div className="comp-body PG-div">
                    <img src={PG} className="entr-img" />
                    <p>"…It sounds obvious to say you should only work on problems that exist. And yet by far the most common mistake startups make is to solve problems no one has."</p>
                </div>
                <div className="comp-body KS-div">
                    <p>“…Hard part is actually finding a problem to solve. Solutions come pretty easily for the majority of problems”</p>
                    <img src={KS} className="entr-img" />
                </div>
            </div>
        </Fade>
    );
}