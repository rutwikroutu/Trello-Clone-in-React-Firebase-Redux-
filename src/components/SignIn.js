import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import './SignIn.css';
import { loginUser, googleLoginUser } from "../actions";

export default function SignIn(props) {

    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
        toFrontpage: false,
        loading: false
    });

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    };

    async function handleSignIn(e) {
        setState({loading: true});
        e.preventDefault();
        dispatch(loginUser(state.email, state.password, props.history));
        setState({ toFrontpage: true, loading: false });
    };

    async function handleGoogleSignIn(e) {
        setState({loadng: true});
        e.preventDefault();
        dispatch(googleLoginUser(props.history));
        setState({ toFrontpage: true, loading: false });
    }

    const redirect = (
        <Redirect to="/" />
    );

    const signIn = (
        <div className="trelloLogin">
            <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"className="trelloLoginForm__logo" />

            <div class="trelloLoginFormContainer">
            <div className="trelloLoginForm">
                <h1>Login to Trello</h1>
                <input type="email" className="trelloLoginForm__email" placeholder="Enter Email" id="email" onChange={onChange}/>
                
                <input type="password" className="trelloLoginForm__email" placeholder="Enter Password" id="password" onChange={onChange}/>
                
                <button type="submit" onClick={(e) => handleSignIn(e)} className="trelloLoginForm__button">{state.loading ? 'Loading...' : 'Log In'}</button>

                <h1 style={{margin:'10px', fontWeight: 400, fontSize: '13px'}}>OR</h1>
                
                <Button onClick={(e) => handleGoogleSignIn(e) } style={{width: '85%', boxShadow: '1px 1px 5px 5px rgba(0, 0, 0, 0.048)', marginBottom: '20px'}} variant="outlined" startIcon={<img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg" />}>
                    Continue with Google
                </Button>
                <Link to="/signup"><p>Do not have an account ? Sign up for an account</p></Link>
            </div>
            </div>
        </div>
    );

    if (state.toFrontpage) {
        return redirect;
    } else {
        return signIn;
    }
}