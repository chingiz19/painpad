import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './Topic.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderWeb from '../../Components/HeaderWeb'
import SeperatorLine from '../../Components/SeperatorLine';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ExplainationBox from './ExplanationBox';
import SectionPost from './SectionPost';
import SectionChart from './SectionChart';

export default function Topic(props) {
    const [chartData, setChartData] = useState(null);
    const [displayBox, setDisplayBox] = useState(null);

    let topic = "Wi-Fi";

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const { data: isUserSignedIn } = useQuery(IS_USER_SIGNED_IN);

    function handleChartClick(data) {
        if (chartData && chartData.label === data.label) {
            setChartData(null);
            setDisplayBox('hide');
        } else {
            setChartData(data);
            setDisplayBox('show');
        }
    }

    function clearFilter() {
        setChartData(null);
        setDisplayBox('hide');
    }

    return (
        <>
            <Helmet>
                <title>PainPad | Topic</title>
            </Helmet>
            <Container className="view-port">
                <Container fluid="lg">
                    <Row>
                        <Col sm={4} md={3} className="header-comp">
                            <HeaderWeb currentPage={props.pageName} isUserSignedIn={isUserSignedIn} />
                        </Col>
                        <Col sm={8} md={9} className="main-comp">
                            <div className="main-topic-page">
                                <div className="main-header">Analytics for <span>{topic}</span></div>
                                <SectionChart handleChartClick={handleChartClick}/>
                                <ExplainationBox chartData={chartData}
                                    displayBox={displayBox} />
                                <SeperatorLine thisValue="Related posts" />
                                <SectionPost chartData={chartData}
                                    clearFilter={clearFilter}
                                    topic={topic}
                                    subTopic={chartData && chartData.label} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}