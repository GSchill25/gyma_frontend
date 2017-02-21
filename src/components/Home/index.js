import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, payload) =>
    dispatch({ type: 'APPLY_TAG_FILTER', tag, payload }),
  onLoad: (tab, payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
  onUnload: () =>
    dispatch({  type: 'HOME_PAGE_UNLOADED' })
});

class Home extends React.Component {
  componentWillMount() {
    //const tab = this.props.token ? 'feed' : 'all';
    //const workoutsPromise = this.props.token ? agent.Workouts.feed() : agent.Workouts.all();
    const tab = 'all';
    const workoutsPromise = agent.Workouts.all();

    this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), workoutsPromise]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
          <div className="ui items">
            <Tags
              tags={this.props.tags}
              onClickTag={this.props.onClickTag} />

          </div>
          <div>
            <MainView />       
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
