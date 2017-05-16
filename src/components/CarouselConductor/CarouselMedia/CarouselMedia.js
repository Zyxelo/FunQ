import React from 'react';
import {Carousel} from 'react-bootstrap';
import YouTube from 'react-youtube';


class CarouselMedia extends React.Component {










  render() {
    return (
      <Carousel.Item active={this.props.active} animateIn={this.props.animateIn}
                     animateOut={this.props.animateOut} direction={this.props.direction}
                     index={this.props.index}  onAnimateOutEnd={this.props.onAnimateOutEnd}>
        {(this.props.type === 'video' ) ?  <YouTube videoId={this.props.src}
                                                    onPlay={(event) => this.props.setYoutubePlayers(event,this.props.src)}  /> :
          <img  width={900} height={500} alt="900x500" src={this.props.src}/>}
      </Carousel.Item>
    );
  }
}
export default CarouselMedia;



