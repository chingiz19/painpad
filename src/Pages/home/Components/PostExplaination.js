import React from 'react';
import './HomeComponents.css';
import Fade from 'react-reveal/Fade';
// import DynamicIcon from '../../../Components/Helpers/DynamicIcon';

export default function PostExplaination() {

    return (
        // PE - Post Explaination
        <Fade delay={400}>
            <div className="sec-PE">
                <div className="header">Share any problem that can't be solved on your own.</div>
                <div className="subheader">Entrepreneurs want to solve them and we know they can.</div>
                {/* <div className="div-body">
                    <ul className="ul-icon">
                        <li className="icon happy">
                            <DynamicIcon type="solution" width={50} height={50}/>
                        </li>
                        <li className="li-hdr">Solution to Problem</li>
                        <li className="li-body">Get a solution to your problem.</li>
                    </ul>
                    <ul className="ul-icon">
                        <li className="icon happy">
                            <DynamicIcon type="makeMoney" width={50} height={50}/>
                        </li>
                        <li className="li-hdr">Earn Money</li>
                        <li className="li-body">Potential earnings provided by PainPad for active posts.</li>
                    </ul>
                    <ul className="ul-icon">
                        <li className="icon happy">
                            <DynamicIcon type="dreamBig" width={50} height={50}/>
                        </li>
                        <li className="li-hdr">Dream Big</li>
                        <li className="li-body">Opportunity to be part of future unicord start-up.</li>
                    </ul>
                </div> */}
            </div>
        </Fade>
    );
}