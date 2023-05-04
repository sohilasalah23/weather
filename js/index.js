

    // start code 
    search()
async function search(place="cairo") {
  let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2e8054b6f7184e80889173433232502&q=${place}&days=3`)
  let finalres = await res.json()
  console.log(finalres);
  if(finalres.error){
  console.log("there is an error");
  search()
   
  }else{
    displaytoday (finalres.location,finalres.current)
    displaytomorrow(finalres.forecast.forecastday)
    console.log(finalres)
  }
}
document.getElementById("search").addEventListener("keyup",()=> getinfo())

function getinfo(){
  let searchVal = document.getElementById("search").value;
  // console.log(searchVal)
  search(searchVal)

}

 const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
    

function displaytoday (loc,now){
  cartona =``
  if(null!=now ){
    let date = new Date(now.last_updated)
cartona += `    
 <div class="forecact-header d-flex justify-content-between text-gray py-2 px-3">
<div class="day">${days[date.getDay()]}</div>
<div class="date">${date.getDate()+monthNames[date.getMonth()]}</div>
</div>
<div class="forecact-content h-100">
<div class="location text-gray my-3 fs-5">${loc.name}</div>
<div class="degree d-flex ">
    <div class="num text-white fw-bold me-3  ">${now.temp_c}<sup>o</sup>C</div>
  
    <div class="forecast-icon d-flex align-items-center">
        <img src="https:${now.condition.icon}" alt="" width="90">
    </div>	
</div>
<div class="custom text-primary py-2">${now.condition.text}</div>
<span class="text-gray"><img src="img/img4.png" class="mx-1" alt="">20%</span>
<span class="text-gray"><img src="img/img5.png" class="mx-1" alt="">18km/h</span>
<span class="text-gray"><img src="img/img6.png" class="mx-1" alt="">East</span>

</div>`
  }
  document.getElementById("current-weather").innerHTML = cartona
}

 function  displaytomorrow(loc) {
  cartona=``
  for(let i=1 ; i<3 ; i++){
    cartona += `
    <div class="col-lg-6 ">
     <div class=" text-center  ">
    <div class="forecact-header d-flex justify-content-center text-gray py-2 px-3">
        <div class="day">${days[new Date(loc[i].date).getDay()]}</div>     
    </div>
    <div class="forecact-content my-2">
        <div class=""> 
         <img src="http:${loc[i].day.condition.icon}" alt="" width="70"></div>
        <div class="degree  ">
            <div class=" text-white fw-bold me-3 fs-5 my-1  ">${loc[i].day.maxtemp_c}<sup>o</sup>C</div>
            <div class=" text-gray fw-bold me-3 fs-5 my-1  ">${loc[i].day.mintemp_c}<sup>o</sup></div>
    </div>
    <div class="custom text-primary py-2"> ${loc[i].day.condition.text}</div>
</div>
</div>
</div> `
  }
  document.getElementById("future-forecast").innerHTML = cartona

}


