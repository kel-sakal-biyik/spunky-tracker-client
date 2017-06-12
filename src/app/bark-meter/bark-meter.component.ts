import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GetDecibel = gql`
  query GetDecibel {
    microphone {
      decibel
    }
  }
`;

const IncreasePlayCount = gql`
  mutation IncreaseNoBarkingCount($playType: String!) {
    countPlay(playType: $playType) {
      value
    }
  }
`;

@Component({
  selector: 'app-bark-meter',
  templateUrl: './bark-meter.component.html',
  styleUrls: ['./bark-meter.component.css']
})
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
