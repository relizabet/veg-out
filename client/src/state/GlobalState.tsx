import React, { createContext, useReducer, useContext } from "react";
import IUser from "../interfaces/IUser";




import {
    SET_CURRENT_USER,
    LOADING
} from "./actions";

type State = {
    currentUser: IUser;
    loading: boolean;

}

type Action =
    | { type: 'SET_CURRENT_USER', currentUser: IUser }
    | { type: 'LOADING' };

const initialState: State = {
    currentUser: {
        _id: "",
        email: "",
        auth0ID: "",
        nickname: "",
        challenged: false,
        currentChallenge: "",
        win: 0,
        loss: 0,
        tie: 0,
        lifetimeUniqueVeggies: [],
        lifetimeTotalVeggies: []

    },

    loading: false
}

const StoreContext = createContext<[State, React.Dispatch<any>]>([initialState, () => null]);
const { Provider } = StoreContext;

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
                loading: false
            };

        case LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
};

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
