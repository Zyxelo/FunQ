/**
 * Created by victorode on 2017-05-11.
 */
import React, {PropTypes} from 'react';
import CarouselConductor from '../CarouselConductor/CarouselConductor';
import {TimeLeft} from '../TimeLeft/TimeLeft';
import Chat from '../Chat/Chat';
import { switchModal, MODAL_SIGN_IN } from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';

class QueuePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueInfo: {
        thumbnail: '/static/media/hakan_ullevi.680eabff.jpg',
        queueTitle: 'Håkan Hellström',
        queueCompany: 'Tickster',
        queueEventDate:  '2017-06-12T11:22:22.824Z',
        queEndDate: '2017-05-20T11:22:22.824Z',
        location: 'Bråvalla',
        queueShortDescription: 'Håkan uppträder för 10 gången på bråvalla blir jättekul kom kom',
        queueCategory: 'Music',
        numberOfQueuers: 2000,
        queueLongDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id consectetur purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi egestas sapien eleifend, lacinia velit in, elementum urna. Nulla mattis maximus libero, vel molestie tortor tempus id. Nunc laoreet posuere eros, et faucibus magna. Phasellus quis urna varius, venenatis sapien lobortis, facilisis dui. Nullam ultrices justo et volutpat semper.Duis blandit porta gravida. Donec tincidunt tellus a dui commodo ullamcorper. Nullam metus felis, porta id iaculis nec, fermentum at velit. Pellentesque dapibus pharetra dui, ut scelerisque urna dapibus vel. Nunc a vehicula nulla, ut suscipit velit. Proin quis finibus felis. Donec vestibulum dapibus lacinia.Pellentesque diam diam, accumsan et augue et, blandit efficitur augue. Nullam quis volutpat ante. Aliquam nec varius enim. Nunc eget nibh congue, consequat purus non, sagittis nisl. Praesent a mollis eros. Maecenas maximus erat volutpat purus dictum, vel lobortis felis fringilla. Proin risus quam, porta ut sagittis eget, iaculis a ligula. Vivamus et sollicitudin est, ut posuere urna',
        queueID: 'lkadjskkk'}
    };
  }


  componentWillMount() {
    if (this.props.location.state) {
      this.setState({queueInfo : this.props.location.state});
    } else {
      axios.get('http://localhost:8080'+this.props.location.pathname)
        .then((response) => this.setState({queueInfo: response})).catch((err) => console.log(err));
    }
  }
  componentDidMount() {
  }

  enterQueueButton = () => {
    if(this.props.isAuthenticated) {
      alert('You entered the queue');
    } else {
      this.props.dispatch(switchModal(MODAL_SIGN_IN));
    }
  }


  render() {
    const { dispatch, isAuthenticated, displayModal } = this.props
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <CarouselConductor/>
            </div>
            <div className="col-sm-4">
              <div className="panel panel-default">
                <h3>{this.state.queueInfo.queueTitle}</h3>
                <h5>{'By ' + this.state.queueInfo.queueCompany}</h5>
                <div><TimeLeft timeLeft={[12,12,12,12]}/></div>
                <button className="btn btn-primary enter-que" onClick={() => this.enterQueueButton()}>Enter queue</button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="col-lg-12text-center">
                <h2 className="section-heading">Description</h2>
                <h3 className="section-subheading">{this.state.queueInfo.queueShortDescription}</h3>
                <div className="panel panel-default">
                  <div>{this.state.queueInfo.queueLongDescription}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <Chat queueID={this.state.queueInfo.queueID}/>
            </div>
          </div>


          <div className="row">
            <div className="col-sm-8">

            </div>
            <div className="col-sm-4">
              <h5>Queue Playlist</h5>
              <iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DX8VEqSz1UvdJ"
                      width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>

            </div>
          </div>



        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const {auth} = state
  const {isAuthenticated, errorMessage} = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(QueuePage);

QueuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}