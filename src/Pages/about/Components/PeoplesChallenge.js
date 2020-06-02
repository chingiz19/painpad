import React from 'react';
import '../About.css';
import Fade from 'react-reveal/Fade';

import Quora from '../../../images/pages/problem_quora.jpg';
import hackerNews from '../../../images/pages/problem_hacker_news.jpg';
import Medium from '../../../images/pages/problem_medium.jpg';
import Reddit from '../../../images/pages/problem_reddit.jpg';

export default function PeoplesChallenge() {

    return (
        // PC - People's Challenge
        <div className="sec-PC">
            <Fade delay={800}>
                <img src={Quora} alt='quora' className="quora" />
            </Fade>
            <Fade delay={1000} right>
                <img src={hackerNews} alt='hacker news' className="hacker-news" />
            </Fade>
            <Fade delay={1200} right>
                <img src={Medium} alt='medium' className="medium" />
            </Fade>
            <Fade delay={1000}>
                <img src={Reddit} alt='reddit' className="reddit" />
            </Fade>
        </div>
    );
}