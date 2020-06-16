import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import features from './WorldCountriesFeatures';

export default function Choropleth(props) {
    const screenX = window.screen.width;

    function handleOnClick(data) {
        props.mapClicked(data);
    }

    return (
        <ResponsiveChoropleth
            data={props.data}
            onClick={handleOnClick}
            features={features.features}
            margin={{ top: (screenX > 600 ? 70 : 50), right: 0, bottom: 0, left: 0 }}
            colors="OrRd"
            domain={[0, 1000000]}
            // unknownColor="rgb(220, 220, 243)"
            unknownColor="rgba(103, 122, 138, 0.1)"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={screenX > 600 ? 100 : 65}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineWidth={0}
            graticuleLineColor="#dddddd"
            borderWidth={screenX > 600 ? 0.5 : 0.3}
            // borderColor="#3f4257"
            borderColor="rgba(103, 122, 138, 0.9)"
            legends={[]}
        />
    );
}