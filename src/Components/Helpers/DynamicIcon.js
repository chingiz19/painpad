import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as noFollow from "../../lottie/no-follow.json";
import * as emailSent from "../../lottie/email-sent.json";
import * as resetPass from "../../lottie/reset-pass.json";
import * as noPosts from "../../lottie/no-posts.json";
import * as notFound from "../../lottie/not-found.json";
import * as postApproved from "../../lottie/post-approved.json";
import * as postRejected from "../../lottie/post-rejected.json";
import * as notifReward from "../../lottie/notif-reward.json";
import * as Loading from "../../lottie/loading.json";

export default function DynamicIcon(props) {

    var iconList = {
        noFollow: {
            loop: true,
            autoplay: true,
            animationData: noFollow.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        emailSent: {
            loop: true,
            autoplay: true,
            animationData: emailSent.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        resetPass: {
            loop: true,
            autoplay: true,
            animationData: resetPass.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        noPosts: {
            loop: true,
            autoplay: true,
            animationData: noPosts.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        notFound: {
            loop: true,
            autoplay: true,
            animationData: notFound.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        postApproved: {
            loop: true,
            autoplay: true,
            animationData: postApproved.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        postRejected: {
            loop: true,
            autoplay: true,
            animationData: postRejected.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        notifReward: {
            loop: true,
            autoplay: true,
            animationData: notifReward.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        loading: {
            loop: true,
            autoplay: true,
            animationData: Loading.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
    };

    return (
        !props.type
            ?
            ''
            :
            <FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                    <Lottie options={iconList[props.type]} height={parseInt(props.height)} width={parseInt(props.width)} />
                </div>
            </FadeIn>
    );
}