import React from "react";

export class Emoji extends React.Component {
  render() {
    return (
      <span
        className="emoji"
        role="img"
        aria-label={this.props.label ? this.props.label : ""}
        aria-hidden={this.props.label ? "false" : "true"}
      >
        {this.props.symbol}
      </span>
    );
  }
}
