import React from 'react';
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import '../styles/error.css'



const styles = {
    bounceInLeft: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft')
    }
}


// 404 page
const Error = () => {
    return (
        <StyleRoot>
            <div className="error" style={styles.bounceInLeft}>
                <h2  >SORRY THE REQUESTED PAGE DO NOT EXIST</h2>
                <h4>Use The Arrow Button Above To Go To The Forcast Results</h4>
            </div>
        </StyleRoot>
    );
}

export default Error;
