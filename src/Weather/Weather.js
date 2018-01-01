import React, { Component } from 'react';
import './Weather.css';
import Api from '.././Api.json';

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            url: `http://api.wunderground.com/api/${Api.key}/conditions/q/newyork,ny.json`,
            color:'rgb(251, 106, 106)',
            col: 'rgb(73, 35, 223)'
        }
        this.getData = this.getData.bind(this);
        this.handleClick=this.handleClick.bind(this);
       
    }
    getData() {
        let url = this.state.url;

        fetch(url).then(function (res) {
            return res.json();
        }).then(function (data) {
            this.setState({
                location: data.current_observation.display_location.full,
                date: data.current_observation.observation_time.substr(16),
                weather: data.current_observation.weather,
                icon: data.current_observation.icon_url,
                tempF: Math.round(data.current_observation.temp_f),
                tempC: Math.round(data.current_observation.temp_c),
                tempFnew: Math.round(data.current_observation.temp_f),
                //    windMPH: data.current_observation.wind_mph,
                //    precipitation: data.current_observation.precip_today_metric,
                errorMsg: '',

            });
        }.bind(this));
    }
    componentDidMount() {
        this.getData();
        
        navigator.geolocation.getCurrentPosition(function (position) {
            this.setState({
                url: `http://api.wunderground.com/api/${Api.key}/conditions/q/${position.coords.latitude},${position.coords.longitude}.json`
            }, () => {
                this.getData();
                
            });
        }.bind(this));
     
    }
    handleClick() {
    
        // console.log(url);
       
      
            if(this.state.color === 'rgb(251, 106, 106)' && this.state.col==='rgb(73, 35, 223)'){
                this.setState({
                    color:'rgb(73, 35, 223)',
                    col:'rgb(251, 106, 106)',
                    tempF: this.state.tempC
                });
            }
             if(this.state.color === 'rgb(73, 35, 223)' && this.state.col==='rgb(251, 106, 106)'){
                this.setState({
                    color:'rgb(251, 106, 106)',
                    col:'rgb(73, 35, 223)',
                    tempF: this.state.tempFnew
                });
            }  
            console.log(this.state.tempF);

    }
    render() {
      
        return (

            <div className = "container" >

                <div className="weather-status">{this.state.weather}</div>
                <div className="weather-img"><img src={this.state.icon} alt="weather"></img></div>
                <div className="degree">{this.state.tempF}°</div>


                <div className="far-toggle degree-metrics"><a onClick={this.handleClick} style={{color:this.state.color}} >Fahrenheit</a></div>
                |
                <div className="celsius-toggle degree-metrics"><a onClick={this.handleClick} style={{color:this.state.col}}>Celsius</a></div>

                <div className="location">Your Location: {this.state.location}</div>
                <div className="date">{this.state.date}</div>
            
           </div>

        );
    }
}

export default Weather;
