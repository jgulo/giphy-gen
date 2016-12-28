var items = ["michael scott", "dwight schrute", "jim halpert", "pam beesly", "kevin malone"];

function renderButtons(){
	$("#buttons").empty();

	for(var i=0; i<items.length;i++){
		var a=$("<button>");
		a.addClass("gifButton");
		a.attr("data-name", items[i]);
		a.text(items[i]);

		$("#buttons").append(a);
	}
}

renderButtons();



$("#add-button").on("click", function(event){
	event.preventDefault();

	var buttonItem = $("#searchItem").val().trim();
	items.push(buttonItem);
	renderButtons();
});

$(".gifButton").on("click",function(){
	$("#gifContainer").empty()
	var gifData = $(this).data("name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        gifData + "&api_key=dc6zaTOxFJmzC&limit=20";

    $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          console.log(response)
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#gifContainer").prepend(gifDiv);
          }
        });
})

//$(document).on("click", ".gitButton", displayGif);

