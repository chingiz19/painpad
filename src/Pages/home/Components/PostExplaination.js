import React from 'react';
import './HomeComponents.css';
import Fade from 'react-reveal/Fade';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';

export default function PostExplaination() {


    return (
        // PE - Post Explaination
        <Fade delay={400}>
            <div className="sec-PE">
                <div className="header">Tell a problem that can't be solved on your own.</div>
                <div className="subheader">Necessarily problem..not a suggestion.</div>
                <div className="div-body">
                    <ul className="ul-icon">
                        <li className="li-body">It is nice to have someone to walk your dog.</li>
                        <li className="icon">
                            <DynamicIcon type="peSad" width={30} height={30}/>
                        </li>
                        <li className="txt">suggestion</li>
                    </ul>
                    <ul className="ul-icon">
                        <li className="li-body">I have early morning meetings in weekdays, and can't walk my dog during that time.</li>
                        <li className="icon happy">
                            <DynamicIcon type="peHappy" width={100} height={20}/>
                        </li>
                        <li className="txt">problem</li>
                    </ul>
                </div>
            </div>
        </Fade>
    );
}