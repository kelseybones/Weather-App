//http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function getLocation(){
	var location = document.getElementById("location").value;
    document.activeElement.blur();
	location = location.replace(" ", "%20");
	if (location == ""){
		document.getElementById("location").classList.add("error");
	}
	else {
        document.getElementById("loading-animation").style.display = "block";
        document.getElementById("weather").style.display = "none";
		document.getElementById("location").classList.remove("error");
        setTimeout(function() {
            getWeather(location);
        }, 1000);
	}
}
function getWeather(location){
	var ajax = new XMLHttpRequest();
	var json;
	var apiKEY = "3521a940efd69dc5b6f3dd982d18c618";
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + " ,uk&appid=" + apiKEY + "&units=metric";
	ajax.open("GET", url, true);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200){
            document.getElementById("loading-animation").style.display = "none";
			json = JSON.parse(ajax.responseText);
            document.getElementById("locationForm").classList.remove("centred");
            document.getElementById("locationForm").classList.add("top-left");
			document.getElementById("weather").style.display = "block";
            document.getElementById("weather").classList.remove("hide");
            document.getElementById("weather").classList.add("show");
			if (json != undefined){
				var weather = json.weather[0].main
                var temperature = json.main.temp;
				setIconAndDescription(weather, location, temperature)
                setCookie("lastLocation", location, 1);
			}
			else {
				description = "Oops, I couldn't find the weather in " + location;
				document.getElementById("description").innerHTML = description;
			}
		}
	}
}
function setIconAndDescription(weather, location, temperature){
	var icon;
	var description;
    var backgroundColour;
	weather = weather.toLowerCase();
    switch(weather) {
        case "clear":
        case "clear sky":
            icon = "clear.svg";
            description = "It’s a qwer day out there.";
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#ff3937), to(#ffb554))";
            break;
        case "few clouds":
            icon = "few-clouds.svg";
            description = "Aye she’s no a bad day";
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#ffa538), to(#fff055))";
            break;
        case "scattered clouds":
        case "broken clouds":
        case "clouds":
            icon = "clouds.svg";
            description = "She’s a dull oul’ day";
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#008cae), to(#1acdd1))";
            break;
        case "drizzle":
            icon = "rain.svg";
            description = "It’s a bit fresh out."
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#1e2225), to(#026bc4))";
            break
        case "rain":
        case "light rain":
        case "shower rain":
            icon = "rain.svg";
            description = "It’s lashing down."
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#1e2225), to(#026bc4))";
            break;
        case "thunderstorm":
            icon = "thunder.svg";
            description = "It’s a wile day."
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#1e2225), to(#026bc4))";
            break;
        case "snow":
            icon = "snow.svg";
            description = "Ye wouldne be long gettin’ frostbit."
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#06282f), to(#007273))";
            break;
        case "mist":
            icon = "mist.svg";
            description = "She’s no great.";
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#717171), to(#b3b3b3))";
            break;
        default:
            icon = "default.svg";
            description = "Oops, I couldn't find the weather in " + location;
            backgroundColour = "-webkit-gradient(linear, left top, left bottom, from(#001422), to(#054a5c))";
            break;
    }
	$("#weatherIcon").attr("src", "images/" + icon);
	$("#description").text(description);
    $('#temperature').text(temperature + "°");
    $("body").css({
        background: backgroundColour
    });
}
(function() {
	document.getElementById("btnGo").onclick = getLocation;
    var locationElement = document.getElementById("location")
    function clearTextBoxPlaceholder() {
        this.placeholder = '';
        this.value = '';
    };
    function setTextBoxPlaceholder() {
        this.placeholder = 'Belfast';
    }
    locationElement.onfocus = clearTextBoxPlaceholder;
    locationElement.onblur = setTextBoxPlaceholder;
    var lastLocation = getCookie("lastLocation");
    if (lastLocation != "") {
        getWeather(lastLocation);
        lastLocation = lastLocation.replace("%20", " ");
        document.getElementById("location").value = lastLocation;
    }
	document.getElementById("location").onkeypress = function(key){
		if (key.keyCode == "13"){
			getLocation();
            //Stop enter making a new line
			return false;
		}
	}
})();