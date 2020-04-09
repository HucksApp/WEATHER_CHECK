
import React from 'react';
import { bounceInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { withRouter } from 'react-router-dom'

import '../styles/day_weather.css'

const styles = {
    bounceInRight: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceInRight, 'bounceInRight')
    }
}



//OUTPUT HOURS FORCAST IN CARD

const HoursForcast = (props) => {


    let mapId = ""


    //PUSH TO THE DISTINCT DATE MAP ROUTE
    const handleHoursMap = e => {
        props.history.push('/hours_temp_Graph/' + e.target.id)
    }

    const dayForcast = props.daysForcast.map((dayForcast) => {

        mapId = dayForcast.dt_txt.split(' ')[0]
        console.log(dayForcast.dt)
        return (
            <div key={dayForcast.dt} className="card_cover"  >
                <div >
                    <h5 className="card_title">{props.rid_day}</h5>
                    <div className="card_tittle_cover">
                        <h5 className="card_title_dt">DATE</h5>
                        <h5 className="card_title_d">{dayForcast.dt_txt.split(" ")[0]}</h5>
                    </div>
                    <div className="card_tittle_cover">
                        <h5 className="card_title_dt">Time</h5>
                        <h5 className="card_title_d">{dayForcast.dt_txt.split(" ")[1]}</h5>
                    </div>
                </div>
                <div className="card_image">
                    <img src={"https://openweathermap.org/img/w/" + dayForcast.weather[0].icon + ".png"} alt="" className="w_icon" />
                </div>
                <div className="card_content">
                    <div>
                        <span>
                            <p>MAX TEMP:</p>
                            <p>{dayForcast.main['temp_max']}K</p>
                        </span>
                        <span>
                            <p>MIN TEMP:</p>
                            <p>{dayForcast.main['temp_min']}K</p>
                        </span>
                        <span>
                            <p>GROUND LVL:</p>
                            <p>{dayForcast.main['grnd_level']}</p>
                        </span>

                        <span>
                            <p>WEATHER:</p>
                            <p>{dayForcast.weather[0]['main']}</p>
                        </span>
                        <span >
                            <p>DESCRIPTION:</p>
                            <p >{dayForcast.weather[0]['description']}</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <p>SEA LvL:</p>
                            <p>{dayForcast.main['sea_level']}</p>
                        </span>

                        <span>
                            <p>Pressure:</p>
                            <p>{dayForcast.main['temp_min']}hPa</p>
                        </span>
                        <span>
                            <p>Humidity:</p>
                            <p>{dayForcast.main['humidity']}%</p>
                        </span>
                        <span>
                            <p>Wind Speed:</p>
                            <p>{dayForcast.wind['speed']}m/s</p>
                        </span>
                    </div>
                </div>
            </div>
        )

    });



    return (
        <StyleRoot>
            <div className="hour_head">
                <div className="h_btn">
                    <h5>HOURS FORCAST</h5>
                    <i class=" material-icons bntgraph" onClick={handleHoursMap} id={mapId} title="VIEW HOURS TEMP GRAPH" >insert_chart</i>
                </div>
                <div className='day_weather' style={styles.bounceInRight}>
                    {dayForcast}
                </div>
            </div>
        </StyleRoot>
    );
}

export default withRouter(HoursForcast);





