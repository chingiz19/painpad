
/**
 * This service provides helpers for Google Analytics
 * @param {*} category - (REQUIRED) Top level category for the event E.g. 'User', 'Navigation', 'App Editing', etc.
 * @param {*} action - (REQUIRED) Description of the behaviour. E.g. 'Clicked Delete', 'Added a component', 'Deleted account', etc.
 * @param {*} label - (OPTIONAL) More precise labelling of the related action. E.g. alongside the 'Added a component' action, we could add the name of a component as the label. E.g. 'Survey', 'Heading', 'Button', etc.
 */
import ReactGA from 'react-ga';

export default function GoogleAnalytics(page, {category, action, label}) {

    const trackingId = "UA-171555540-1";
    ReactGA.initialize(trackingId);

    if(page){
        ReactGA.pageview(page);
    }

    if(label){
        ReactGA.event({
            category: category,
            action: action,
            label: label
        });
    } else{
        ReactGA.event({
            category: category,
            action: action
        });
    }

}
