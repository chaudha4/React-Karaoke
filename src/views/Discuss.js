import React from"react";
import Disqus from "disqus-react";

export default function Discuss() {
  const disqusShortname = "dusnumbaries-karaoke";
  const disqusConfig = {
    url: "{process.env.URL ? process.env.URL : http://localhost:3000}",
    identifier: "Comments",
    title: "Dusnumbaries Karaoke",
  };

  return (
    <div>
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}
