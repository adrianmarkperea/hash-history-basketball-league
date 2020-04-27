import React from 'react';
import { Route, useParams, useRouteMatch, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getTeamsArticles } from '../api';
import Article from './Article';
import Loading from './Loading';

function articlesReducer(state, action) {
  if (action.type === 'fetch') {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === 'articles') {
    return {
      articles: action.articles,
      loading: false,
    };
  } else {
    throw new Error(`Action ${action.type} is not supported.`)
  }
}


function Articles() {
  const location = useLocation();
  const match = useRouteMatch();
  const { teamId } = useParams();

  const [state, dispatch] = React.useReducer(
    articlesReducer,
    { articles: [], loading: true }
  );

  React.useEffect(() => {
    dispatch({ type: 'fetch' });

    getTeamsArticles(teamId)
      .then((articles) => dispatch({
        type: 'articles',
        articles: articles.map((article) => article.title),
      }));
  }, [teamId]);

  const {loading, articles} = state;

  return loading === true
    ? <Loading text='Loading Articles' />
    : <div className='container two-column'>
        <Sidebar
          loading={loading}
          title='Articles'
          list={articles}
          location={location}
          match={match}
        />

        <Route path={`${match.url}/:articleId`} render={({ match }) => (
          <Article articleId={match.params.articleId} teamId={teamId}>
            {(article) => !article ? <Loading text='Loading Content' /> : (
              <article className='article' key={article.id}>
                <h1 className='header'>{article.title}</h1>
                <p>{article.body}</p>
              </article>
            )}
          </Article>
        )}/>
      </div>
}

export default Articles;