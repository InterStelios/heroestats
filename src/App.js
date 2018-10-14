import React, { Component } from "react";
import "../node_modules/bulma/css/bulma.css";

class App extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { stats: props.stats };
  }

  tableHeader = (headers = []) => {
    return (
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  tableBody = (stats = []) => (
    <tbody>
      {stats.map(stat => (
        <tr key={stat.id}>
          {Object.keys(stat).map(key => (
            <td key={key}>{stat[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
  render() {
    const { stats } = this.state;
    if (!stats) {
      return <div>loading</div>;
    }

    const headers = Object.keys(stats[0]);

    return (
      <div className="App">
        <table className="table">
          {this.tableHeader(headers)}
          {this.tableBody(stats)}
        </table>
      </div>
    );
  }
}

export default App;
