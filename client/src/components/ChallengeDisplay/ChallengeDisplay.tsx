import React, { useEffect, useState } from 'react';


import Button from '@material-ui/core/Button';

import { DateTime } from 'luxon';

import { useStoreContext } from '../../state/GlobalState';

import IUser from '../../interfaces/IUser';
import INewChallenge from '../../interfaces/INewChallenge';
import IChallenge from '../../interfaces/IChallenge';

import { Link } from 'react-router-dom';

import './ChallengeDisplay.css'



type Props = {
    currentChallenge: IChallenge | undefined;
    currentChallenger: IUser | undefined;
    position: number;
}

const ChallengeDisplay: React.FC<Props> = (props) => {

    const [state, dispatch] = useStoreContext();

    console.log(props.currentChallenger)

    const startDate = DateTime.fromISO(props.currentChallenge!.dateStarted);
    const endDate = DateTime.fromISO(props.currentChallenge!.dateEnding);

    return (
        <div className="challenge">
            <h1>Current Challenge</h1>
            <h2>{startDate.toFormat('LLL. dd yyyy')} - {endDate.toFormat('LLL. dd yyyy')}</h2>
            <h2>{state.currentUser.nickname} Challenge Stats</h2>
            {props.position === 1 ? <p>Current Multiplier: {props.currentChallenge!.playerOne_currentMultiplier}</p> : <p>Current Multiplier: {props.currentChallenge!.playerTwo_currentMultiplier}</p>}
            { props.position === 1 ? <p>Total Veggies: {props.currentChallenge!.playerOne_totalVeggies.length}</p> : <p>Total Veggies: {props.currentChallenge!.playerTwo_totalVeggies.length}</p>}
            { props.position === 1 ? <p>Total Unique Veggies: {props.currentChallenge!.playerOne_uniqueVeggies.length}</p> : <p>Total Unique Veggies: {props.currentChallenge!.playerTwo_uniqueVeggies.length}</p>}
            { props.position === 1 ? <h3>Score: {props.currentChallenge!.playerOne_currentScore}</h3> : <h3>Score: {props.currentChallenge!.playerTwo_currentScore}</h3>}

            <h2>{props.currentChallenger!.nickname} Challenge Stats</h2>
            {props.position === 2 ? <p>Current Multiplier: {props.currentChallenge!.playerOne_currentMultiplier}</p> : <p>Current Multiplier: {props.currentChallenge!.playerTwo_currentMultiplier}</p>}
            { props.position === 2 ? <p>Total Veggies: {props.currentChallenge!.playerOne_totalVeggies.length}</p> : <p>Total Veggies: {props.currentChallenge!.playerTwo_totalVeggies.length}</p>}
            { props.position === 2 ? <p>Total Unique Veggies: {props.currentChallenge!.playerOne_uniqueVeggies.length}</p> : <p>Total Unique Veggies: {props.currentChallenge!.playerTwo_uniqueVeggies.length}</p>}
            { props.position === 2 ? <h3>Score: {props.currentChallenge!.playerOne_currentScore} </h3> : <h3>Score: {props.currentChallenge!.playerTwo_currentScore}</h3>}


            <Link to="/"> <Button variant="contained">Back to Login</Button> </Link>
        </div>
    )

}

export default ChallengeDisplay;