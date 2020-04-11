import React, { useEffect, useState } from 'react';
import './index.scss';
import DefaultLayout from "../../components/layouts/default";
import { getDimension } from '../../actions/dimensions';
import DimensionCard from '../../components/DimensionCard';
import { DimensionType, Match } from 'dimensions-ai';
function MainPage(props: any) {
  const [dimensions, setDimensions] = useState<Array<DimensionType>>([]);
  useEffect(() => {
    getDimension().then((res: any) => {
      console.log(res);
      //@ts-ignore
      setDimensions(res);
    }).catch((error) => {
      console.error(error);
    })
  }, []);
  return (
    <DefaultLayout>
      <div className='Main'>
        <div className='hero'>
          <h1 id='title'>Dimensions Station</h1>
          <p className='subtext'>Observe your Dimensions, Matches, and Tournaments, and basically everything</p>
          {
            dimensions.length &&
              dimensions.map((dim: DimensionType) => {
                return (
                  <DimensionCard dimension={dim}/>
                )
              })
          }
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainPage
