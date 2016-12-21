import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onClick: (payload, id, type) =>
    dispatch({ type: type, payload, id })
});

const DeleteButton = props => {
  const del = () => {
    if(props.commentId) {
      var payload = agent.Comments.delete(props.slug, props.commentId);
      var id = props.commentId
      var type = 'DELETE_COMMENT'
    } else if(props.exerciseId) {
      var payload = agent.Exercises.delete(props.slug, props.exerciseId);
      var id = props.exerciseId
      var type = 'DELETE_EXERCISE'
    }
    props.onClick(payload, id, type);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
