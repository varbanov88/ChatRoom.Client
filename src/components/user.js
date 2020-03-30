import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

export default function User({ setUser }) {
  const classes = useStyles();
  const [nickname, setnickname] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (nickname.length < 2) {
      setError("nickname should be at least 2 symbols");
    } else {
      setError(null);
      setUser(nickname);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <TextField
            value={nickname}
            onChange={event => setnickname(event.target.value)}
            label="nickname"
          />
        </div>
        <br />
        <div>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Enter
          </Button>
        </div>
      </form>
    </div>
  );
}
