import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Toolbar,
  Button
} from "@material-ui/core";
import ChatRoom from "./chatRoom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Navigation({ nickname, logout, messages, connection }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sendFamilyMessage = message => {
    sendMessage("family", message);
  };

  const sendFriendsMessage = message => {
    sendMessage("friends", message);
  };

  const sendWorkMessage = message => {
    sendMessage("work", message);
  };

  const sendMessage = (type, message) => {
    const types = {
      family: "sendFamilyMessage",
      friends: "sendFriendsMessage",
      work: "sendWorkMessage"
    };
    connection.invoke(types[type], "Finovation", nickname, message);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Family" {...a11yProps(0)} />
            <Tab label="Friends" {...a11yProps(1)} />
            <Tab label="Work" {...a11yProps(2)} />
          </Tabs>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ChatRoom
          roomName="Family"
          nickname={nickname}
          sendMessage={sendFamilyMessage}
          messages={messages.family}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChatRoom
          roomName="Friends"
          nickname={nickname}
          sendMessage={sendFriendsMessage}
          messages={messages.friends}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChatRoom
          roomName="Work"
          nickname={nickname}
          sendMessage={sendWorkMessage}
          messages={messages.work}
        />
      </TabPanel>
    </div>
  );
}
