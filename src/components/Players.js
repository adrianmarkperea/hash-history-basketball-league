import React from 'react';
import { Route, Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useQuery } from '../helpers';
import Sidebar from './Sidebar';
import { getPlayers } from '../api';
import slug from 'slug';

function playersReducer(state, action) {
    if (action.type === 'fetch') {
        return {
            ...state,
            loading: true,
        };
    } else if (action.type === 'players') {
        return {
            players: action.players,
            loading: false,
        };
    } else {
        throw new Error('Unexpected action type')
    }
}

function Players() {
    const location = useLocation();
    const match = useRouteMatch();
    const query = useQuery();
    const [state, dispatch] = React.useReducer(
        playersReducer,
        {players: [], loading: true}
    );

    const fetchPlayers = (teamId) => {
        dispatch({ type: 'fetch' });

        getPlayers(teamId)
            .then((players) => dispatch({type: 'players', players}));
    };

    React.useEffect(() => {
        console.log(location);
        console.log(match);

        const teamId = query.get('teamId');

        teamId
            ? fetchPlayers(teamId)
            : fetchPlayers();
    }, []);

    return (
        <div className='container two-column'>
            <Sidebar
                loading={state.loading}
                title='Players'
                list={state.players.map((player) => player.name)}
                location={location}
                match={match}
            />

            {state.loading === false && location.pathname === '/players'
                ? <div className='sidebar-instruction'>Select a Player</div>
                : null}
        </div>
    );
}

export default Players;