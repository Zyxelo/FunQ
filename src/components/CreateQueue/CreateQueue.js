import React from 'react';
import callApi from '../../api';
import QueueForm from '../QueueForm/QueueForm';

class CreateQueue extends React.Component {

  constructor(props) {
    super(props);

    function pad(number) {
      if (number < 10) number = '0'+number;
      return number;
    }

    let today = new Date();
    let year = today.getFullYear();
    let month = pad(today.getMonth()+1);
    let day = pad(today.getDate());
    let endD = year+'-'+month+'-'+day+'T12:00';

    this.state = {
      endDate: endD,
      privacy: "public",
      thumbnail:'',
      title: '',
      description: '',
      longDescription:'',
      eventDate: endD,
      location: '',
      category: '',
      nrOfQueuers: 50,
      youTube: '',
      spotifyUrl: '',
      imageUrl: ''
    };
  }

  handleChange = (event) => {
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

    callApi('queues/', 'post', submit, true)
      .then( (res) => {
        alert('You have created a new queue!');
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

export default CreateQueue;