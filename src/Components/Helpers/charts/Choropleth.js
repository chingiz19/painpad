import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import features from './WorldCountriesFeatures';

export default function Choropleth(props) {

    function handleOnClick(data) {
        props.mapClicked(data);
    }

    return (
        <ResponsiveChoropleth
            data={props.data}
            onClick={handleOnClick}
            features={features.features}
            margin={{ top: 70, right: 0, bottom: 0, left: 0 }}
            colors="nivo"
            domain={[0, 1000000]}
            unknownColor="rgb(220, 220, 243)"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={115}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineWidth={0}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#3f4257"
            legends={[]}
        />
    );
}