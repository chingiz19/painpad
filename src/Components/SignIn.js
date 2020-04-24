import React, { useRef, useState } from 'react';
import Validate from 'validate.js';
import './SignIn.css';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export default function SignIn() {
    const email = useRef(null);
    const password = useRef(null);

    const [stateObj, setMessage] = useState({ emailMessage: null, passMessage: null });

    const constraints = {
        email: {
            email: {
                message: "Please enter valid email"
            }
        },
        password: {
            length: {
                minimum: 4,
                tooShort: "Minimum %{count} characters or more",
            }
        }
    };

    const USER_SIGN_IN = gql`
        mutation LogIn($email: String!, $pwd: String!){
            login(email: $email, pwd: $pwd)
        }
    `;

    const [callUserSignIn, { loading, error, data }] = useMutation(USER_SIGN_IN);

    const submitInput = e => {
        let check = Validate({
            email: email.current.value,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                emailMessage: check && check.email ? check.email[0] : null,
                passMessage: check && check.password ? check.password[0] : null
            }
        });

        if (!check) {
            callUserSignIn({
                variables: {
                    email: email.current.value,
                    pwd: password.current.value
                }
            });
        }
    }

    return (
        <>
            <div className="signin-main-div">
                <TextField required
                    error={stateObj.emailMessage != null}
                    label="Email"
                    name="email"
                    inputRef={email}
                    helperText={stateObj.emailMessage}
                    variant="outlined"
                    size="small"
                    type="email" />

                <TextField required
                    error={stateObj.passMessage != null}
                    label="Password"
                    name="password"
                    inputRef={password}
                    helperText={stateObj.passMessage}
                    variant="outlined"
                    size="small"
                    type="password" />

                <button onClick={submitInput}>Submit</button>
                <br/>
                <div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                    {data && <p>Data is here {JSON.stringify(data.login)}</p>}
                </div>
            </div>
        </>
    );
}