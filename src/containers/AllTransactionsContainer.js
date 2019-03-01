import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.getTransactions(this.props.match.params.address);
    }
  })
)(AllTransactions);
