import React from 'react';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';
import { Route, Link, useLocation, useRouteMatch } from 'react-router-dom';
import Team from './Team';
import TeamLogo from './TeamLogo';

function teamsReducer(state, action) {
    if (action.type === 'fetch') {
        return {
            ...state,
            loading: true,
        };
    } else if (action.type === 'teamNames') {
        return {
            teamNames: action.teamNames,
            loading: false,
        };
    } else {
        throw new Error(`Action ${action.type} is not supported`)
    }
}

function Teams() {
    const location = useLocation();
    const match = useRouteMatch();

    const [state, dispatch] = React.useReducer(
        teamsReducer,
        { teamNames: [], loading: true }
    );

    React.useEffect(() => {
        dispatch({ type: 'fetch' });

        getTeamNames()
            .then((teamNames) => dispatch({ type: 'teamNames', teamNames }));
    }, []);

    const { loading, teamNames } = state;

    return (
        <div className='container two-column'>
            <Sidebar
                loading={loading}
                title='Teams'
                list={teamNames}
                location={location}
                match={match}
            />

            {loading === false && location.pathname === '/teams'
                ? <div className='sidebar-instruction'>Please select a team</div>
                : null}

            <Route path={`${match.url}/:teamId`} render={({ match }) => (
                <div className='panel'>
                    <Team id={match.params.teamId}>
                        {(team) => team === null
                            ? <h1>LOADING</h1>
                            : <div style={{width: '100%'}}>
                                <TeamLogo id={team.id} className='center' />
                                <h1 className='medium-header'>{team.name}</h1>
                                <ul className='info-list row'>
                                    <li>Established<div>{team.established}</div></li>
                                    <li>Manager<div>{team.manager}</div></li>
                                    <li>Coach<div>{team.coach}</div></li>
                                </ul>
                                <Link
                                    className='center btn-main' 
                                    to={`/${match.params.teamId}`}
                                >
                                    {team.name} Team Page
                                </Link>
                              </div>}
                    </Team>
                </div>
            )} />
        </div>
    );
}

export default Teams;