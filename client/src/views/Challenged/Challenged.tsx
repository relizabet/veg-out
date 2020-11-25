import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { useStoreContext } from '../../state/GlobalState';

import IUser from '../../interfaces/IUser';
import IChallenge from '../../interfaces/IChallenge';

import userAPI from '../../utils/userAPI'
import challengesAPI from '../../utils/challengesAPI';

import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER } from '../../state/actions';

import ChallengeDisplay from '../../components/ChallengeDisplay/ChallengeDisplay';

import { Link } from 'react-router-dom';

function Challenged() {

    const [state, dispatch] = useStoreContext();

    const [currentChallenge, setCurrentChallenge] = useState<IChallenge>()
    const [currentChallenger, setCurrentChallenger] = useState<IUser>()
    const [position, setPosition] = useState(1);

    const [isLoading, setIsLoading] = useState(true);



    // loads state from local storage if page is refreshed
    // useEffect(() => {
    //     if (!state.currentUser._id) {
    //         const storedState = loadFromLocalStorage()
    //         dispatch({
    //             type: SET_CURRENT_USER,
    //             currentUser: storedState.currentUser
    //         });
    //     } else saveToLocalStorage(state);

    // }, [])

    useEffect(() => {
        console.log("in use Effect")
        console.log(state.currentUser.currentChallenge)
        challengesAPI.getChallenge(state.currentUser.currentChallenge)
            .then(res => {
                setCurrentChallenge(res.data);
                console.log(JSON.stringify(res.data));
                let challenger;
                if (res.data.playerOne._id === state.currentUser._id) {
                    challenger = res.data.playerTwo;
                    setPosition(1) // current user is player one
                } else {
                    challenger = res.data.playerOne;
                    setPosition(2) // current user is player two
                }
                setCurrentChallenger(challenger);
                console.log(challenger);
                setIsLoading(false);
            })
            .catch(err => console.log(err))

    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const loadStats = () => {
        return <ChallengeDisplay currentChallenge={currentChallenge} currentChallenger={currentChallenger} position={position} />
    }

    return (
        <div>
            {currentChallenge ?
                <ChallengeDisplay currentChallenge={currentChallenge} currentChallenger={currentChallenger} position={position} /> :
                <Button variant="contained" onClick={() => loadStats()}>View Challenge Stats</Button>

            }



        </div>
    )


}


export default withAuthenticationRequired(Challenged, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});