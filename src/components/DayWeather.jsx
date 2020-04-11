import React from 'react';
import { dayArray } from '../shared/constants'
import '../styles/day_weather.css'
import { withRouter } from 'react-router-dom'




import { bounceInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';


const styles = {
    bounceInUp: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
    }
}



//OUT PUT THE FORCAST IN CARDS

const DayWeather = (props) => {

    const dateObj = new Date();
    let start = dateObj.getDay()
    let dayAlpha = ""


    //PASS DATA THE CLICKED DAY ID UP
    //PUSH TO THE HOURS ROUTE
    const handleHours = (e) => {
        props.checkDayId(e.target.id)
        props.history.push('/hours_Forcast/' + e.target.id.split("/")[0].split(" ")[0])
    }



    
    //LOOP TROUGH DATA TO RETURN THE CARD ARRAY
    //CONVERT DATE TO WORDS WHILE LOOPING

    const dayForcast = props.daysForcast.map((dayForcast) => {
        let dNum = start;

        dayAlpha = dayArray[dNum];
        start++;
        console.log(start)
        if (start === 7) {
            start = 0
        };

        return (
            <div key={dayForcast.dt} className="card_cover"  >
                <i className=" green material-icons bntgraph" onClick={handleHours} id={dayForcast.dt_txt + "/" + dayAlpha} title="HOURS FORCAST FOR THE DAY" >arrow_forward</i>
                <div >
                    <h5 className="card_title">{dayAlpha}</h5>
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
            <div className='day_weather' style={styles.bounceInUp}>
                {dayForcast}
            </div>
        </StyleRoot>
    );
}

export default withRouter(DayWeather);
