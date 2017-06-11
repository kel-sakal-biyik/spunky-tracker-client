# spunky-tracker-client

Our bootstrap app is up an running. Now we need to connect our app to our GraphQL server. 

To do that first we need to install Apollo Client:

`npm install apollo-client apollo-angular graphql-tag --save`

Ok, it is installed. Now, we need to introduce Apollo Client to our app. In `app.module.ts` you need to import Apollo Client
and create an network interface to configure it. Like this:

```
import { ApolloClient, createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://my-api.grapql.com'
  })
});
```
`uri` doesn't look correct. Do you remember on which port was our GraphQL server running?

I do! Replace the `uri` with `http://localhost:3000`

Finally, we connected our app with our GraphQL server. From now on whenever we use a GraphQL query it will send the request 
to `http://localhost:3000`.


