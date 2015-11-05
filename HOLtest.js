
// Question object
function question(text){
		this.text = text;
};

// Actions when document is loaded
$(document).ready(function(){
	
	// initalize user answers
	var user = [];
	
	// set question index
	var q=0;
	var gallery = [];
	
	// create question instances, add image urls to gallery
	var questions = [];
	for (var i= 0; i<3; i++){
		for (var j=0; j<4; j++){
			im = new Image();
			im.src = "images/image" + i + "_" + j + ".jpg";
			gallery.push(im);
		}
		
		var text = $("#q"+i).text();
		questions.push(new question(text));
	};
	
	// Change opacity of answer when held
	$(".answer").mousedown(function(){
		$(this).fadeTo(0.75);
	});
	$( ".continue" ).text(questions[q].text);	
	
	// Changes question when image is clicked
	$(".answer").click(function(){
		
		// Adds answer chosen to record
		user.push(this.id);
		
		q++;
		
		
		
		// If all questions have been answered
		if (q == questions.length)
		{
			$(".answer").css("display","none");
			$( ".end" ).css("display","block");
			console.log(user);
			
			// Create csv file recording data and download
			var csvContent = "data:text/csv;charset=utf-8,";
			userString = user.join(",");
			csvContent += userString;
			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "my_data.csv");
			link.click();

		}
		
		// Changes to continue page, hides answers, shows next question
		else
		{
			$( ".answer" ).css("display", "none");				// Set answers to hidden
			$( ".continue" ).text(questions[q].text);			// Set continue screen to show next question
			$( ".continue" ).css("display","block");			// Show continue screen
			
		}

	});
	
	// When continue is clicked
	$( ".continue" ).click(function()
		{
			for (var i=0; i<4; i++) 						// Change answers to new images
			{
				var id = "#i"+(i+1);
				$(id).attr("src", gallery[q*4+i].src);
			}
			$( ".continue" ).css("display", "none"); 		// Set continue screen to hidden

			$( ".answer" ).css("display", "inline-block");	 // Set answer display to not hidden

		});
	$( ".answer" ).css("background-color","blue");	

});

