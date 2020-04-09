import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'


import Error from './Error';
import TempMap from './TempMap';
import HoursForcast from './HoursForcast'
import DayWeather from './DayWeather'
import '../styles/forcast.css'
import Footer from './Footer'




class ForcastHome extends Component {

    //INITIALIZE
    constructor(props) {
        super(props);

        this.state = {
            data: {
                dayArray: [],
                rIdDay: ""
            }
        }
        this.slideUp = React.createRef();

        this.hourPassedData = this.hourPassedData.bind(this);


    }


    //SCROLL VIEW

    onPressAction = () => {
        this.slideUp.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            duration: "5000"
        })
    };



    //BRING IN THE CLICKED HOUR ID AND CHECK DATA TO SET NEW ARRAY OF RELATIONS
    //SET ARRAY IN STATE TO BE PASSED DOWN TO HOURS VIEW

    hourPassedData = (rIdAll) => {

        const rId = rIdAll.split("/")[0]
        const rIdDay = rIdAll.split("/")[1]

        const getDayArray = this.props.list.genData.idRegistry.list.filter((obj) => {

            return obj.dt_txt.split(" ")[0] === rId.split(" ")[0]
        })


        const copyData = { ...this.state.data };
        copyData.dayArray = getDayArray;
        copyData.rIdDay = rIdDay;

        this.setState({
            data: copyData
        });


    }





    render() {

        return (
            <BrowserRouter>
                <div className="forcast" ref={this.slideUp} >
                    <div className="heading">
                        <p><span>CITY</span><span>{this.props.list.genData.city}</span></p>
                        <p><span>COUNTRY</span><span>{this.props.list.genData.country}</span></p>
                        <p><span>POPULATION</span><span>{this.props.list.genData.population}</span></p>
                        <Link to="/days_temp_Graph"> <i class="medium material-icons bntgraph" title="VIEW WEEK TEMP GRAPH" >insert_chart</i></Link>
                        <Link to="/"> <i class="medium material-icons bntgraph" title="BACK TO HOME" >arrow_back</i></Link>
                    </div >

                    <Switch>
                        <Route path="/" exact>
                            <DayWeather checkDayId={this.hourPassedData} daysForcast={this.props.list.genDays} />
                        </Route>
                        <Route path="/hours_Forcast/:id" exact>
                            <HoursForcast daysForcast={this.state.data.dayArray} rid_day={this.state.data.rIdDay} />
                        </Route>
                        <Route path="/days_temp_Graph" exact>
                            <TempMap data={this.props.list.genData.idRegistry.list} tag={"A WEEK"} />
                        </Route>
                        <Route path="/hours_temp_Graph/:id" exact>
                            <TempMap data={this.state.data.dayArray}
                                tag={this.state.data.rIdDay}
                            />
                        </Route>
                        <Route  >
                            <Error path="*" />
                        </Route>
                    </Switch>


                    <p class="btn-floating btn-large pulse" onClick={this.onPressAction}><i className="material-icons">arrow_upward</i></p>
                    <Footer />

                </div>
            </BrowserRouter>
        )
    }
}

export default ForcastHome;
