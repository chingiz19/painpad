import React from 'react';
import './PeoplesChallange.css';
import probelemQuora from './images/pages/problem_quora.jpg'
import problemHackerNews from './images/pages/problem_hacker_news.jpg'
import problemMedium from './images/pages/problem_medium.jpg'
import problemReddit from './images/pages/problem_reddit.jpg'
import ComponentHeader from './ComponentHeader';


export default function PeoplesChallange() {
    return (
        <div className="PeoplesChallage-comp">
            <ComponentHeader contentText="People with Challanges"/>
            <div className='quora'>
                <img src={probelemQuora}/>
            </div>
            <div className='hacker-news'>
                <img src={problemHackerNews}/>
            </div>
            <div className='medium'>
                <img src={problemMedium}/>
            </div>
            <div className='reddit'>
                <img src={problemReddit}/>
            </div>
        </div>
    );
}