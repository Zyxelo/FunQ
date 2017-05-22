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
import './QueuePage.css';
import ReCaptcha from 'react-recaptcha';

class QueuePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueInfo:'',
      inQueue: false
    }
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({queueInfo : this.props.location.state}, () => {this.isInQueue();})
    } else {
      axios.get('http://localhost:8080'+this.props.location.pathname)
        .then((response) => {
          this.setState({queueInfo: response.data}, () => {this.isInQueue()});
        })
        .catch((err) => console.log(err));
    }
  }

  isInQueue = () => {
    const query = 'q_id=' + this.state.queueInfo._id + '&u_id=' + localStorage.getItem('userID');
    console.log(query);
    axios.get('http://localhost:8080/queueList?' + query)
      .then((response) => {
        console.log(response);
        if(response.data.expired === false) {
          this.setState({inQueue:true})
        }
      })
      .catch((err) => {console.log(err)})
  }

  enterQueueButton = () => {
    if(this.props.isAuthenticated) {
      const data = {
        u_id: localStorage.getItem('userID'),
        q_id: this.state.queueInfo._id
      };
      axios.post('http://localhost:8080/queueList/enterQueue', data)
        .then((response) => {
          console.log(response.data.message);
          this.setState({inQueue:true})
        })
        .catch((err) => console.log(err))
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
                <div className="panel-body">
                  <h3>{this.state.queueInfo.queueTitle}</h3>
                  <h5>{'By ' + this.state.queueInfo.queueCompany}</h5>
                  <TimeLeft timeLeft={[12,12,12,12]}/>
                  <div className="row">
                    <div className="col-sm-12">
                      {!this.state.inQueue &&
                        <button className="btn btn-primary enter-que" onClick={() => this.enterQueueButton()}>Enter
                        queue</button>
                      }
                      {this.state.inQueue &&
                        <p className="in-queue-text">You are in this queue</p>
                      }
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 captcha">
                      <p>Timer to enter captcha</p>
                      <ReCaptcha render="explicit"
                                 sitekey="6LdOKx8UAAAAAH93hUwxSlTqGF8Ef6a69KMbAdRs"
                                 onloadCallback={console.log.bind(this, 'recaptcha loaded')}
                      />
                    </div>
                  </div>
                </div>
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