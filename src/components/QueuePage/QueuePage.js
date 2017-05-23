import React from 'react';
import PropTypes from 'prop-types';
import CarouselConductor from '../CarouselConductor/CarouselConductor';
import TimeLeft from '../TimeLeft/TimeLeft';
import Chat from '../Chat/Chat';
import { switchModal, MODAL_SIGN_IN } from '../../actions';
import { connect } from 'react-redux';
import callApi from '../../api';
import './QueuePage.css';

class QueuePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      queueInfo:'',
      inQueue: false,
      queueLength: 0,
      position: 0
    };
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({queueInfo : this.props.location.state}, () => {
        this.isInQueue();
        this.setQueueLength();
      })
    } else {

      callApi(this.props.location.pathname,'get')
        .then((response) => {
          this.setState({queueInfo: response.data}, () => {
            this.isInQueue();
            this.setQueueLength();
          });
        })
        .catch((err) => console.log(err));
    }
  }

x


  // This function determines if the user already is in this queue
  isInQueue = () => {

    const query = 'q_id=' + this.state.queueInfo._id + '&u_id=' + localStorage.getItem('userID');

    callApi('queueList?' + query, 'get')
      .then((response) => {
      console.log(response);
        if(response.data !== null && response.data.expired === false) {
          this.setState({inQueue:true})
          //Position in queue
          callApi('queueList/position?' + query, 'get')
            .then((response) => {
              this.setState({position: response.data.position});
            })
        } else {
          this.setState({inQueue:false});
        }
      })
      .catch((err) => {console.log(err)})

  };

  // REFACTOR: Make reusable component of this button?
  enterQueueButton = () => {
    if(this.props.isAuthenticated) {

      const data = {
        u_id: localStorage.getItem('userID'),
        q_id: this.state.queueInfo._id
      };

      callApi('queueList/enterQueue','post', data)
        .then((response) => {
          console.log(response.data.message);
          this.isInQueue();
          this.setQueueLength();
        })
        .catch((err) => console.log(err))

    } else {
      this.props.dispatch(switchModal(MODAL_SIGN_IN));
    }
  };

  leaveQueueButton = () => {
    let data = {
      u_id: localStorage.getItem('userID'),
      q_id: this.state.queueInfo._id
    };

    callApi('queueList/leaveQueue', 'delete', data)
      .then((response) => {
        console.log(response.data.message);
        this.isInQueue();
        this.setQueueLength();
      })
      .catch((err) => console.log(err))
  };

  setQueueLength = () => {
    let q_id = this.state.queueInfo._id;
    callApi('queueList/queueLength?q_id='+q_id, 'get')
      .then((response) => {
        this.setState({queueLength: response.data.queueLength});
      })
  };


  render() {
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
                  <TimeLeft endTime={this.state.queueInfo.queEndDate}/>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="queue-length">
                        <h4>{this.state.queueLength}</h4>
                        <p>persons are in this queue</p>
                      </div>

                      {!this.state.inQueue &&
                        <button className="btn btn-primary enter-que" onClick={() => this.enterQueueButton()}>Enter
                        queue</button>
                      }
                      {this.state.inQueue &&
                        <p className="in-queue-text">You are in this queue (position {this.state.position})</p>
                      }

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 captcha">
                      {this.state.inQueue &&
                        <button className="btn btn-primary enter-que" onClick={() => this.leaveQueueButton()}>Leave queue</button>
                      }
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
  const {auth} = state;
  const {isAuthenticated, errorMessage} = auth;

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(QueuePage);

QueuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};