import React from 'react';
import QueTopElement from './QueueTopElement/QueTopElement';
import QueueElement from './QueueElement/QueueElement';
import callApi from '../../api';

// Have to import all images sso they end up getting served by the server to the client.. stupid workaround
// should be fixed
import hakan from '../../../public/images/hakan_ullevi.jpg';
import '../../../public/images/middag.jpg';
import '../../../public/images/sof.jpg';

class QueueBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      chunkedArray : [[]]
    };
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillMount() {
    callApi('queues', 'get')
    .then((response) => {
      this.setState({chunkedArray: this.createGroupedArray(response.data,3)})
    })
    .catch((err) => {
      console.log(err)
    });

  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      time:  new Date().getTime()
    });
  }

  createGroupedArray = (arr, chunkSize) => {
    let groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  };


  render() {

    return (
      <div className="container wrapper">
        <QueTopElement imageSrc={hakan} hours={this.state.hoursHH}
                       minutes={this.state.minutes} seconds={this.state.seconds}
                       queTitle="Håkan Hellström" queDetails="Ullevi 27/6" href="/que"/>
        <div className="que-element-wrapper">
          {this.state.chunkedArray.map((queueChunk , i) =>
            <div key={i} className="row">
              {queueChunk.map((queue, i) => <QueueElement key={queue.queueID} {...queue}/>)}

            </div>)}
        </div>
      </div>
    );
  }
}

export default QueueBrowser;

