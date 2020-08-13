/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

//Personal API key for openWeatherMap API
const API_key= '&appid=3cb63d8772cd2424f9b5c0c5d2333b58';

// to call current weather data by zip code
const base_url= 'http://api.openweathermap.org/data/2.5/forecast?zip=';


// An event listener to an existing HTML button from DOM using Vanilla JS. 

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const zipCode = document.getElementById('zip').value;
const feeling = document.getElementById('feelings').value;

current_weather(base_url, zipCode, API_key)
  

   .then(function (data){
     
        console.log(data);
        postData('/addData', {temp: data.temp, date: newDate, feeling: feeling })

        updateUI();
   
})

};



//To make a GET request to the OpenWeatherMap API.

const current_weather = async (base_url, zip, key) => {
    const res = await fetch(base_url + zip + key)
    try {
        
        const data = await res.json();
        console.log(data)
        return data;
    }
    catch(error) {
        console.log('error', error);
        
    }
}



//POST request to add the API data, as well as data entered by the user

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
        //To handle the error 
    }
}


// To update UI dynamically 

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allTheData = await request.json();
        document.getElementById('date').innerHTML = allTheData[0].date;
        document.getElementById('temp').innerHTML = allTheData[0].temp;
        document.getElementById('content').innerHTML = allTheData[0].feeling;
    }
    catch (error) {
        console.log('error', error);
    }
}