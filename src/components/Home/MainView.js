import WorkoutList from '../WorkoutList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Workouts.feed());
    }

    return (
      <div className="item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </div>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Workouts.all());
  };
  return (
    <div className="item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </div>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <div className="item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.workoutList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: 'CHANGE_TAB', tab, payload })
});

const MainView = props => {
  return (
    <div>
      <div className="sixteen wide column">
        <div className="ui top attached tabular menu">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </div>
      </div>

      <WorkoutList
        workouts={props.workouts}
        loading={props.loading}
        workoutsCount={props.workoutsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
