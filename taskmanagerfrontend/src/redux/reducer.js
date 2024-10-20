// reducer.js
const LOGINSUCCESS = 'LOGINSUCCESS';
const LOGOUT = 'LOGOUT';

const initialState = {
    username: sessionStorage.getItem("username") || '',
    email: sessionStorage.getItem("email") || 'abc@gmail.com',
    authenticated: sessionStorage.getItem("isAuthenticated") || false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGINSUCCESS:
            return {
                ...state,
                username: action.username,
                email: action.email,
                authenticated: true
            };

        case LOGOUT:
            return {
                ...state,
                username: '',
                email: '',
                authenticated: false,
            };

        default:
            return state;
    }
};

export default appReducer;


