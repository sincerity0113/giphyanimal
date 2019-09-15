console.log("JavaScript is loaded")
$(document).ready(function(){

var movies = ["Cats", "Kittens", "Dogs", "Puppies", "Hamsters", "Birds"];
var movieTitle = "";
renderButtons();

// this creates the buttons
function renderButtons() {
	$("#buttonDiv").empty();
	for (var i = 0; i < movies.length; i++) {
		var b = $("<button>");
			b.addClass("movieButton btn btn-primary");
			b.css("margin", "10px");
			b.attr("data-name", movies[i]);
			b.text(movies[i]);
			$("#buttonDiv").append(b);
		};
	};

// this generates a new button from form entry and then clears the form
$(document.body).on('click', '#submitBtn', function() {
	event.preventDefault();
	var newMovie = $("#formInput").val().trim();
	movies.push(newMovie);
	renderButtons();
	$("#formInput").val("");
	});

// this displays the gifs when you click on a movie title
$(document.body).on('click', '.movieButton', function() {
	movieTitle = $(this).attr("data-name");
	// console.log(movieTitle);
	$("#giphyDiv").empty();
	for (i=0; i<10; i++) {
		// console.log(i);
		getGiphy(i, movieTitle);
	};
});


function getGiphy(i, title) {
	// var title = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=w6skDb3bVpSH3akfsKjgt2h2jfKq4Iou&q=" + title + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    	}).done(function(response) {
    		var still = response.data[i].images.fixed_width_still.url;
    		var animate = response.data[i].images.fixed_width.url;
    		// console.log(still);
    		// console.log(animate);
    		var gifDiv = $("<div class='gifs panel panel-info'>");
    		var rating = response.data[i].rating;
    		var display = $("<p>").text("click to animate or stop");
    		var labelNum = i + 1;
    		var label = $("<h4>").text(title);
 	    	var stillImage = $("<img>");
 	    	stillImage.attr({"data-still":still, "data-animate":animate, "data-state":"still", "src":still, "id":title+"label"+i});
 	    	stillImage.addClass("btn btn-default gifImage");
    		gifDiv.append(label); 	    	   		
    		gifDiv.append(display);
    		gifDiv.append(stillImage);
    		gifDiv.attr("id", "gif" + i);
    		gifDiv.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"10px", "text-align":"center"})
    		$("#giphyDiv").append(gifDiv);
	});
};

// This enables animation when the user clicks on the gif image
$(document.body).on('click', '.gifImage', function() {
	var t = $(this);	
	var state = t.attr("data-state");
	if (state === "still") {
	  t.attr("src", t.attr("data-animate"));
	  t.attr("data-state", "animate");
	} else {
	  t.attr("src", t.attr("data-still"));
	  t.attr("data-state", "still");
	 }

});


//this closes the (document).ready function.  Do not delete!
});