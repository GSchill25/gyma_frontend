import DeleteButton from './DeleteButton';
import { Link } from 'react-router';
import React from 'react';

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div className="comment">
      <a className="avatar">
        <img src={comment.author.image} />
      </a>
      <div className="content">
        <Link
          to={`@${comment.author.username}`}
          className="author">
          {comment.author.username}
        </Link>
        &nbsp;
        <div className="metadata">
          <span className="date">{new Date(comment.createdAt).toDateString()}</span>
        </div>
        &nbsp;
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
        <div className="text">
          {comment.body}
        </div>
      </div>
    </div>
  );
};

export default Comment;
