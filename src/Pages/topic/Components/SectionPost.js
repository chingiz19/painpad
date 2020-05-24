import React from 'react'
import '../Topic.css';
import ProblemFeed from '../../../Components/ProblemFeed';


export default function SectionPost(props) {
    let data = props.selectedData;

    function handleClearFilter() {
        props.clearFilter();
    }

    return (
        <div className="section-posts">
            <div className={data ? 'div-filter' : 'none'}>
                <div>Filtered for <span>{(data && data.label) || (data && data.selectedData.label)}</span></div>
                <button onClick={handleClearFilter} className="btn-clear"><i className="fas fa-times"></i></button>
            </div>
            <ProblemFeed page={'topic'} thisPosts={[]} topic={props.topic} subTopic={props.subTopic}/>
        </div>
    );
}