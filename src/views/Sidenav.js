
import React from "react";
import {Link} from 'react-router-dom'

/* Using Link on sidenav to link to React components on the main panel */

export default function Sidenav({artists}) {

    return (

        <div className="sidenav">
          <h2>Singers</h2>
          
          {artists.map(artist => (
            <li key={artist}>
              <Link to={artist.slice(0,-1)}>
                <small>{artist.slice(0,-1)}</small>
              </Link>
            </li>
          ))}

          <h2>Admin</h2>
            <li>
                <Link to="/Add">
                    <small>Add New User</small>
                </Link>
            </li>         
        </div>


    );

}