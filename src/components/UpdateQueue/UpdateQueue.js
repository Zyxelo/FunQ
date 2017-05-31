/**
 * Created by martin on 2017-05-23.
 */

import React from 'react';
import callApi from '../../api';
import QueueForm from '../QueueForm/QueueForm';

class UpdateQueue extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      endDate: '',
      privacy: '',
      thumbnail:'',
      title: '',
      description: '',
      longDescription: '',
      eventDate: '',
      location: '',
      category: '',
      nrOfQueuers: 0,
      youTube: '',
      spotifyUrl: '',
      imageUrl: ''
    };
  }

  componentWillMount() {
    callApi('queues/'+this.props.match.params.id,'get')
      .then( (response) => {

        let endD = response.data.queueEndDate;
        endD = endD.substr(0,endD.length-1);
        let eventD = response.data.queueEventDate;
        eventD = eventD.substr(0,eventD.length - 1);

        let carousel = response.data.carousel;
        let youTube = '';
        let imageUrl = '';
        if (carousel[0]) {
          if(carousel[0].type === 'video') {
            youTube = carousel[0].src;

            if (carousel[2]) {
              imageUrl = carousel[2].src;
            }
          }
          else {
            if (carousel[1]) {
              imageUrl = carousel[1].src;
            }
          }
        }

        this.setState({
          endDate: endD,
          privacy: response.data.privacy,
          thumbnail: response.data.thumbnail,
          title: response.data.queueTitle,
          description: response.data.queueShortDescription,
          longDescription: response.data.queueLongDescription,
          eventDate: eventD,
          location: response.data.location,
          category: response.data.queueCategory,
          nrOfQueuers: response.data.numberOfQueuers,
          youTube: youTube,
          spotifyUrl: response.data.spotifyUrl,
          imageUrl: imageUrl,
        });
      })
      .catch( (err) => {
        console.log(err);
      })

  }

  handleChange = (event) =>  {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let carousel = [];
    if (this.state.youTube !== '') carousel[0] = {type: 'video', src: this.state.youTube};
    carousel[carousel.length] = {type: 'img', src: this.state.thumbnail};
    if (this.state.imageUrl !== '') carousel[carousel.length] = {type: 'img', src: this.state.imageUrl};

    const submit = {
      thumbnail: this.state.thumbnail,
      queueTitle: this.state.title,
      queueEventDate: this.state.eventDate,
      queueEndDate: this.state.endDate,
      location: this.state.location,
      queueShortDescription: this.state.description,
      queueLongDescription: this.state.longDescription,
      queueCategory: this.state.category,
      numberOfQueuers: parseInt(this.state.nrOfQueuers,0),
      privacy: this.state.privacy,
      carousel: carousel,
      spotifyUrl: this.state.spotifyUrl

    };

    const { history } = this.props;

    callApi('queues/'+this.props.match.params.id, 'put', submit, true)
      .then( (res) => {
        alert('You have updated the queue!');
        history.push('/mypage');
      })
      .catch((err) => {
        console.log(err);
      })
  };

  render() {
    let data = {
      endDate: this.state.endDate,
      privacy: this.state.privacy,
      thumbnail:this.state.thumbnail,
      title: this.state.title,
      description: this.state.description,
      longDescription: this.state.longDescription,
      eventDate: this.state.eventDate,
      location: this.state.location,
      category: this.state.category,
      nrOfQueuers: this.state.nrOfQueuers,
      youTube: this.state.youTube,
      spotifyUrl: this.state.spotifyUrl,
      imageUrl: this.state.imageUrl
    };

    return (
      <QueueForm data={data} handleChange={this.handleChange} submit={this.handleSubmit} />
    );
  }
}

export default UpdateQueue;