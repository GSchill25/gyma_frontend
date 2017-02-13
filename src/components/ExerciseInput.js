import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import Select from 'react-select';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: 'ADD_EXERCISE', payload })
});

const options = [
  { value: 'Lift', label: 'Lift' },
  { value: 'Run', label: 'Run' },
  { value: 'Warmup', label: 'Warmup' },
  { value: 'Stretch', label: 'Stretch' },
  { value: 'Other', label: 'Other' }
];

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

    this.setName = ev => {
      this.setState({ name: ev.target.value });
    };

    this.onSelectChangeType = ev => {
      const $srFields = document.querySelectorAll(".sr-field");
      const type = ev.value;
      for (var f of $srFields) {
        if(type == "Lift") {
          f.style.visibility = "visible";
        } else {
          f.style.visibility = "hidden";
        }
      }
      this.setState({ etype: type });
    }

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
      <div className="ui segment exercise-form">
        <h2 className="ui center aligned icon">
          Add Exercise&nbsp;
          <i className="circular angle double right icon"></i>
        </h2>
        <form className="ui form" onSubmit={this.createExercise}>
            <fieldset className="field">
              <Select 
                options={options} 
                onChange={this.onSelectChangeType} 
                value={this.state.etype}
                placeholder="Exercise Type.." />
            </fieldset>

            <fieldset className="field">
              <input
                type="text"
                placeholder="Exercise Name"
                value={this.state.name}
                onChange={this.setName} />
            </fieldset>

            <fieldset className="field sr-field">
              <input
                type="text"
                placeholder="Sets"
                value={this.state.sets}
                onChange={this.setSets} />
            </fieldset>

            <fieldset className="field sr-field">
              <input
                type="text"
                placeholder="Reps"
                value={this.state.reps}
                onChange={this.setReps} />
            </fieldset>

            <textarea className="field"
              placeholder="Write a description..."
              value={this.state.description}
              onChange={this.setDescription}
              rows="3">
            </textarea>
            <div className="exercise-btn">
              <button type="submit" className="ui blue basic button"><i className="med add square icon"></i>Complete</button>
            </div>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(ExerciseInput);
