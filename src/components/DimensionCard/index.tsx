import React from 'react';

import './index.scss';
import { DimensionType } from 'dimensions-ai';
import { Link } from 'react-router-dom';

const DimensionCard = (props: {dimension: DimensionType}) => {

  return (
    <div className="DimensionCard">
      <Link to={'/dimensions/' + props.dimension.id}><h2 className='title'>{props.dimension.name}</h2></Link>
      <p className='matches'>Design: {props.dimension.design.name}</p>
      <p className='matches'>Matches: {props.dimension.matches.length}</p>
    </div>
  )
}

export default DimensionCard;
