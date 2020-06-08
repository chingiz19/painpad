import React from 'react'
import '../Topic.css';


export default function ExplanationBox(props) {
    let data = props.selectedData;

    return (
        props.type === 'pie'
            ?
            <div className={!props.displayBox ? 'none' : (props.displayBox === 'show' ? 'div-explaination' : 'none-exp')}>
                <ul className="ul-expl-box">
                    <li><span>{data && data.postCount}</span> related posts</li>
                    <li><span>{data && data.sameHereCount}</span> same-heres</li>
                </ul>
                <p>Value of <span>{data && data.value}</span> highlights the magnitude of a
                    problem relative to others. It accounts for related posts,
                    number of same-heres, and user expertise.</p>
            </div>
            : (
                props.type === 'map'
                    ?
                    <div className={!props.displayBox ? 'none' : (props.displayBox === 'show' ? 'div-explaination' : 'none-exp')}>
                        <ul className="ul-expl-box">
                            <li><span>{data && data.data.postCount}</span> related posts</li>
                            <li><span>{data && data.data.sameHereCount}</span> same-heres</li>
                        </ul>
                        <p>Value of <span>{data && data.data.value}</span> highlights the magnitude
                            of a problem relative to other countries. It accounts for related posts,
                            and number of same-heres.</p>
                    </div>
                    :
                    <div className={!props.displayBox ? 'none' : (props.displayBox === 'show' ? 'div-explaination' : 'none-exp')}>
                        Ups...Something went wrong
                </div>
            )

    );
}