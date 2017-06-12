# spunky-tracker-client

Ok, our Bark Meter is there. It is ready to show the decibel value and play "Shhh No Barking!" sound on our Raspberry Pi.

First, start with updating decibel value. To do that we need to query our GraphQL server, using Apollo client. So, our component
needs to know about Apollo and the query. 

In `bark-meter-component.ts` import `Apollo` and `graphql-tag`. Apollo is responsible for sending your queries to you GraphQL
server. `gql` template tag will help you to write your queries in GraphQL query language.
 
```
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
``` 

Next, also import `OnInit` interface, we will need it shortly:

```
import { Component, OnInit } from '@angular/core';
```

Ok, now we are ready to execute our query. We need to inject `Apollo` service in our module. We can easily do it in constructor

```
export class BarkMeterComponent {
  constructor(private apollo: Apollo) {}
}
```

I told you we're gonna need `OnInit`. Now it is time. When our component initializes, we want it to get the decibel value and 
update our progress bar. To do that we need a query to execute on GraphQL server:

```
const GetDecibel = gql`
  query GetDecibel {
    microphone {
      decibel
    }
  }
`;
```

We can send this query like this:
 
```
export class BarkMeterComponent implements OnInit{
  
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GetDecibel,
      pollInterval: 10000
    });
  }
}
``` 

Now, if you open your application in your browser, nothing will update. However from your developer tools you can monitor the 
network connections and see what happens there. Since we set the pollInterval to 10 seconds, it will send the request to the 
the server in every 10 seconds. To reflect the updates on our interface, we need to do a couple of things. 

First, we need to subscribe to the observable which is returned by Apollo service. Yes, it returns an observable, so you can
apply operators on it, subscribe and consume. What is an Observable? That is a whole another story which we cannot cover within 
this workshop.

We also need a variable to set the value of the decibel. Easy like this:

```
export class BarkMeterComponent implements OnInit{
  public decibel: number;  
  
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GetDecibel,
      pollInterval: 10000
    });
  }
}
```

and set its value to the one we get from server

```
export class BarkMeterComponent implements OnInit{
  public decibel: number;  
  
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GetDecibel,
      pollInterval: 10000
    }).subscribe(({data}) => {
      this.decibel = data.microphone.decibel;
    });
  }
}
```

Finally, we need to tell our progress bar component to read this value in `bark-meter.component.html`:

```
<md-progress-bar
  [color]="'primary'"
  [mode]="'determinate'"
  [value]="decibel">
</md-progress-bar>
```

Ok, go to `http://localhost:4200` to see your Bark Meter on action!

Awesome, right? Still, we have a missing function. We need to tell Spunky to stop barking. If he ever listen to our voice
coming out of a speaker. Anyhow, let's give it a shot.

This button will play the sound and will also show how many times we played it. Remember the mutation we created in our GraphQL
server? Yes, it is time to use that one. Again we need to create a 'mutation query':

```
const IncreasePlayCount = gql`
  mutation IncreaseNoBarkingCount($playType: String!) {
    countPlay(playType: $playType) {
      value
    }
  }
`;
```

We will pass which play count to increase to this query and it will return the updated value. Again we ne need a variable to
set this value:

```
export class BarkMeterComponent implements OnInit{
  public decibel: number;  
  public playCount: number = 0;
  
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GetDecibel,
      pollInterval: 10000
    }).subscribe(({data}) => {
      this.decibel = data.microphone.decibel;
    });
  }
}
```

Like normal queries we need to use Apollo service to execute it on our server. This time we will create a function to call
Apollo service. Because, this function should be triggered by our button:

```
export class BarkMeterComponent implements OnInit{
  public decibel: number;
  public playCount: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GetDecibel,
      pollInterval: 10000
    }).subscribe(({data}) => {
      this.decibel = data.microphone.decibel;
    });
  }

  increaseCount() {
    this.apollo.mutate<any>({
      mutation: IncreasePlayCount,
      variables: {
        playType: 'noBarking'
      }
    }).subscribe(({ data }) => {
      this.playCount = data.countPlay.value;
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
```

Now, bind this function to our button in our html file, and also add an element to show the count:

```
<md-card>
  <md-card-title>Bark Meter</md-card-title>
  <md-card-content>
      <md-progress-bar
        [color]="'primary'"
        [mode]="'determinate'"
        [value]="decibel">
      </md-progress-bar>
  </md-card-content>
  <md-card-actions>
    <button
      md-raised-button
      [color]="'primary'"
      (click)="increaseCount()">Sssh! No Barking!</button>
    <span><strong>Played {{playCount}} many times!</strong></span>
  </md-card-actions>
</md-card>
```

So, on click event we will fire our `increaseCount` function and it will update our playCount value. Refresh your page and give
it a try.

Our Bark Meter is complete! You learned:

* How to create a component
* How to execute a GraphQL a query and a mutation from your component
* How to update your interface with that values

In the light of the steps that we completed, now you will try to create Location Meter component and complete our application.

Location Meter should:

* Query the location part of our schema
* Display the location change in an interface (It is up to you to decide how to show it. Be creative. You can use available
material components shown [here](https://material.angular.io/components). Don't forget to import new material components in
your `app.module.ts`)
* Show and update goToBed sound count
 
In trouble: `git checkout location-meter`
