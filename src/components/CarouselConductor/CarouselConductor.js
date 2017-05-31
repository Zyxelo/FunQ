/**
 * Created by victorode on 2017-05-11.
 */
import React from 'react';
import {Carousel} from 'react-bootstrap';
import CarouselMedia from './CarouselMedia/CarouselMedia';


/*
 This class expects to be handed an array with objects of information that should be displayed in the
 conductor for example
 {
 source: /static/media/hakan_ullevi.680eabff.jpg,
 type: 'image'
 }

 type: image/video



 <YouTube videoId={'Upx_t4YR3X8'}/>
 <Carousel.Caption>
 <h3>Third slide label</h3>
 <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
 </Carousel.Caption>
 </Carousel.item>


 [{
 type: 'video',
 src: 'Upx_t4YR3X8'
 },{
 type: 'img',
 src: '/static/media/hakan_ullevi.680eabff.jpg'
 },{
 type: 'img',
 src: '/static/media/middag.4944950f.jpg'
 }]

 */

class CarouselConductor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players:[],
      index: 0,
      direction: null,
      contentArray:[],
    };
  }

  componentWillReceiveProps(props) {
    this.setState({'contentArray': props.content});
  }

  componentWillUnmount(){
    console.log(this.state.players);
  }

  setYoutubePlayers = (event) => {
    console.log('set');
    let players = this.state.players;
    players.push(event.target);
    this.setState({
      players: players,
    });
  };

  pauseAllPlayers = () => {
    if (this.state.players.length !== 0) {
      console.log('pasue');
      this.state.players.forEach((player) => {
        player.pauseVideo();
      });
    }

  };

  handleSelect = (selectedIndex, e) =>{
    this.pauseAllPlayers();
    //console.log(this.state.players);
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  };

  render() {
    return(
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        {this.state.contentArray.map((content,i) => <CarouselMedia {...content} setYoutubePlayers={this.setYoutubePlayers} key={i} />)}
      </Carousel>
    );
  }
}

export default CarouselConductor;


