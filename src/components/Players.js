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
        const teamId = query.get('teamId');

        teamId
            ? fetchPlayers(teamId)
            : fetchPlayers();
    }, [query]);

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

            <Route path={`${match.url}/:playerId`} render={({ match }) => {
                if (state.loading === true) {
                    return null;
                }

                const {
                    name, position, teamId, number, avatar, apg, ppg, rpg, spg,
                } = state.players.find((player) => slug(player.name) === match.params.playerId);
                
                return (
                    <div className='panel'>
                        <img className='avatar' src={avatar} alt={`${name}'s avatar`} />
                        <h1 className='medium-header'>{name}</h1>
                        <h3 className='header'>#{number}</h3>
                        <div className='row'>
                            <ul className='info-list' style={{marginRight: 80}}>
                                <li>Team
                                    <div>
                                        <Link style={{color: '#68809a'}} to={`/${teamId}`}>
                                            {teamId[0].toUpperCase() + teamId.slice(1)}
                                        </Link>
                                    </div>
                                </li>    
                                <li>Position<div>{position}</div></li>
                                <li>PPG<div>{ppg}</div></li>
                            </ul> 
                            <ul className='info-list'>
                                <li>APG<div>{apg}</div></li>
                                <li>SPG<div>{spg}</div></li>
                                <li>RPG<div>{rpg}</div></li>
                            </ul>
                        </div>
                    </div>
                )
            }}/>
        </div>
    );
}

export default Players;