import React, { useState } from 'react';
import '../Topic.css';
import PieChart from '../../../Components/Helpers/charts/PieChart';
import Choropleth from '../../../Components/Helpers/charts/Choropleth';
import Fade from 'react-reveal/Fade';

export default function SectionChart(props) {
    const [chartType, setChartType] = useState('pie');

    function selectChartType(data) {
        setChartType(data);
        props.selectChartType(data);
    }

    function handleChartClick(data) {
        props.handleChartClick(data);
    }

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
            <Fade cascade>
                <div className={chartType === 'pie' ? 'div-chart' : 'none'}>
                    <PieChart data={props.chartData ? props.chartData.pie : []} sliceClicked={handleChartClick} />
                </div>
                <div className={chartType === 'map' ? 'div-chart' : 'none'}>
                    <Choropleth data={props.chartData ? props.chartData.map : []} mapClicked={handleChartClick} />
                </div>
            </Fade>
        </div>
    );
}