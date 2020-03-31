import React from 'react';
import mixpanel from 'mixpanel-browser';
import { v4 as uuidv4 } from 'uuid';

const Tracker = (props) => {
    mixpanel.init("c4db1142f0a03880749300f3dff497dd");

    //tracking for the only event
    mixpanel.track(`Page visit -> ${props.info}`, { identifier: uuidv4() });

    return (<></>);
};

export default Tracker;