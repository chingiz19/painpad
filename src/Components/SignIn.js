import React, { useRef, useState } from 'react';
import Validate from 'validate.js';
import './SignIn.css';
import TextField from '@material-ui/core/TextField';

export default function SignIn() {
    const username = useRef(null);
    const password = useRef(null);

    const [stateObj, setMessage] = useState({ emailMessage: null, passMessage: null });

    const constraints = {
        username: {
            email: {
                message: "Please enter valid email"
            }
        },
        password: {
            length: {
                minimum: 6,
                tooShort: "Minimum %{count} characters or more",
            }
        }
    };

    const submitInput = e => {
        let check = Validate({
            username: username.current.value,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                emailMessage: check && check.username ? check.username[0] : null,
                passMessage: check && check.password ? check.password[0] : null
            }
        });
    }

    return (
        <>
            <div className="signin-main-div">
                <TextField required
                    error={stateObj.emailMessage != null}
                    id="signin-email"
                    label="Email"
                    name="email"
                    inputRef={username}
                    helperText={stateObj.emailMessage}
                    variant="outlined"
                    size="small"
                    type="email" />

                <TextField required
                    error={stateObj.passMessage != null}
                    id="signin-password"
                    label="Password"
                    name="password"
                    inputRef={password}
                    helperText={stateObj.passMessage}
                    variant="outlined"
                    size="small"
                    type="password" />

                <button onClick={submitInput}>Submit</button>
            </div>
        </>
    );
}