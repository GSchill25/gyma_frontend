import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: 'SET_PAGE', page, payload })
});

const ListPagination = props => {
  if (props.workoutsCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.workoutsCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => props.onSetPage(page, agent.Workouts.all(page));

  return (
    <nav>
      <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href="">{v + 1}</a>

              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
