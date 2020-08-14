import React, { useState, useEffect } from "react";
import "./App.css";
import Loading from "./views/Loading";
import Artist from "./views/Artist";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidenav from "./views/Sidenav";
import AddUser from "./views/AddUser";
import * as model from "./models/ArtistModel";
import Discuss from "./views/Discuss";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  console.log("Running in %s mode", process.env.NODE_ENV);
  console.log("Running with %s model", process.env.REACT_APP_MODEL);
  console.log("URL is %s", window.location.href);
  console.log("Hostname is %s", window.location.hostname);
  console.log("Pathname is %s", window.location.pathname);

  useEffect(() => {
    fetchData();
  }, []); // Or [someId] if effect needs props or state

  // Callback function to fetch artists again.
  function refreshArtists() {
    fetchData();
  }

  async function fetchData() {
    setArtists(await model.fetchArtists());
    setLoading(false);
  }

  const renderMe = (e) => {
    if (loading) {
      return <Loading />;
    }

    return (
      <div className="container">
        <h1 className="title">Dusnumbaries Karaoke</h1>
        <div className="navcontainer">
          <Router>
            <Sidenav artists={artists} />

            <div className="rightcontainer">
              <Switch>
                {artists.map((artist) => (
                  <Route path={"/" + artist} key={`path-${artist}`}>
                    <Artist
                      name={artist}
                      key={`artist-${artist}`}
                      refresh={refreshArtists}
                    />
                  </Route>
                ))}

                <Route path="/Add">
                  <AddUser artists={artists} refresh={refreshArtists} />
                </Route>
              </Switch>
            </div>

            <Discuss />
          </Router>
        </div>

        <div className="debug">
          Mode: {process.env.NODE_ENV} <br />
          Using {process.env.REACT_APP_MODEL} for storage <br />
        </div>
      </div>
    );
  };

  return renderMe();
};

export default App;
