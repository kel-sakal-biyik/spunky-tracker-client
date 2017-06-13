# spunky-tracker-client

We are ready to create our first component. It will be our bark meter component. It will get decibel data from our GraphQL 
server and show it. We can also play pre-recorded "Shhh, no barking!" sound on our Raspbery Pi at home.

Let's start with creating it. 

`ng generate component BarkMeter -m app.module.ts`

This helper will generate our component files (according to the best practices) and will declare our component
in our AppModule.

It would be really nice if we had a good progress bar to visualise how hard the barking is...

Luckily we have Angular Material 2! A good reusable component library which we will gonna use. First we need to 
install.
 
`npm install --save @angular/material`
 
Now we can use some of those components to make our application look less crappy. Let's start with `app.component.html`
 
Delete the bootstrap HTML and create the basic layout of our application.
  
```
<md-toolbar [color]="'primary'">
  <span>Spunky Tracker</span>
</md-toolbar>
<md-grid-list [cols]="1" [rowHeight]="'200px'" [gutterSize]="20">
  <md-grid-tile [colspan]="1" [rowspan]="1">
    <app-bark-meter></app-bark-meter>
  </md-grid-tile>
</md-grid-list>
```

Here we used toolbar and grid list from material library. We need to import them to be able to use them. In `app.module.ts`
import: 

```
import {
  MdToolbarModule,
  MdGridListModule
} from '@angular/material';
```

and put those module in modules import list:

```
@NgModule({
  declarations: [
    AppComponent,
    BarkMeterComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule.forRoot(provideClient),
    MdToolbarModule,
    MdGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Noticed that `<app-bark-meter></app-bark-meter>` ? Where does it come from? Remember we created our component with 
`ng generate` ? There. It also creates the selector for our component prefixed with `app`. So, whatever we put in 
`bark-meter.component.html` will appear there. So let's create our Bark Meter.

```
<md-card>
  <md-card-title>Bark Meter</md-card-title>
  <md-card-content>
      <md-progress-bar
        [color]="'primary'"
        [mode]="'determinate'"
        [value]="80">
      </md-progress-bar>
  </md-card-content>
  <md-card-actions>
    <button md-raised-button [color]="'primary'">Sssh! No Barking!</button>
  </md-card-actions>
</md-card>
```

Now, we also used card, button and progress bar. We also need to import those:

```
import {
  MdToolbarModule,
  MdGridListModule,
  MdCardModule,
  MdProgressBarModule, 
  MdButtonModule, 
} from '@angular/material';
```

And, add them to the module:

```
@NgModule({
  declarations: [
    AppComponent,
    BarkMeterComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule.forRoot(provideClient),
    MdToolbarModule,
    MdGridListModule,
    MdCardModule,
    MdProgressBarModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

If you go `http://localhost:4200`, you will see your Bark Meter! Congratz! It looks a little small though. Let's fix it:

Open `bark-meter.component.css` and add style:

```
:host {
  flex: 1 0 auto;
}
```

Your Bark Meter is looking much better now. We used `:host` because of Angular's ViewEncapsulation options. From components
css file you can only style the elements _inside_ your component. If you want to style your components wrapper element you need
to use `:host` pseudo-selector.

Visually, it look decent, but it is not working...

Let's fix that next.

_Things are not working for you? Here: `git checkout bark-meter-visual`_

_P.S: Do not forget `npm update` after checkout_

