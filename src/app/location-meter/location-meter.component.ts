import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GetLocation = gql`
  query GetDecibel {
    location {
      latitude
      longitude
    }
  }
`;

const IncreasePlayCount = gql`
  mutation IncreaseGoToBedCount($playType: String!) {
    countPlay(playType: $playType) {
      value
    }
  }
`;

@Component({
  selector: 'app-location-meter',
  templateUrl: './location-meter.component.html',
  styleUrls: ['./location-meter.component.css']
})
export class LocationMeterComponent implements OnInit{
  public latitude: number;
  public longitude: number;
  public playCount: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GetLocation,
      pollInterval: 10000
    }).subscribe(({data}) => {
      this.latitude = data.location.latitude;
      this.longitude = data.location.longitude;
    });
  }

  increaseCount() {
    this.apollo.mutate<any>({
      mutation: IncreasePlayCount,
      variables: {
        playType: 'goToBed'
      }
    }).subscribe(({ data }) => {
      this.playCount = data.countPlay.value;
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
