import React from 'react';
import { Link, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import { getTeamsArticles, getTeamNames } from '../api';
import TeamLogo from './TeamLogo';
import Team from './Team';
import slug from 'slug';
import Loading from './Loading';

function teamsPageReducer(state, action) {
  if (action.type === 'fetch') {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === 'done') {
    return {
      articles: action.articles,
      teamNames: action.teamNames,
      loading: false,
    };
  } else {
    throw new Error(`Action ${action.type} is not supported.`)
  }
}

function TeamPage() {
  const { url } = useRouteMatch();
  const { teamId } = useParams();
  const [state, dispatch] = React.useReducer(
    teamsPageReducer,
    { articles: [], loading: true }
  );

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    Promise.all([
      getTeamNames(),
      getTeamsArticles(teamId)
    ]).then(([teamNames, articles]) => dispatch({
      type: 'done',
      teamNames,
      articles,
    }));

  }, [teamId]);

  const { loading, articles, teamNames } = state;

  if (
    loading === false &&
    teamNames.includes(teamId) === false
  ) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <Team id={teamId}>
        {(team) => team === null
          ? <Loading text='Loading Team' />
          : <div className='panel'>
              <TeamLogo id={teamId} />     
              <h1 className='medium-header'>{team.name}</h1>
              <h4 style={{margin: '5px'}}>
                <Link
                  style={{cursor: 'pointer'}} 
                  to={{pathname: '/players', search: `?teamId=${teamId}`}}
                >
                  View Roster
                </Link>
              </h4>
              <ul className='championships'>
                {team.championships.map((ship) => <li key={ship}>{ship}</li> )}
              </ul>
              <ul className='info-list row' style={{width: '100%'}}>
                <li>Established<div>{team.established}</div></li> 
                <li>Manager<div>{team.manager}</div></li> 
                <li>Coach<div>{team.coach}</div></li> 
                <li>Record<div>{team.wins}-{team.losses}</div></li> 
              </ul>
              <h2 className='header'>
                Articles
              </h2>
              <ul className='articles'>
                {articles.map((article) => (
                  <li key={article.id}>
                    <Link to={`${url}/articles/${slug(article.title)}`}>
                      <h4 className='article-title'>{article.title}</h4>
                      <div className='article-date'>{article.date.toLocaleDateString()}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
        }
      </Team>
    </div>
  );
}

export default TeamPage;