
import React from "react";
import { Link } from 'react-router-dom'

/* Using Link on sidenav to link to React components on the main panel */

export default function Sidenav({ artists }) {

  return (
    <div>
      <div className="sidenav">
        <h2>Singers</h2>
        {artists.map(artist => (
          <li key={artist}>
            <Link to={artist}>
              <small>{artist}</small>
            </Link>
          </li>
        ))}
      </div>
      <div className="sidenav">

          <Link to="/Add">
            <small>Add New User</small>
          </Link>

      </div>
    </div>

  );

}