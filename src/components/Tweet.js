import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {
  TiArrowBackOutline,
  TiHeartFullOutline,
  TiHeartOutline,
} from "react-icons/ti";

import { formatTweet, formatDate } from "../utils/helpers";
import { handleToggleTweet } from "../actions/tweets";

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault();

    // todo: handle like Tweet
    const { dispatch, tweet, authedUser } = this.props;
    const { id, hasLiked } = tweet;
    dispatch(handleToggleTweet({ id, hasLiked, authedUser }));
  };

  toParent = (e, parent) => {
    e.preventDefault();

    debugger;
    // Redirect to parent Tweet.
    this.props.history.push(`/tweet/${parent.id}`);
  };

  render() {
    const { tweet } = this.props;

    if (tweet === null) {
      return <p>This Tweet doesn't existed</p>;
    }

    const {
      id,
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent,
    } = tweet;

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, parent)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ users, tweets, authedUser }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(Tweet));
