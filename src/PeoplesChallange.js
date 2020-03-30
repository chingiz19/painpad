import React from 'react';
import './PeoplesChallange.css';
import probelemQuora from './images/pages/problem_quora.jpg'
import problemHackerNews from './images/pages/problem_hacker_news.jpg'
import problemMedium from './images/pages/problem_medium.jpg'
import problemReddit from './images/pages/problem_reddit.jpg'
import ComponentHeader from './ComponentHeader';
import ScrollAnimation from 'react-animate-on-scroll';

export default function PeoplesChallange() {
    return (
        <div className="PeoplesChallage-comp">
            <ScrollAnimation animateIn="fadeIn">
                <ComponentHeader contentText="Problems are all over the place" />
            </ScrollAnimation>
            <ScrollAnimation animateIn="bounceInLeft" animateOut='bounceOutRight'>
                <div className='quora'>
                    <img src={probelemQuora} alt='quora problem'/>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
                <div className='hacker-news'>
                    <img src={problemHackerNews} alt='hacker news problem'/>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="bounceInRight" animateOut='bounceOutLeft'>
                <div className='medium'>
                    <img src={problemMedium} alt='medium problem'/>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="bounceInLeft" animateOut='bounceOutRight'>
                <div className='reddit'>
                    <img src={problemReddit} alt='problem reddit'/>
                </div>
            </ScrollAnimation>
        </div>
    );
}