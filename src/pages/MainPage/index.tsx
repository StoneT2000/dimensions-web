import React, { useEffect, useState } from 'react';
import './index.scss';
import DefaultLayout from "../../components/layouts/default";
import { getDimension } from '../../actions/dimensions';
import DimensionCard from '../../components/DimensionCard';
import { DimensionType } from 'dimensions-ai';
function MainPage() {
  const [dimensions, setDimensions] = useState<{[x in string]: DimensionType}>({});
  useEffect(() => {
    getDimension().then((res: any) => {
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
          <div className='dimensions-list'>
            {
              dimensions &&
              Object.values(dimensions).map((key, ind) => {
                let dim = key;
                return (
                  <DimensionCard dimension={dim}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainPage
