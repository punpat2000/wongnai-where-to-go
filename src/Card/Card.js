import React from 'react';
import './Card.css';

class Card extends React.Component {

  photos() {
    const trips = this.props.trip.photos.slice(1); // exclude the first image.
    return trips.map(imgUrl =>
      <div className="pic-item">
        <img src={imgUrl} className="cover" />
      </div>
    );
  }

  tags() {
    let text = 'หมวด -';
    const arr = this.props.trip.tags;
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 1)
        text += ` และ`;
      text += ` ${arr[i]}`;
    }
    return text;
  }

  description() {
    if (this.props.trip.description.length < 600)
      return this.props.trip.description;
    else
      return this.props.trip.description.slice(0, 600);
  }

  render() {
    return (
      <div className="Card-padding">
        <div className="main-wrapper">
          <div className="big-pic">
            <img src={this.props.trip.photos[0]} className="cover" />
          </div>
          <div className="content-wrapper">
            <div className="text-wrapper">
              <div className="title">
                <a href={this.props.trip.url}>{this.props.trip.title}</a>
              </div>
              <div className="description">
                {this.description()} ... <a href={this.props.trip.url}>อ่านต่อ</a>
                <div className="trip-tags">
                  {this.tags()}
                </div>
              </div>
            </div>
            <div className="pic-wrapper">
              {this.photos()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;