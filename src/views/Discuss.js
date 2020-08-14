import React from"react";
import Disqus from "disqus-react";

export default function Discuss() {

  const url = window.location.href;
  const disqusShortname = "dusnumbaries-karaoke";
  const disqusConfig = {
    url: url,
    identifier: "Comments",
    title: "Dusnumbaries Karaoke",
  };

  console.log(disqusConfig);

  return (
    <div className="sidenav">
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}
