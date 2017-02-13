import React from 'react';
import agent from '../../agent';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <span>
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              props.onClickTag(tag, agent.Workouts.byTag(tag));
            };

            return (
              <button
                className="ui teal basic button"
                onClick={handleClick}
                key={tag}>
                  {tag}
              </button>    
            );
          })
        }
      </span>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};

export default Tags;
