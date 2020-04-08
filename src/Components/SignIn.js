import React, { useRef, useState } from 'react';
import Validate from 'validate.js';
import './SignIn.css';
import TextField from '@material-ui/core/TextField';

export default function SignIn() {
    const username = useRef(null);
    const password = useRef(null);

    const constraints = {
        username: {email: {
            message: "doesn't look like a valid email"
          }
        },
        password: {
            length: {
                minimum: 6,
                tooShort: "needs to have %{count} letters or more",
            }
        }
};

const [{ emailMessage, passMessage }, setMessage] = useState({ emailMessage: null, passMessage: null });

const submitInput = e => {
    let check = Validate({
        username: username.current.value,
        password: password.current.value
    }, constraints);

    setMessage({
        emailMessage: check && check.username ? check.username[0] : null,
        passMessage: check && check.password ? check.password[0] : null,
    });
}

return (
    <>
        <div className="signin-main-div">
            <TextField required
                error={emailMessage != null}
                id="signin-email"
                label="Email"
                name="email"
                inputRef={username}
                helperText={emailMessage}
                variant="outlined"
                size="small"
                type="email" />

            <TextField required
                error={passMessage != null}
                id="signin-password"
                label="Password"
                name="email"
                inputRef={password}
                helperText={passMessage}
                variant="outlined"
                size="small"
                type="password" />
            <button onClick={submitInput}>Submit</button>
        </div>
    </>
);
}