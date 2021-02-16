import { myFirebase } from "../firebase/firebase";
import firebase from 'firebase';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestRegister = () => {
    return {
        type: REGISTER_REQUEST
    };
};

const receiveRegister = user => {
    return {
        type: REGISTER_SUCCESS,
        user
    }
}

const registerError = (message) => {
    return {
        type: REGISTER_FAILURE,
        message
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginUser = (email, password, history) => async dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveLogin(user));
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user.user));
            history.push("/");
        })
        .catch(error => {
            dispatch(loginError());
        });
};

export const googleLoginUser = (history) => async dispatch => {
    dispatch(requestLogin());
    const provider = new firebase.auth.GoogleAuthProvider();
    myFirebase.auth().signInWithPopup(provider).then(user => {
        dispatch(receiveLogin(user));
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user.user));
        history.push("/");
    })
    .catch(error => {
        dispatch(loginError());
    });
}

export const registerUser = (email, password,fullName, callback) => async dispatch => {
    dispatch(requestRegister());
    myFirebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user.updateProfile({
                displayName: fullName,
            }).then(() => {
                const email = userCredential.user.email.replace(".", ","); // cannot save "." in DB
                const userId = userCredential.user.uid;
                const name = userCredential.user.displayName;
                myFirebase.database().ref('/users/' + userId).set({
                    email: email,
                    name: name,
                    bio: ''
                });
                myFirebase.database().ref('/emailToUid/').child(email).set({
                    userId
                })

                localStorage.setItem('user', JSON.stringify(userCredential.user));
                dispatch(receiveRegister());
                callback();
            });
        })
        .catch(error => {
            // Do something with the error if you want!
            dispatch(registerError(error.message));
        });
};

export const googleRegisterUser = (callback) => async dispatch => {
    dispatch(requestRegister());
    const provider = new firebase.auth.GoogleAuthProvider();
    myFirebase.auth().signInWithPopup(provider)
        .then(userCredential => {
                const email = userCredential.user.email.replace(".", ","); // cannot save "." in DB
                const userId = userCredential.user.uid;
                const name = userCredential.user.displayName;
                myFirebase.database().ref('/users/' + userId).set({
                    email: email,
                    name: name,
                    bio: ''
                });
                myFirebase.database().ref('/emailToUid/').child(email).set({
                    userId
                })

                localStorage.setItem('user', JSON.stringify(userCredential.user));
                dispatch(receiveRegister());
                callback();
        })
        .catch(error => {
            // Do something with the error if you want!
            dispatch(registerError(error.message));
        });
}

export const logoutUser = () => async dispatch => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.removeItem('user')
            dispatch(receiveLogout());
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(logoutError());
        });
};

export const verifyAuth = () => async dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
            dispatch(receiveLogin(user));
            dispatch(verifySuccess());
        } else {
            dispatch(loginError());
        }
    });
};