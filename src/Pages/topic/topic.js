import React, { useState } from 'react';
import './Topic.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Header from '../../Components/Header/Header';
import SeperatorLine from '../../Components/SeperatorLine';
import ExplainationBox from './Components/ExplanationBox';
import SectionPost from './Components/SectionPost';
import SectionChart from './Components/SectionChart';

export default function Topic(props) {
    let topicId = parseInt(window.location.href.split("topics/")[1]);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [topicName, setTopicName] = useState(null);
    const [chartType, setChartType] = useState('pie');
    const [selectedData, setSelectedData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [displayBox, setDisplayBox] = useState('hide');

    const IS_USER_SIGNED_IN = gql`
        query isLogin{
            isLogin {success, id}
        }
    `;

    const GET_TOPIC_STATS = gql`
        query topicStats ($topicId: ID!) {
            topicStats (topicId: $topicId) {
                topicName,
                weights{
                    subTopicWeights {
                        postCount, userPoint, sameHere
                    },
                    countryWeights {
                        postCount, sameHere
                    }
                }, 
                subTopicStats {
                    subTopicId, subTopicName, sameHereCount, userPoints, postCount
                },
                topicCountryStats {
                    countryId, countryName, postCount, sameHereCount
                }
            }
        }
    `;

    useQuery(IS_USER_SIGNED_IN, {
        onCompleted: data => {
            setUserId(data.isLogin.id);
            setIsSignedIn(data.isLogin.success);
        }
    });

    useQuery(GET_TOPIC_STATS, {
        variables: {
            topicId: topicId
        },
        onCompleted: data => {
            setTopicName(data.topicStats.topicName);
            formatChartData(data.topicStats);
        },
        onError: ({ graphQLErrors }) => {
            window.location.href = "/404";
        }
    });

    function handleChartClick(data) {
        if (selectedData && selectedData.label === data.label) {
            setSelectedData(null);
            setDisplayBox('hide');
        } else {
            setSelectedData(data);
            setDisplayBox('show');
        }
    }

    function selectChartType(data) {
        setChartType(data);
        clearFilter();
    }

    function clearFilter() {
        setSelectedData(null);
        setDisplayBox('hide');
    }

    function formatChartData(data) {
        let formatedObj = {};
        let stWt = data.weights.subTopicWeights;
        let cntWt = data.weights.countryWeights;
        formatedObj["pie"] = data.subTopicStats.map((obj) => {
            return {
                id: obj.subTopicName,
                subtopicId: parseInt(obj.subTopicId),
                label: obj.subTopicName,
                value: Math.ceil((stWt.postCount * obj.postCount + stWt.sameHere * obj.sameHereCount + stWt.userPoint * obj.userPoints) / 5) * 5,
                postCount: obj.postCount,
                sameHereCount: obj.sameHereCount
            };
        });
        formatedObj["map"] = data.topicCountryStats.map((obj) => {
            return {
                id: obj.countryName,
                countryId: parseInt(obj.countryId),
                value: Math.ceil((cntWt.postCount * obj.postCount + cntWt.sameHere * obj.sameHereCount) / 5) * 5,
                postCount: obj.postCount,
                sameHereCount: obj.sameHereCount
            };
        });
        setChartData(formatedObj);
    }

    return (
        <>
            <div className="div-main">
                <div className="col-left">
                    <Header currentPage={props.pageName}
                        isSignedIn={isSignedIn}
                        userId={userId} />
                </div>
                <div className="col-right main-TP">
                    <div className="main-header">Analytics for <span>{topicName}</span></div>
                    <SectionChart handleChartClick={handleChartClick}
                        selectChartType={selectChartType}
                        chartData={chartData} />
                    <ExplainationBox selectedData={selectedData}
                        type={chartType}
                        displayBox={displayBox} />
                    <SeperatorLine thisValue="Related posts" />
                    <SectionPost isSignedIn={isSignedIn}
                        selectedData={selectedData}
                        clearFilter={clearFilter}
                        subtopicId={selectedData && selectedData.subtopicId}
                        subtopicName={selectedData && selectedData.label}
                        topicId={topicId}
                        topicName={topicName}
                        countryId={selectedData && selectedData.data && selectedData.data.countryId} />
                </div>
            </div>
        </>
    );
}