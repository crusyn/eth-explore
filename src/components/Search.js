import React from "react";
import TextField from "@material-ui/core/TextField";

const Search = ({ search }) => {
  return (
    <div>
      <TextField
        placeholder="search for an ethereum address to show account and transaction details"
        autoFocus={true}
        fullWidth={true}
        onChange={search}
      />
    </div>
  );
};

export default Search;
