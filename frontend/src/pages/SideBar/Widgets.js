import React from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTweetEmbed, TwitterTimelineEmbed } from "react-twitter-embed";
const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets_input">
        <SearchIcon className="widget_searchIcon" />
        <input className="text" placeholder="search Twitter" />
      </div>
      <div className="widgets_widgetsContainer">
        <h2>whats happening</h2>
      </div>
      <TwitterTweetEmbed tweetId={"933354946111705097"} />
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 400 }}
      />
    </div>
  );
};

export default Widgets;
