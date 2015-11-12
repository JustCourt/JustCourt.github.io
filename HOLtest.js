
// Question object
function question(text, ans){
		this.text = text;
		this.ans = ans;
};

// Set answers for question q to be displayed
function displayAnswers(q, gallery){
	
	for (var i=0; i<4; i++) 						// Change answers to new images
	{
		var id = "#i"+(i+1);
		$(id).attr("src", gallery[q*4+i].src);
		$("#a"+i).attr("name", gallery[q*4+i].value);//change name of image div to image value
	}
	$( ".continue" ).css("display", "none");	// Set continue screen to hidden
	$( ".end" ).css("display", "none");	// Set end screen to hidden
	$( ".answer" ).css("display", "inline-block");	 // Set answer display to not hidden

		
};

// Actions when document is loaded
$(document).ready(function(){
	
	// initalize user answers
	var user = [];
	var score = 0;
	
	// set question index
	var q=0;
	var gallery = [];
	
	// create question instances, add image urls to gallery
	var questions = [];
	for (var i= 0; i<3; i++){
		for (var j=0; j<4; j++){
			ans = [];
			im = new Image();
			im.src = "images/image" + i + "_" + j + ".jpg";
			gallery.push(im);                          
		}
		
		var text = $("#q"+i).text();
		var ans = $("#q"+i).attr("name");
		questions.push(new question(text, ans));
	};

	
	// Change opacity of answer when held
	$(".answer").mousedown(function(){
		$(this).fadeTo(0.75);
	});
	$( ".continue" ).text(questions[q].text);	
	
	// Changes question when image is clicked
	$(".answer").click(function(){

		
		// Adds answer chosen to record
		var answer = $(this).attr("id");
		user.push(answer);
		
		// Add to score if correct answer
		if (answer == questions[q].ans){
			score += 1;
		}
		
		q++;
		
		
		
		// If all questions have been answered
		if (q == questions.length)
		{
			$( ".answer" ).css("display","none");
			$( "#button" ).css('display','none');
			$( ".end" ).html($( ".end" ).html() + "<br/> " + score);
			$( ".end" ).css("display","block");
			console.log(user);
			
			// Create csv file recording data and download
			var csvContent = "data:text/csv;charset=utf-8,";
			userString = user.join(",");
			csvContent += userString;
			var encodedUri = encodeURI(csvContent);
			$link = $("#submit");
			$link.attr("href", encodedUri);
			$link.attr("download", "my_data.csv");

		}
		
		// Changes to continue page, hides answers, shows next question
		else
		{
			$( ".answer" ).css("display", "none");				// Set answers to hidden
			$( ".continue" ).text(questions[q].text);			// Set continue screen to show next question
			$( ".continue" ).css("display","block");			// Show continue screen
			
		}

	});
	
	// When continue screen is clicked
	$( ".continue" ).click(function()
		{
			$( "#back" ).css("display","inline");
			displayAnswers(q,gallery);
		});

	
	//If BACK button is clicked
	$("#back").click(function()
	{
		//going back to previous question
		if ($( ".continue" ).css('display') == 'block' || $(".end").css('display')=='block'){
			q = q-1;
			user.splice(-1,1);
			displayAnswers(q,gallery);
		}
		//going back to continue screen
		else if ($( ".continue" ).css('display') == 'none'){
			$( ".answer" ).css("display", "none");
			$( ".continue" ).text(questions[q].text);
			$( ".continue" ).css("display", "block");
			if (q==0){
				$("#back").css("display","none");
			}
		};
	});
	$( ".answer" ).css("background-color","blue");
	

});

