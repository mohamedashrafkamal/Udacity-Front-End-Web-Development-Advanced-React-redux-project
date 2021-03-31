import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { handleAddTweet } from "../actions/tweets";

class NewTweet extends Component {
  state = {
    text: "",
    toHome: false,
  };

  handleChange = (e) => {
    const text = e.target.value;

    this.setState(() => ({
      text,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch, replyingTo } = this.props;

    // todo: Add Tweet to store
    dispatch(handleAddTweet({ text, replyingTo }));

    this.setState(() => ({
      text: "",
      toHome: replyingTo ? false : true,
    }));
  };
  render() {
    const { text, toHome } = this.state;
    const tweetLettersLeft = 280 - text.length;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">New Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            className="textarea"
            placeholder="What's happening"
            value={text}
            onChange={this.handleChange}
            maxLength={280}
          />
          {tweetLettersLeft <= 100 && (
            <div className="tweet-length">{tweetLettersLeft}</div>
          )}
          <button className="btn" type="submit" disabled={text.trim() === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
