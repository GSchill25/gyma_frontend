'use strict';

import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: 'ADD_TAG' }),
  onLoad: payload =>
    dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onRemoveTag: tag =>
    dispatch({ type: 'REMOVE_TAG', tag }),
  onSubmit: payload =>
    dispatch({ type: 'WORKOUT_SUBMITTED', payload }),
  onUnload: payload =>
    dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeSubtitle = updateFieldEvent('subtitle');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const workout = {
        title: this.props.title,
        subtitle: this.props.subtitle,
        tagList: this.props.tagList
      };

      const slug = { slug: this.props.workoutSlug };
      const promise = this.props.workoutSlug ?
        agent.Workouts.update(Object.assign(workout, slug)) :
        agent.Workouts.create(workout);

      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug) {
      if (nextProps.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Workouts.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Workouts.get(this.props.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form className="ui form">

                  <div className="field">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Workout Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </div>

                  <div className="field">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this workout about?"
                      value={this.props.subtitle}
                      onChange={this.changeSubtitle} />
                  </div>

                  <div className="field">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <div className="tag-list">
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className="ui label" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              &nbsp;{tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </div>

                  <button
                    className="ui button teal"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Workout
                  </button>

                
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
