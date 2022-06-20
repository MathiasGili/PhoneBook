import { SET_IS_LOGGED_IN_TRUE, SET_IS_LOGGED_IN_FALSE } from './actionsType';

export const setIsLoggedInTrue = () => {
    return {
        type: SET_IS_LOGGED_IN_TRUE,
    };
};

export const setIsLoggedInFalse = () => {
    return {
        type: SET_IS_LOGGED_IN_FALSE,
    };
};