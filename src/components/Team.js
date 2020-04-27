import React from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../api';

function Team({ id, children }) {
  const [team, setTeam] = React.useState(null);

  const fetchTeam = (id) => {
    setTeam(null);

    getTeam(id)
      .then(setTeam);
  }

  React.useEffect(() => fetchTeam(id), [id]);

  return children(team);
}

Team.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Team;