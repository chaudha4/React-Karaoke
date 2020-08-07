
import React from "react";
import { Link } from 'react-router-dom'

/* Using Link on sidenav to link to React components on the main panel */

export default function Sidenav({ artists }) {

  return (

      <div className="sidenav">
        <h2>Singers</h2>
        {artists.map(artist => (
          <li key={artist}>
            <Link to={artist}>
              <small>{artist}</small>
            </Link>
          </li>
        ))}
        <Link to="/Add">
          <div className="adduser">
          <small>Add New User</small>
          </div>
        </Link>
      </div>

   

  );

}