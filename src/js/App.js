import React from "react";
import Box from "./components/Box.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <header className="header">App Header</header>
        <section className="body">
          <h1 className="title">
            Hello and Welcome, React-Redux-Sass Starter kit is successfully
            build and your kit is ready to use
          </h1>
          <Box text="Info text" />
        </section>
        <footer className="header">App Footer</footer>
      </React.Fragment>
    );
  }
}
