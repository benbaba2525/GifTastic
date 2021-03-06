$(document).ready(function () {
  
// Initial array of charactors
var charactors = ["Iron Man", "Captain America", "Black Widow", "Thor","Hulk","Ant-Man","Spider-Man"];

// displayCharactorInfo function re-renders the HTML to display the appropriate content
function displayCharactorInfo() {

 var charactor = $(this).attr("data-search");
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +charactor+ "&api_key=6Udiqq9v5j02FwXO6oJOOWE4kA2EA6Q2&limit=10";

  // Creating an AJAX call for the specific charactors button being clicked
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {

// Storing an array of results in the results variable
var results = response.data;
// Deleting the charactors prior to adding new charactors
$("#gifs-appear-here").empty();

// Looping over every result item
for (var i = 0; i < results.length; i++) {
 
 // Only taking action if the photo has an appropriate rating
 if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
 
 
// Creating a div to hold the charactor
var charactorDiv = $("<div class = 'charactor'>");

// Storing the rating data
var rating = results[i].rating;

// Creating an element to have the rating displayed
var pRating = $("<p class='pRating'>").text("Rating :  " + rating);

// Creating an image tag
 var imgURL = $("<img class = 'imageDiv'>") ;

 // Giving the image tag an src attribute of a proprty pulled off the
// result item
imgURL.attr("src", results[i].images.fixed_height_still.url);
imgURL.attr("data-state", "still");
imgURL.attr("data-still", results[i].images.fixed_height_still.url);
imgURL.attr("data-animate", results[i].images.fixed_height.url);


// Appending the paragraph and imgURL we created to the "charactorDiv" div we created
//To Display images and rating

charactorDiv.append(pRating);
charactorDiv.append(imgURL);


// Prepending the charactorDiv to the "#gifs-appear-here" div in the HTML

$("#gifs-appear-here").prepend(charactorDiv);


       }

   };

 });

};

// Function for displaing charactor data

function renderButtons(){

// Deleting the charactors prior to adding new charactors
$("#btn-view").empty();


// Looping through the array of charactors
for (var i = 0; i < charactors.length; i++){

// Then dynamicaly generating buttons for each charactor in the array

    var a = $("<button class='btn btn-primary btn-lg'>");
//Adding a class of charactor-btn to our button 
        a.addClass("charactor-btn");
// Adding a data-attribute
        a.attr("data-search", charactors[i]);
// Providing the initial button text
        a.text(charactors[i]);
// Adding the button to the btn-view div
        $("#btn-view").append(a);

   }

};

// This function handle event where a charactor button is clicked
$("#add-charactor").on("click", function(event){
    event.preventDefault();
    

// This line grabs the input from the textbox
var charactor = $("#charactor-input").val().trim();
//Reset the input box to blank after user submit
charactorForm.reset();
// Adding charactor from textbox to our array
charactors.push(charactor);


// Calling renderButtons which handles the processing of our charactor array
renderButtons();
});

// Adding a click event listener to all elements with a class of "charactor-btn"
$(document).on("click", ".charactor-btn", displayCharactorInfo);

// Calling the renderButtons function to display the intial buttons
      

renderButtons();

function changeState(){

// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
var state = $(this).attr("data-state");
//If the clicked image's state is still, update its src attribute to what its data-animate value is.
//Then, set the image's data-state to animate
//Else set src to data-still value

if(state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
}else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}

};
$(document).on("click", ".imageDiv", changeState);
 
});