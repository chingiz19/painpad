import React from 'react';

export default function ActivateButton(props) {

    function activateModal() {
        props.handleActivateModal();
    }

    return (
        <div onClick={activateModal} className={props.withButton ? 'wh-li-div' : 'none'}>
            <span className="wh-li-div-span">
                <div className="wh-li-div-span-div">
                    <i className="fas fa-user-plus"></i><span>Sign in / Sign up</span>
                </div>
            </span>
        </div>
    );
}
