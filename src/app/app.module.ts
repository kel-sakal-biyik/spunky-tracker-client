import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { BarkMeterComponent } from './bark-meter/bark-meter.component';
import {
  MdToolbarModule,
  MdGridListModule,
  MdCardModule,
  MdProgressBarModule,
  MdButtonModule
} from '@angular/material';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/raspberry-api'
  })
});

export function provideClient(): ApolloClient {
  return client;
}

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
