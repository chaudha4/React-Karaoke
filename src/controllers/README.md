# Controller Components

A “controller component” knows a lot about the rest of the world. It knows how to access and update “domain data” (application state) and how to choose and execute “domain logic”. For instance, a controller component may know how to query and mutate data via a RESTful API or read/update objects stored in React Context. Generally, controllers are aware of context, side effects, and domains (application state and behavior).