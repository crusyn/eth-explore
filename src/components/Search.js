import React from "react";
import TextField from "@material-ui/core/TextField";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(event);
    console.log("Query Submitted: " + this.state.value);
    event.preventDefault();
  }

  //working with controlled components and submitting: https://reactjs.org/docs/forms.html

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          placeholder="search for an ethereum address to show account and transaction details"
          autoFocus={true}
          fullWidth={true}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Search;
