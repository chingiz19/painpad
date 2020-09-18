import React from 'react';
import '../About.css';
import Tada from 'react-reveal/HeadShake';
import Fade from 'react-reveal/Fade';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import GoogleAnalytics from '../../../Components/Helpers/GoogleAnalytics';
// import Benefits from './Benefits';

export default function TheSolution() {

    function analytics(){
        let obj={
            category: "About Page Action",
            action: "Tell the serrounding clicked"
        };
        GoogleAnalytics('', obj);
        window.location.href = "/";
    }

    return (
        // TS - TS
        <div className="sec-TS">
            <Fade delay={1200}>
                <Tada count={3} delay={800}>
                    <h1>PainPad - “Hello World” of a Business!</h1>
                </Tada>
            </Fade>
            <Fade delay={2000}>
                <p>
                    In other words, PainPad is a platform where people share <span className="str">daily experiences</span> that
                    drive them crazy or inject inefficiency and needless complication into their <span className="str">everyday
                    lives</span> that can’t be solved on their own. Consequently, problems will be exposed to a
                    crowd full of entrepreneurs looking for real problems worth solving!
                </p>
            </Fade>
            {/* <Benefits/> */}
            <Fade delay={1000} cascade={true}>
                <div className="div-lottie">
                    <DynamicIcon type="networkIcon" width='200' height='200' />
                    <h2>Share Your 'Pain'</h2>
                    <p><span onClick={analytics}>Tell</span> the surrounding a problem that can't be solved on your own.</p>
                </div>
            </Fade>
        </div>
    );
}