import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Loading from './views/Loading';
import Artist from './views/Artist';
import { fetchArtistsController} from './controllers/AppController';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sidenav from './views/Sidenav';
import Admin from './views/Admin';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  console.log("Running in %s mode", process.env.NODE_ENV);
  if (process.env.REACT_APP_AWS === "DNU") {
    console.log("Not using AWS Bucket - Using Fake data locally");
  }
  console.log("AWS S3 Bucket Name in %s mode", process.env.REACT_APP_BUCKETNAME);
  console.log("AWS S3 Bucket url ", process.env.REACT_APP_BASE_URL);
  console.log("AWS S3 Bucket token", process.env.REACT_APP_ID);

  useEffect(() => {
    fetchArtistsController((a) => {
      setArtists(a);
      setLoading(false);
    });;
  }, []);  // Or [someId] if effect needs props or state

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
                  <Route path={"/" + artist.slice(0, -1)} key={artist}>
                    <Artist name={artist} key={artist} />
                  </Route>
                ))}

                <Route path="/Add">
                  <Admin artists={artists} />
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
