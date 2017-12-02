//GLOBAL VARIABLES

//Array: Buttons to be created dynamically based on array items
var buttonArray = ["cat", "dog", "bird", "frog"];



//FUNCTION 1: For each item in the buttonArray, create a button w/ text and data-animal and append
function createButton() {
    $(".buttonDiv").empty(); //Empties div of array currently displayed


    //For each item item in array, create a button, add data-animal and text attributes = array item, display button
    buttonArray.forEach(function (element, index, myArray) {
        var button = $("<button type='button' class='btn btn-default gifButton'>");
        button.attr("data-animal", element);
        button.text(element);
        $(".buttonDiv").append(button);
    });

};


//FUNCTION 2: When gifButton is clicked, run an ajax request for gifs = data-animal of clicked button
function createGif() {
    var queryURL = "https://api.giphy.com/v1/gifs/search";
    var animal = $(this).attr("data-animal")

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: animal,
            "api_key": "T670yjZdJcSE8EnsVaVaNzeYWhmpEArS",
            limit: 10, //Return 10 gifs (Default 25)
        }
    }).done(function (response) { //Once the ajax request receives a response run the following anonymous callback function:
        
        console.log(response);

        var dataArray = response.data;
       
        //Empty the gifHolder div of gifs that are there (from previous buttons clicked)
        $(".gifHolder").empty();

        //For each item in the dataArray (each item is a different gif, 10 total)
        for (var i =0; i< dataArray.length; i++) { //Decide if this should be forEach instead

            //Create an image element w/ class giphyImage
            var gifImage = $("<img class = 'giphyImage'>");

            //Assign the url for still gif from response object to a varibale
            var stillURL = dataArray[i].images.fixed_height_still.url; //Determine type of URL to use for still

            //Assign the url for animated gif from response object to a varibale
            var animatedURL = dataArray[i].images.fixed_height.url;//Determine type of URL to use for animated gif

            //Assign the image element an attribute = stillURL
            $(gifImage).attr("data-still", stillURL);

            //Assign the image element an attribute = animatedURL
            $(gifImage).attr("data-animate", animatedURL);
            
            //Assign the image element a src property = dataStill (still url for gif)
            $(gifImage).attr("src", gifImage.attr("data-still"));

            //Assign the image element an attribute data state = "still"; will toggle still/animated to track whether gif is moving or not
            $(gifImage).attr("data-state", "still");

            //Display the gif in the DOM
            $(".gifHolder").append(gifImage);

            //Add steps to dispaly rating as well, will need to create a paragraph, determine styling (flexbox?)

            console.log(gifImage)

        }
    });
}

//FUNCTION 3: When gifImage is clicked, change the gif displayed from still --> animated or animated --> still
function gifClicked(){

    var state = $(this).attr("data-state"); //Assign variable to track current state of the gif (still or animated)

    if (state === "still"){ //If gif is currently still:

        $(this).attr("src", $(this).attr("data-animate")); //Change the src property = the animatedURL, causing gif to move
        $(this).attr("data-state", "animate"); //Toggle the data-state attribute to animated
        

    } else { //If gif is moving
        $(this).attr("src", $(this).attr("data-still")); //Change the src property = the stillURL, making gif still
        $(this).attr("data-state", "still"); ////Toggle the data-state attribute to still

    }

};
        
//FUNCTION 4: When input is entered in search, take the value of input and dynamically create a button and add to array

function searchButton (event){
    event.preventDefault(); //Prevents submit button from trying to send input somewhere

    //If the user does not enter a value in the search bar, do nothing.
    if ($("#searchField").val().trim() == ""){ 
        return 
    
    //If value entered in search, take value of what is in search field, remove white space and set = to variable.
    } else {
        var animalSearch = $("#searchField").val().trim()

        //Add search term into button Array
        buttonArray.push(animalSearch);

        //Call function to recreate buttons from array with new search term included
        createButton();

    }
};


      // ------ CODE TO RUN--------------

createButton();

//Call createGif function when element with class gifButton is clicked (Defined above)
$(document).on("click", ".gifButton", createGif); 

//Call gifClicked function when element with class gifButton is clicked (Defined above)
$(document).on("click", ".giphyImage", gifClicked);

//Call searchButton function when submit button is  clicked (Defined above)
$(".searchGif").on("click", searchButton);