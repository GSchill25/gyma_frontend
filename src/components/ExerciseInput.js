import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: 'ADD_EXERCISE', payload })
});

class ExerciseInput extends React.Component {
  constructor() {
    super();
    this.state = {
      etype: '',
      name: '',
      sets: '',
      reps: '',
      description: ''
    };

    this.setType = ev => {
      this.setState({ etype: ev.target.value });
    };

    this.setName = ev => {
      this.setState({ name: ev.target.value });
    };

    this.setSets = ev => {
      this.setState({ sets: ev.target.value });
    };

    this.setReps = ev => {
      this.setState({ reps: ev.target.value });
    };

    this.setDescription = ev => {
      this.setState({ description: ev.target.value });
    };

    this.createExercise = ev => {
      ev.preventDefault();
      const payload = agent.Exercises.create(this.props.slug,
        { 
          etype: this.state.etype,
          name: this.state.name,
          sets: this.state.sets,
          reps: this.state.reps,
          description: this.state.description
        });
      this.setState({ etype: '' });
      this.setState({ name: '' });
      this.setState({ sets: '' });
      this.setState({ reps: '' });
      this.setState({ description: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createExercise}>
        <div className="card-block">
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Type"
              value={this.state.etype}
              onChange={this.setType} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Exercise Name"
              value={this.state.name}
              onChange={this.setName} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Sets"
              value={this.state.sets}
              onChange={this.setSets} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Reps"
              value={this.state.reps}
              onChange={this.setReps} />
          </fieldset>

          <textarea className="form-control"
            placeholder="Write a description..."
            value={this.state.description}
            onChange={this.setDescription}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Add Exercise
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(ExerciseInput);
