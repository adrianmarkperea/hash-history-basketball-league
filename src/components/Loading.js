import React from 'react';
import PropTypes from 'prop-types';

function Loading({ text = 'Loading' }) {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const stopper = `${text}...`;
    const id = window.setInterval(() => setContent((content) => (
      content === stopper
        ? text
        : `${content}.`
    )), 300);

    return () => window.clearInterval(id);
  }, [text]);

  return (
    <div className='containter'>
      <p className='text-center'>
        {content}
      </p>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string
}

export default Loading;
