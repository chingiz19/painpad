import React from 'react'
import './Topic.css';


export default function ExplanationBox(props) {

    return (
        <div className={!props.displayBox ? 'none' : (props.displayBox === 'show' ? 'div-explaination' : 'none-exp')}>
            <ul className="ul-expl-box">
                <li><span>34</span> related posts</li>
                <li><span>195</span> same-heres</li>
                <li><span>24</span> publishers</li>
            </ul>
            <p>
                Value of <span>60</span> highlights the magnitude of a problem relative to others. It accounts for related posts, number of same-heres, and user expertise.
            </p>
        </div>
    );
}