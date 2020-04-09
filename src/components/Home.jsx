import React, { Component } from 'react'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import '../styles/home.css'
import 'animate.css';
import GetDate from './GetDate'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                country: "",
                city: "",
                state: "",
                days: "",
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = (e) => {
        const copyData = { ...this.state.data };
        copyData[e.target.id] = e.target.value;
        this.setState({
            data: copyData
        });

    }

    helpManual = () =>{
        window.alert(`
        
THIS APPLICATION FORCAST WEATHER BASED ON YOUR SET OPTIONS

 ONLY THE CITY FIELD IS COMPULSORY.


    -ITS COUNTRY IS DEFAULTED TO NIGERIA
    YOU CAN SET THE COUNTRY IN THE OPTION
                
    -ITS RETURN NUMBER OF DAYS IS DEFAULTED TO 5
        YOU CAN SET THE RETURN NUMBER OF DAYS 

    -IT FINDS COMPATIBLE STATE TO MATCH THE COUNTRY.
        YOU CAN SET THE STATE IN THE OPTION
        
        
        
        `)
       
        
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.data.city === "") {
            store.addNotification({
                title: " The City Can't Be empty",
                message: "What Do I search For? Fill THe City To Continue",
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

        } else {
            if (this.state.data.state === "" || this.state.data.country=== "") {
                store.addNotification({
                    title: " You Can Be More Specific",
                    message: "Completing the Address inputs gives you a better results",
                    type: "info",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 6000,
                        onScreen: true
                    }
                });
    


            }
        console.log(this.state)


    this.props.getDaysWeather(this.state.data)

        const copyData = { ...this.state.data };
        copyData.city = "";
        copyData.country = "";
        copyData.state = "";
        copyData.days = "";

        this.setState({
            data: copyData
        })

    }
    }

    render() {
        return (
            <div className="home" >
                <form onSubmit={this.handleSubmit}>
                <div onClick={this.helpManual} className="help" title="HELP">
                <i className="material-icons">help</i>
                </div>
                    <h1>WEATHER CHECK</h1>
                    <div>
                        <GetDate />
                    </div>
                    <div className="form_inputs">
                        <div className="input-field col s6">
                            <label htmlFor="city">ENTER CITY <sup style={{ color: '#f00', fontSize: '1.2em' }}>*</sup></label>
                            <input type="text" id="city" onChange={this.handleChange} value={this.state.data.city} />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="state">ENTER STATE</label>
                            <input type="text" id="state" onChange={this.handleChange} value={this.state.data.state} />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="country">ENTER COUNTRY</label>
                            <input type="text" id="country" onChange={this.handleChange} value={this.state.data.country} />
                        </div> 
                    </div>
                    <div>
                    <select className="browser-default" id="days" onChange={this.handleChange} value={this.state.data.days}>
                        <option value="" disabled selected>NUMBER OF DAYS</option>
                        <option value="1"> 1</option>
                        <option value="2">2</option>
                        <option value="3"> 3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        
                    </select>
                    </div>

                    <div className="input-field col s12">
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                        CHECK
                         <i className="material-icons right">send</i>
                    </button>
                    </div>
                </form> 
            </div>
            
        )
    }
}
