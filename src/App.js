import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Loading from './views/Loading';
import Artist from './views/Artist';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Sidenav from './views/Sidenav';
import Admin from './views/Admin';
import * as model from './models/ArtistModel';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  console.log("Running in %s mode", process.env.NODE_ENV);
  console.log("Running with %s model", process.env.MODEL);


  useEffect( () => {
    fetchData();
  }, []);  // Or [someId] if effect needs props or state

  // Callback function to fetch artists again.
  function refreshArtists() {
    fetchData();
  };

  async function fetchData() {
    setArtists(await model.fetchArtists());
    setLoading(false);
  };


  const renderMe = (e) => {
    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div className="container">
        <h1 className="title">Dusnumbaries Karaoke</h1>
        <div className="navcontainer">
          <Router>
            <Sidenav artists={artists} />

            <div className="main">
              <Switch>
                {artists.map(artist => (
                  <Route path={"/" + artist} key={`path-${artist}`}>
                    <Artist name={artist} key={`artist-${artist}`}
                      refresh={refreshArtists} />
                  </Route>
                ))}

                <Route path="/Add">
                  <Admin artists={artists} refresh={refreshArtists} />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }

  return renderMe();
};


export default App;
