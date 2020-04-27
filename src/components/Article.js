import React from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../api';

function Article({ teamId, articleId, children }) {
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    setArticle(null);
    getArticle(teamId, articleId).then(setArticle);
  }, [teamId, articleId]);

  return children(article);
}

Article.propTypes = {
  teamId: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Article;