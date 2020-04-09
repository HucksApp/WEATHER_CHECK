import React from 'react';

import Graph1 from './Graph1'
import { withRouter } from 'react-router-dom'

import '../styles/graph.css'
import { bounceInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';


const styles = {
  bounceInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
  }
}




const TempMap = (props) => {

  let dayTag;

  if (props.match.params.id) { dayTag = (<p>{props.match.params.id}</p>) } else { dayTag = (<p>Days: Five</p>) }

  return (
    <StyleRoot>
      <div className="graph_root" style={styles.bounceInUp} >
        <h4 style={{ color: 'rgb(137,138,137)' }} >{props['tag']} TEMPERATURE GRAPH</h4>
        <div className="g_cov" style={{ color: 'rgb(137,138,137)' }}>
          <p>Max_Temp: Solid Line</p>
          {dayTag}
          <p>Min_Temp: Dotted Lines</p>
        </div>
        <Graph1 data={props.data} />
      </div>
    </StyleRoot>
  );
}

export default withRouter(TempMap);
