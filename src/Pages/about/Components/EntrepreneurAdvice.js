import React from 'react';
import '../About.css';

import PG from '../../../images/pages/paul_graham.jpg';
import KS from '../../../images/pages/kevin_systrom.jpg';

export default function EntrepreneurAdvice() {

    return (
        // EA - Entrepreneur Advice
        <div className="sec-EA">
            <div className="div-entrepreneur">
                <img src={PG} alt="header logo" />
                <p>"…It sounds obvious to say you should only work on problems that exist.
                    And yet by far the most common mistake startups make is to solve problems no one has."</p>
            </div>
            <div className="div-entrepreneur">
                <p>“…Hard part is actually finding a problem to solve. Solutions come pretty 
                    easily for the majority of problems”</p>
                <img src={KS} alt="header logo" />
            </div>
        </div>
    );
}