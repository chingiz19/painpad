import React from 'react';
import { ResponsivePie } from '@nivo/pie';

export default function PieChart(props) {

    function handleOnClick(data) {
        props.sliceClicked(data);
    }


    return (
        <ResponsivePie
            data={props.data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-90}
            sortByValue={true}
            innerRadius={0.4}
            padAngle={2}
            cornerRadius={5}
            colors={{ scheme: 'pastel1' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', '0.2']] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#3f4257"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={25}
            radialLabelsLinkHorizontalLength={25}
            radialLabelsLinkStrokeWidth={2}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#3f4257"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            onClick={handleOnClick}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
        />
    );
}