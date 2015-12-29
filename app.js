function getLocation(){
	
	var location = document.getElementById("location").value;
	
	location = location.replace(" ", "%20");
	
	if (location == ""){

		document.getElementById("location").classList.add("error");
		
	}
	else {		
		document.getElementById("location").classList.remove("error");
		getWeather(location);
		
	}
}

function getWeather(location){

	var ajax = new XMLHttpRequest();
	
	var json; 

	var apiKEY = "3521a940efd69dc5b6f3dd982d18c618";	
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + " ,uk&appid=" + apiKEY;
	ajax.open("GET", url, true);	
	ajax.send();	
	ajax.onreadystatechange = function(){

		if (ajax.readyState == 4 && ajax.status == 200){
			 
			json = JSON.parse(ajax.responseText);

//			document.getElementById("locationForm").style.display = "none";
            document.getElementById("locationForm").classList.remove("centred");
            document.getElementById("locationForm").classList.add("top-left");
			document.getElementById("weather").style.display = "block";
			
			if (json != undefined){
				
				var weather = json.weather[0].main
				setIconAndDescription(weather, location)
				
			}	
			else {
				
				description = "Oops, I couldn't find the weather in " + location;
				document.getElementById("description").innerHTML = description;
		
			}
		}
	}
}

function setIconAndDescription(weather, location){

	var icon;
	var description;
	
	weather = weather.toLowerCase();
		
	if (weather == "clear sky"
		|| weather == "clear"){
		
		icon = "clear.svg";
		description = "It’s a qwer day out there.";
		
	}
	else if (weather == "few clouds"){
		
		icon = "few-clouds.svg";
		description = "Aye she’s no a bad day";
		
	}
	else if (weather == "scattered clouds" 
		|| weather == "broken clouds" 
		|| weather == "clouds"){
		
		icon = "clouds.svg";
		description = "She’s a dull oul’ day";
		
	}
	else if (weather == "rain"
	|| weather == "light rain"
	|| weather == "shower rain"){
		
		icon = "rain.svg";
		description = "It’s lashing down."
		
	}
	else if(weather == "thunderstorm"){
		
		icon = "thunder.svg";
		description = "It’s a wile day."
		
	}
	else if (weather == "snow"){
		
		icon = "snow.svg";
		description = "Ye wouldne be long gettin’ frostbit."
		
	}
	else if (weather == "mist"){
		
		icon = "mist.svg";
		description = "She’s no great.";
		
	}
	else {
		
		icon = "default.svg";
		description = "Oops, I couldn't find the weather in " + location;
		
	}

	document.getElementById("weatherIcon").src = "images/" + icon;
	document.getElementById("description").innerHTML = description;
	
}

(function() {

	document.getElementById("btnGo").onclick = getLocation;
    
    var locationElement = document.getElementById("location")
       
    
    function clearTextBoxPlaceholder() {
        this.placeholder = '';
    };
    
    function setTextBoxPlaceholder() {
        this.placeholder = 'e.g. Belfast';
    }
    
    locationElement.onfocus = clearTextBoxPlaceholder;
    locationElement.onblur = setTextBoxPlaceholder;


	document.getElementById("location").onkeypress = function(key){
		
		if (key.keyCode == "13"){
			
			getLocation();
			
		}
	}

})();