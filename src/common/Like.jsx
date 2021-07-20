import React, { Component } from 'react';

class Like extends Component {
  render() {
    let like = 'fa-heart';

    if (!this.props.like) like += '-o';
    return (
      <i
        onClick={this.props.onClick}
        className={`fa ${like} liked-heart`}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
