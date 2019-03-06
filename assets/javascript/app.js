let queryURL;
let imageURL;
let newImage;
let imageBlock;
let state;
let searches = ["sloth", "penguin", "tapir", "armadillo", "seahorse", "meerkat", "prairie dog", "red panda", "anteater"];


// Function to populate gifs.
function getGifs() {
    let searchTerm = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=F10hIY7hLjL5VH0y6agL2XfJIjCL23kn&q=" + searchTerm + "&limit=10&rating=PG";
    console.log(queryURL);
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.data);
        let results = response.data;
        let newGifSearch = $("<span>");
        for (var i = 0; i < results.length; i++) {
            let animalSet = $("<span>");
            let p = $("<span>").text("Rating: " + results[i].rating);
            p.addClass("card-title");
            let newImage = $("<img>");
            newImage.attr("src", results[i].images.fixed_height_still.url);
            newImage.attr("data-still", results[i].images.fixed_height_still.url);
            newImage.attr("data-animate", results[i].images.fixed_height.url);
            newImage.attr("data-state", "still")
            newImage.addClass("gif card-img-top");
            animalSet.append(newImage);
            animalSet.append(p);
            animalSet.addClass("card float-left text-center");
            newGifSearch.prepend(animalSet);
        };
        $("#images").html(newGifSearch);
    });
};

// Function for populating buttons
function renderButtons() {
    $("#buttons").empty();
    for (let i = 0; i < searches.length; i++) {
        let a = $("<button>");
        a.addClass("animal btn-lg");
        a.attr("data-name", searches[i]);
        a.text(searches[i]);
        $("#buttons").append(a);
    }
};

// Function to animate/pause gifs
function animatedGif() {
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "moveit");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

// Click function to add input search term into array of searches
$("#add-search").on("click", function(event) {
    event.preventDefault();
    var search = $("#search-input").val().trim();
    searches.push(search);
    renderButtons();
    $("#search-input").val("");
});

// Click function to pull getGifs even when more buttons are populated.
$(document).on("click", ".animal", getGifs);

// Click function to change between still and moving.
$(document).on("click", ".gif", animatedGif);

renderButtons(searches);