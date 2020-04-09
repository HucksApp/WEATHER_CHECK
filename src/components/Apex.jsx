import React, { Component } from 'react';
import axios from 'axios'

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import '../styles/home.css'
import 'animate.css';

import Home from './Home';
import '../styles/apex.css'
import ForecastHome from './ForcastHome'
import Footer from './Footer'
import loading from '../background/loading.gif'

import sorter from '../shared/Sort'


class Apex extends Component {

    //INITIALISE CLASS PROPERTY AND METHOD

    constructor(props) {
        super(props);
        this.state = {
            data: {
                filled: false,
                arrangedData: ""

            }
        }
        this.scrollDown = React.createRef();
        this.scrollup = React.createRef();
    }


    //VIEW POSITIONS SROLL

    handleScrollup = () => {
        this.scrollup.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            duration: "5000"
        })
    }



    //BRING IN PAYLOAD FROM FORM
    //CHECK FILLED FIELD AND SET EMPTY TO DEFAULT
    //FETCH DATA RELATED TO GIVEN QUERY
    //BRING IN SORTER TO RE-ARRANGE RESPONSE DATA
    //FILTER THE REQUIRED DAYS NEED AND STORE IN STATE
    //CHECK IF DATA HAS RETURN TO TOGGLE BETWEEN VIEWS

    getDaysWeather = (payload) => {

        const city = payload.city;
        let country;
        let days;
        let state;

        if (payload.country === "") {
            country = "NG";

        } else {
            country = payload.country;
        };

        if (payload.state === "") {
            state = "Lagos";


        } else {
            state = payload.state;
        };
        if (payload.days === "") {
            days = 5;


        } else {
            days = payload.days;
        };



        const copyData = { ...this.state.data }
        copyData.filled = true;
        this.setState({
            data: copyData
        }, () => {


            this.scrollDown.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                duration: "5000"
            });


            axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + state + ',' + country + '&appid=a40c698729d41a0ff59b01fed9b87d45')
                .then((response) => {

                    const arrangedData = sorter(response.data, days)
                    let copyData2 = { ...this.state.data };
                    arrangedData.genDays = arrangedData.genDays.slice(0, days);

                    copyData2.arrangedData = arrangedData;
                    this.setState({
                        data: copyData2
                    });

                })
                .catch(err => {

                    store.addNotification({
                        title: " BAD LOCATION ENTRY",
                        message: "Your Location Entry Is In Wrong Format Or Combination, Try Again With Different Combinations ",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 6000,
                            onScreen: true
                        }
                    });

                    console.log(err)
                });


        })


    }
    render() {
        let forcastView = "";
        let foot = ""
        if (this.state.data.filled === false) {
            forcastView = (
                <div className="contain_b">
                    <div className="inlet">
                        <p>IF YOU NEED HELP GETING ARROUND, CLICK ON THE RIGHT TOP HELP ICON</p>
                        <p>FILL THE OPTIONS TO GET STARTED</p>
                    </div>
                    <p className="btn-floating btn-large pulse" onClick={this.handleScrollup}><i className="material-icons">arrow_upward</i></p>

                </div>

            );
            foot = (<Footer />)
        } else if (this.state.data.filled === true && this.state.data.arrangedData === "") {
            forcastView = (
                <div className="contain_l">
                    <img src={loading} alt="Loading......" />
                </div>

            );
            foot = (<Footer />)

        } else if (this.state.data.filled === true && this.state.data.arrangedData !== "") {
            forcastView = (

                <ForecastHome list={this.state.data.arrangedData} />
            );
            foot = (<p></p>)
        }



        return (
            <div ref={this.scrollup}>
                <Home getDaysWeather={this.getDaysWeather} />
                <div ref={this.scrollDown} className="b_cover">
                    {forcastView}
                </div>
                {foot}
            </div>
        );
    }
}

export default Apex;
