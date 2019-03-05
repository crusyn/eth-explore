import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "../actions";

import { AllTransactions } from "../components/";

const mapStateToProps = state => ({
  transactions: state.transactions
});

const mapDispatchToProps = dispatch => ({
  getTransactions(address) {
    dispatch(actions.getTransactions.call(address));
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.getTransactions(this.props.match.params.address);
    },
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.props.getTransactions(this.props.match.params.address);
      }
    }
  })
)(AllTransactions);
