import React from 'react'
import './Topic.css';
import ProblemFeed from '../../Components/ProblemFeed';


export default function SectionPost(props) {

    function handleClearFilter() {
        props.clearFilter();
    }

    return (
        <div className="section-posts">
            <div className={props.chartData ? 'div-filter' : 'none'}>
                <div>Filtered for <span>{props.chartData && props.chartData.label}</span></div>
                <button onClick={handleClearFilter} className="btn-clear"><i className="fas fa-times"></i></button>
            </div>
            <ProblemFeed page={'topic'} thisPosts={[]} topic={props.topic} subTopic={props.subTopic}/>
        </div>
    );
}