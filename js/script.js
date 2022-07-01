const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const d = new Date();
let month = months[d.getMonth()];
let day = d.getDate();
let weekDay = days[d.getDay()];
let nextDay = days[d.getDay()+1];
let snextDay = days[d.getDay()+2];


let myresponse ;
let responseData;
let currCity="cairo";
let currDegree , currWind ,currIcon ,currStatus ;

let searchInput=document.getElementById("searchInp");
let searchBtn = document.getElementById("searchBtn");
// console.log(searchInput.value);

async function getWeather (){
    myresponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0e41007243994cb198b123510221906&q=${currCity}&days=3`);
    responseData= await myresponse.json();
   
     
   
    displayCurrDayWeather()
    nextDayWeather()
    secNextDayWeather()
}
getWeather ()

function displayCurrDayWeather(){

    currCity=responseData.location.name;
    currDegree=responseData.current.temp_c;
    currStatus=responseData.current.condition.text
    currIcon=responseData.current.condition.icon
    currWind= responseData.current.wind_kph
    currHumidity=responseData.current.humidity
    let currentDay =`
        <div class="card-head p-2 d-flex justify-content-between">
            <div class="day py-2">${weekDay}</div>
            <div class="date end-0  py-2">${day}${month}</div>
        </div>

        <div class="card-body ">
            <div class="location">${currCity}</div>
            <div class="degree py-4">
                 ${currDegree} °C
                 <img src="${currIcon}" class="w-25" alt="" />
            </div>

            <div class="status py-2">${currStatus}</div>

            <div class="summary py-3">
                <img src="img/icon-umberella.png" alt="" />
                <span> ${currHumidity} % </span>
                <img src="img/icon-wind.png" alt="" />
                <span>  ${currWind} km/h </span>
                <img src="img/icon-compass.png" alt="" />
                <span> East </span>
            </div>
     </div>`;
  document.getElementById("currDay").innerHTML=currentDay;

}

function  nextDayWeather(){

   document.getElementById("nextDay").innerHTML= nextDay;
   document.getElementById("nextDMaxtemp").innerHTML= responseData.forecast.forecastday[1].day.maxtemp_c;
   document.getElementById("nextDMintemp").innerHTML=  responseData.forecast.forecastday[1].day.mintemp_c;
   document.getElementById("nextDStatus").innerHTML= responseData.forecast.forecastday[1].day.condition.text;

   let nextDicon=responseData.forecast.forecastday[1].day.condition.icon;
   document.getElementById("nextDicon").innerHTML= `<img src="${nextDicon}" class="py-3 w-25" alt="" />`
}

function  secNextDayWeather(){

    document.getElementById("snextDay").innerHTML= snextDay;
    document.getElementById("snextDMaxtemp").innerHTML= responseData.forecast.forecastday[2].day.maxtemp_c;
    document.getElementById("snextDMintemp").innerHTML=  responseData.forecast.forecastday[2].day.mintemp_c;
    document.getElementById("snextDStatus").innerHTML= responseData.forecast.forecastday[2].day.condition.text;
 
    let snextDicon=responseData.forecast.forecastday[2].day.condition.icon;
    document.getElementById("snextDicon").innerHTML= `<img src="${snextDicon}" class="py-3 w-25" alt="" />`
 }
 searchInput.addEventListener("keyup",search)
 searchBtn.addEventListener("click",search)
 function search(){
    currCity=searchInput.value;
    getWeather()
    console.log(searchInput.value)
 }