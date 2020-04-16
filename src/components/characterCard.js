import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class CharacterCard extends Component {

  render() {
    console.log(this.props);

    const { id, name, status, gender, origin, species, location, image } = this.props.data;
    return (
      // <div className="col-md-3 col-sm-6 ">
      //   <span> {this.props.data.name} </span>
      // </div>

      <div className="character col-lg-3 col-md-4 col-sm-6 ">
        <div className="row" data="card header" >
          <div className="col-sm-12 card-image"><img src={image} alt={name} />
            <div className="row">
              <div className="col-sm-12 nameplate">
                <span className="char-name" title={name} >{name}</span>
                <p className="char-id">ID: {id} - created 2 years ago</p> 
              </div>
             
            </div>
            <div className="char-info">
            <div className="row">
              <div className="col-sm-4" >Status</div ><div className="col-sm-8">{status}</div>
            </div>
            <div className="row" ><div className="col-sm-4">Species</div><div className="col-sm-8">{species}</div></div>
            <div className="row"  ><div className="col-sm-4">Gender</div><div className="col-sm-8">{gender}</div></div>
            <div className="row"  ><div className="col-sm-4">Last Location</div><div className="col-sm-8">{location.name}</div></div>
            <div className="row" ><div className="col-sm-4">Origin</div><div className="col-sm-8">{origin.name}</div></div>
         
            </div>
             </div>


        </div>

      </div>
    );
  }
}
export default CharacterCard; 