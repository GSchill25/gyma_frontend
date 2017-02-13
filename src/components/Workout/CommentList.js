import Comment from './Comment';
import React from 'react';

const CommentList = props => {
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {
        props.comments.map(comment => {
          return (
            <Comment
              comment={comment}
              currentUser={props.currentUser}
              slug={props.slug}
              key={comment.id} />
          );
        })
      }
    </div>
  );
};

export default CommentList;
