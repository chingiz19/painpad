import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import mixpanel from 'mixpanel-browser';

export default function Footer() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        mixpanel.track('YES clicked', { data: 'custom' });
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleNo = () =>  mixpanel.track('NO clicked', { data: 'custom' });

    return (
        <>
            <div id="footer">
                <h3>Would you benefit from this platform?</h3>
                <div>
                    <button onClick={handleShow}>Yes</button>
                    <button onClick={handleNo}>No</button>
                </div>
                <div className="email-div">
                    <i className="far fa-envelope fa-2x"></i>
                    <a href="mailto:hello@painpad.co">Or let us know what you think</a>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Happy to hear! Join our launch party..</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="mc_embed_signup">
                        <form action="https://painpad.us19.list-manage.com/subscribe/post?u=ab746edbe0c2101d6e07c7455&amp;id=ccb8efc0a7"
                            method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank"
                            novalidate>
                            <div id="mc_embed_signup_scroll">
                                <div className="innput-div">
                                    <input type="email"  name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
                                    <div className="clear">
                                        <input type="submit" value="Join" name="subscribe" id="mc-embedded-subscribe" className="button" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}