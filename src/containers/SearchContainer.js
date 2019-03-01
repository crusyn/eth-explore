import { compose } from "recompose";
import { connect } from "react-redux";
import actions from "../actions";

import { Search } from "../components/";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  search(query) {
    dispatch(actions.search.call(query));
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search);
