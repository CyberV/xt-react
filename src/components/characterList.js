import React, { Component } from 'react';
import CharacterCard from './characterCard';

class CharacterList extends Component {

  render() {
     return (
     <div className="row">
         {this.props.data && this.props.data.map( (d, index) => 
            (<CharacterCard key={index} data={d}></CharacterCard>)
         )
         }

</div> 
    );
  }
}
export default CharacterList; 