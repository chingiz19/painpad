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
import * as loading from "../../lottie/loading.json";
import * as loadingDone from "../../lottie/done-loading.json";
import * as loadingError from "../../lottie/error-loading.json";
import * as networkIcon from "../../lottie/network-icon.json";
import * as peSad from "../../lottie/post-explaination-sad.json";
import * as peHappy from "../../lottie/post-explaination-happy.json";

export default function DynamicIcon(props) {

    var iconList = {
        loading: {
            loop: true,
            autoplay: true,
            animationData: loading.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        loadingDone: {
            loop: true,
            autoplay: true,
            animationData: loadingDone.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        loadingError: {
            loop: true,
            autoplay: true,
            animationData: loadingError.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
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
            loop: props.loop,
            autoplay: true,
            animationData: postApproved.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        postRejected: {
            loop: props.loop,
            autoplay: true,
            animationData: postRejected.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        notifReward: {
            loop: props.loop,
            autoplay: true,
            animationData: notifReward.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        networkIcon: {
            loop: true,
            autoplay: true,
            animationData: networkIcon.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        peSad: {
            loop: true,
            autoplay: true,
            animationData: peSad.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        peHappy: {
            loop: true,
            autoplay: true,
            animationData: peHappy.default,
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