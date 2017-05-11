/**
 * Created by victorode on 2017-05-11.
 */
import React from 'react';
import CarouselConductor from '../CarouselConductor/CarouselConductor';

class QueuePage extends React.Component {


  render() {
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <CarouselConductor/>
            </div>
            <iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DX8VEqSz1UvdJ" width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
          </div>
        </div>
      </div>

    );
  }
}

export default QueuePage;