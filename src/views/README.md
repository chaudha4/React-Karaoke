# View Components

A view component shouldn’t know anything about application state (reading or writing), network protocols, or non-UI providers farther up the chain. Views shouldn’t know what protocol you use to speak to a backend or the format that data takes. Views shouldn’t know about your custom state contexts and providers for sharing domain data (application state).