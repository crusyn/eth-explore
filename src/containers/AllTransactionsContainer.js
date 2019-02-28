import { compose } from "recompose";
import { connect } from "react-redux";

import { AllTransactions } from "../components/";

const mapStateToProps = state => ({
  transactions: state.transactions
});

const mapDispatchToProps = dispatch => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AllTransactions);
