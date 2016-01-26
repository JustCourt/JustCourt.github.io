var app = angular.module("app", []);

app.controller("controller", function($scope){
	
	var index = 0;
	
	$scope.continueScreen = false;
	
	$scope.end = false;
	
	$scope.answerScreen = true;
	
	$scope.imgUrl = [];
	
	$scope.answers = [];
	
	$scope.question = "Question 0";
	
	for (var i=0; i < 4; i++){
		$scope.imgUrl[i] = "images/image" + index.toString() + "_" + i.toString() + ".jpg";
		console.log($scope.imgUrl[i]);
	}
	
	//When an answer is chosen
	$scope.chooseAnswer = function(chosenAnswer){
		//Go to next question
		if (index < 5){
			$scope.answers.push(chosenAnswer);
			console.log($scope.answers);
			index++;
			for (var i=0; i<4; i++){
				$scope.imgUrl[i] = "images/image" + index.toString() + "_" + i.toString() + ".jpg";
				$scope.question = "Question " + index.toString();
			}
			$scope.answerScreen = false;
			$scope.continueScreen = true;
			console.log($scope.imgUrl[i]);
		}
		
		//Go to End Screen
		else{
			$scope.answerScreen = false;
			$scope.end = true;
			console.log("DONE");
		}
	}
	
	//Go from continue screen to answer screen
	$scope.gotoAnswers = function(){
		
		$scope.continueScreen = false;
		$scope.answerScreen = true;
	
	}
	
});
