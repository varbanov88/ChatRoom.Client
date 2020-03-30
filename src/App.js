import React, { Fragment, Component } from "react";
import * as signalR from "@aspnet/signalr";
import User from "./components/user";
import Navigation from "./components/navigation";
import "./App.css";

const defaultMessages = {
  family: [],
  friends: [],
  work: []
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem("user"),
      messages: defaultMessages,
      connection: null
    };
  }

  componentDidMount = () => {
    const handleMessageReceived = (type, data) => {
      const { id, nickname, text } = data;
      const message = {
        id,
        nickname,
        messageText: text
      };

      const msgs = {
        ...this.state.messages,
        [type]: [...this.state.messages[type], message]
      };
      this.setState({ ...this.state, messages: msgs });
    };

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44371/chat")
      .build();
    this.setState({ connection }, () => {
      this.state.connection
        .start()
        .then(() => connection.invoke("AddToGroup", "Finovation"))
        .catch(err => console.log("Error connecting SignalR - " + err));
    });

    connection.on("receiveFamilyMessage", data =>
      handleMessageReceived("family", data)
    );

    connection.on("receiveFriendsMessage", data =>
      handleMessageReceived("friends", data)
    );

    connection.on("receiveWorkMessage", data =>
      handleMessageReceived("work", data)
    );
  };

  handleSetUser = user => {
    this.setState({ user: user });
    localStorage.setItem("user", user);
  };

  handleLogout = () => {
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  render() {
    return (
      <Fragment>
        {this.state.user ? (
          <Navigation
            logout={this.handleLogout}
            nickname={this.state.user}
            messages={this.state.messages}
            connection={this.state.connection}
          />
        ) : (
          <User setUser={this.handleSetUser} />
        )}
      </Fragment>
    );
  }
}

export default App;
