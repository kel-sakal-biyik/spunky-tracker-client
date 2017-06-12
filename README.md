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

I do! Replace the `uri` with `http://localhost:3000/raspberry-api`. Our Apollo client knows where to request the queries now.

Next, you need to provide this client to Apollo module. To make our code AOT compatible you need to create a
function that return your client. Like:
 
 ```
export function provideClient(): ApolloClient {
  return client;
}
```

Finally, import Apollo module in our app module to make it available for our components.

Note: Don't forget to import `ApolloModule`! 

```
@NgModule({
  declarations: [
    AppComponent,
    ApolloModule.forRoot(provideClient)
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We connected our app with our GraphQL server. From now on whenever we use a GraphQL query it will send the request 
to `http://localhost:3000/raspberry-api`.

_Stuck? Go to solution branch: `git checkout apollo-setup`_


