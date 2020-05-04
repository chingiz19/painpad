import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as loadingData from "../lottie/loading.json";
import * as doneData from "../lottie/doneloading.json";
import * as errorData from "../lottie/errorloading.json";


export default function Loading(props) {

    const loadingOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const doneOptions = {
        loop: false,
        autoplay: true,
        animationData: doneData.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const errorOptions = {
        loop: false,
        autoplay: true,
        animationData: errorData.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className={props.thisClass}>
            <FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                    {props.loading && <Lottie options={loadingOptions} height={90} width={90} />}
                    {props.done && <Lottie options={doneOptions} height={90} width={90} />}
                    {props.error && <Lottie options={errorOptions} height={90} width={90} />}
                </div>
            </FadeIn>
        </div>
    );
}