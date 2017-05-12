import React from 'react';
import QueTopElement from './QueTopElement/QueTopElement';
import QueueElement from './QueueElement/QueueElement';

// Have to import all images sso they end up getting served by the server to the client.. stupid workaround
// should be fixed
import hakan from '../../../public/images/hakan_ullevi.jpg';
import '../../../public/images/middag.jpg';
import '../../../public/images/sof.jpg';

class QueBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      chunkedArray : [[]],
      queueList: [
        {
          thumbnail: '/static/media/hakan_ullevi.680eabff.jpg',
          queueTitle: 'Håkan Hellström',
          queueCompany: 'Tickster',
          queueEventDate:  '2017-06-12T11:22:22.824Z',
          queEndDate: '2017-05-20T11:22:22.824Z',
          location: 'Bråvalla',
          queueShortDescription: 'Håkan uppträder för 10 gången på bråvalla blir jättekul kom kom',
          queueCategory: 'Music',
          numberOfQueuers: 2000,
          queueID: 'lkadjskkk'
        },
        {
          thumbnail: '/static/media/middag.4944950f.jpg',
          queueTitle: 'C-klassittning',
          queueCompany: 'KF',
          queueEventDate:  '2017-05-29T11:22:22.824Z',
          queEndDate: '2017-05-20T11:22:22.824Z',
          location: 'KK',
          queueShortDescription: 'C-klassen har för blabla asdasdasda misc jsjjsjjsjs dkdkdkd sjsjsj',
          queueCategory: 'Party',
          numberOfQueuers: 2000,
          queueID: 'lkasjd22jskkk'
        },
        {
          thumbnail: '/static/media/middag.4944950f.jpg',
          queueTitle: 'Studentorkesterfestivalen',
          queueCompany: 'Lintek',
          queueEventDate:  '2017-05-292T11:22:22.824Z',
          queEndDate: '2017-05-28T11:22:22.824Z',
          location: 'Platå',
          queueShortDescription: 'SOF kommer till stan de vill du inte missa typ',
          queueCategory: 'Music',
          numberOfQueuers: 2000,
          queueID: 'lkasjssaqdjskkk'
        },
        {
          thumbnail: '/static/media/middag.4944950f.jpg',
          queueTitle: 'Studentorkesterfestivalen',
          queueCompany: 'Lintek',
          queueEventDate:  '2017-05-292T11:22:22.824Z',
          queEndDate: '2017-05-28T11:22:22.824Z',
          location: 'Platå',
          queueShortDescription: 'SOF kommer till stan de vill du inte missa typ',
          queueCategory: 'Music',
          numberOfQueuers: 2000,
          queueID: 'lkasjssaqdjskkk'
        },
        {
          thumbnail: '/static/media/middag.4944950f.jpg',
          queueTitle: 'Studentorkesterfestivalen',
          queueCompany: 'Lintek',
          queueEventDate:  '2017-05-292T11:22:22.824Z',
          queEndDate: '2017-05-28T11:22:22.824Z',
          location: 'Platå',
          queueShortDescription: 'SOF kommer till stan de vill du inte missa typ',
          queueCategory: 'Music',
          numberOfQueuers: 2000,
          queueID: 'lkasjssaqdjskkk'
        },
        {
          thumbnail: '/static/media/middag.4944950f.jpg',
          queueTitle: 'Studentorkesterfestivalen',
          queueCompany: 'Lintek',
          queueEventDate:  '2017-05-292T11:22:22.824Z',
          queEndDate: '2017-05-18T11:22:22.824Z',
          location: 'Platå',
          queueShortDescription: 'SOF kommer till stan de vill du inte missa typ',
          queueCategory: 'Music',
          numberOfQueuers: 2000,
          queueID: 'lkasjssaqdjskkk'
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({chunkedArray: this.createGroupedArray(this.state.queueList,3)})
    this.timer = setInterval(
      () => this.tick(),
      1000
    );
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
              {queueChunk.map((queue, i) => <QueueElement currentTime={this.state.time} key={i} {...queue}/>)}

            </div>)}
        </div>
      </div>
    );
  }
}

export default QueBrowser;

