import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as noFollow from "../../lottie/no-follow.json";

export default function Loading(props) {

    var iconList = {
        noFollow: {
            loop: true,
            autoplay: true,
            animationData: noFollow.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
    };

    return (
        <FadeIn>
            <div className="d-flex justify-content-center align-items-center">
                <Lottie options={iconList[props.type]} height={parseInt(props.height)} width={parseInt(props.width)} />
            </div>
        </FadeIn>
    );
}