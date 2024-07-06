let search= document.getElementById('search')
let btnSearch=document.getElementById('btnSearch')

async function getData(searchCity){
    let data = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=4c20e5e094d74daea77203858241206&q=${searchCity}&days=3`)
    let result = await data.json()
    console.log(result);
    displayNow(result.location,result.current)
    displayDay2(result.forecast.forecastday);
    displayDay3(result.forecast.forecastday);
    }
    getData("alex")
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    search.addEventListener('keyup',function(){
        getData(this.value)
    })

function displayNow(data,result){
    let cartona=``
    let date = new Date(result.last_updated);
    // console.log(new Date(result.last_updated))
        cartona +=`
        <div class="header d-flex justify-content-between align-items-center flex-wrap">
                            <div>${days[date.getDay()]}</div> <div>${date.getDate()+monthNames[date.getMonth()]}</div>
                            </div>
                        <div class="name my-4 fw-semibold">${data.name}</div>
                        <div>
                            <div class="temp">${result.temp_c}<sup>o</sup>C</div> <div><img class="w-25" src="https:${result.condition.icon}" alt=""></div>
                            </div>  
                            <div class="h5">${result.condition.text}</div>
                            <div class="d-flex justify-content-around my-4">
                            <span><img class="px-2" src="imgs/icon-umberella.png" alt="">${result.cloud}%</span>
                            <span><img class="px-2" src="imgs/icon-wind.png" alt="">${result.wind_kph}km/h</span>
                            <span><img class="px-2" src="imgs/icon-compass.png" alt="">${result.wind_dir}</span>
                            </div>
                            
                            ` 
    document.getElementById('current').innerHTML= cartona
}


function displayDay2(forecastDay) {
    let cartona = "";
    //   console.log(forecastDay[2]);
        cartona+=`
        <div id="day2" class="forecastDay2">
        <div d-flex justify-content-center align-items-center text-center">
                <div class="header">${days[new Date(forecastDay[1].date).getDay()]}</div>
                <div class="my-4"><img class="w-25" src="https:${forecastDay[1].day.condition.icon}"</div>
                <div class="d-flex flex-column gap-5">
                <div class="h3">${forecastDay[1].day.maxtemp_c}<sup>o</sup>C</div>
                <div class="h5">${forecastDay[1].day.mintemp_c}<sup>o</sup>C</div>
                <div>${forecastDay[1].day.condition.text}</div>  
                </div>
            </div>  
        </div>

        `
    document.getElementById('day2').innerHTML= cartona
    }
    function displayDay3(forecastDay) {
    let cartona = "";
    //   console.log(forecastDay[2]);
        cartona+=`
        <div id="day2" class="forecastDay2">
                    <div d-flex justify-content-center align-items-center text-center">
                    <div class="header">${days[new Date(forecastDay[2].date).getDay()]}</div>
                <div class="my-4"><img class="w-25" src="https:${forecastDay[2].day.condition.icon}"</div>
                <div class="d-flex flex-column gap-5">
                <div class="h3">${forecastDay[2].day.maxtemp_c}<sup>o</sup>C</div>
                <div class="h5">${forecastDay[2].day.mintemp_c}<sup>o</sup>C</div>
                <div>${forecastDay[2].day.condition.text}</div>  
                </div>
                </div>  
        </div>
        
        `
        document.getElementById('day3').innerHTML= cartona
        }
        
        
btnSearch.addEventListener('click',function(){
    navigator.geolocation.getCurrentPosition(pos=> {
        let lon=pos.coords.latitude
        let lat=pos.coords.longitude
        getData(`${lon},${lat}`);
      });
})