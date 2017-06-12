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
 
 
