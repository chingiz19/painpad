import React, { useState } from 'react';
import './Topic.css';
import PieChart from '../../Components/Helpers/charts/PieChart';
import Choropleth from '../../Components/Helpers/charts/Choropleth';

export default function SectionChart(props) {
    const [chartType, setChartType] = useState('pie');

    function selectChartType(data) {
        setChartType(data);
    }

    function handlePieClick(data) {
        props.handlePieClick(data);
    }

    function handleMapClick(data) {
        props.handleMapClick(data);
    }

    let chartData = [
        {
            "id": "connection",
            "label": "connection",
            "value": 224
        },
        {
            "id": "expensive",
            "label": "expensive",
            "value": 268
        },
        {
            "id": "password",
            "label": "password",
            "value": 380
        },
        {
            "id": "speed",
            "label": "speed",
            "value": 14
        },
        {
            "id": "maintenance",
            "label": "maintenance",
            "value": 549
        }
    ];

    let mapData = [
        {
          "id": "CAN",
          "value": 982207
        },
        {
          "id": "AGO",
          "value": 302178
        },
        {
          "id": "BLZ",
          "value": 790717
        }
    ];

    return (
        <div className="section-chart">
            <div className="div-btn">
                <button onClick={() => selectChartType('pie')} className={chartType === 'pie' ? 'selected-l' : 'not-selected-l'}>
                    <i className="fas fa-chart-pie"></i>Pie
                </button>
                <button onClick={() => selectChartType('map')} className={chartType === 'map' ? 'selected-r' : 'not-selected-r'}>
                    <i className="fas fa-globe-americas"></i>Map
                </button>
            </div>
            <div className={chartType === 'pie' ? 'div-chart' : 'none'}>
                <PieChart data={chartData} sliceClicked={handlePieClick} />
            </div>
            <div className={chartType === 'map' ? 'div-chart' : 'none'}>
                <Choropleth data={mapData} mapClicked={handleMapClick} />
            </div>
        </div>
    );
}