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
      console.log(this.props.match.params.address);
      this.props.getTransactions(this.props.match.params.address); //TODO: this will come from the URL
      //"0x81de1bcab4422a87440e2dd7c56d272ccf1019ac"
    }
  })
)(AllTransactions);
