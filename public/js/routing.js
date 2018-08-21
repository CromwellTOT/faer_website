app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/home", {
		redirectTo: "/divideCost"
	}).when("/divideCost", {
		templateUrl: "template/divide.html",
		controller: "divideCostCtrl"
	}).otherwise({
		redirectTo: "/home"
	})
}]);

// Home page controller
app.controller("divideCostCtrl", ["$scope", function($scope) {
	$scope.mainBed = {
		"name" : "主卧"
	}
	$scope.secondBed = {
		"name" : "次卧"
	}
	$scope.livingRoom = {
		"name" : "客厅"
	}
	$scope.option = {
		calBasedOnGross: false
	}
	$scope.concession = 1;
	$scope.huxing = "twoBed";
	$scope.totalNet = 0;

	$scope.updateTotal = function() {
		console.log("updateTotal", $scope.totalGross);

		let totalGross = $scope.totalGross;
		if(!totalGross) return;
		if($scope.totalMonth <= 0 || $scope.freeMonth <= 0) return;

		if($scope.totalMonth && $scope.freeMonth) {
			$scope.concession = ($scope.totalMonth - $scope.freeMonth) / $scope.totalMonth;
		}

		let concession = $scope.concession,
			mainBed    = $scope.mainBed,
			secondBed  = $scope.secondBed,
			livingRoom = $scope.livingRoom;

		$scope.totalNet = totalGross * concession;

		let totalNet = $scope.totalNet;


		if($scope.huxing == 'twoBed') {
			if(totalGross < 4300) return;

			if($scope.option.calBasedOnGross) {
				secondBed.gross  = totalGross / 3;
				secondBed.net 	 = secondBed.gross * concession;
				secondBed.percentage  = secondBed.net / totalNet;

				mainBed.gross    = secondBed.gross + 250;
				mainBed.net      = mainBed.gross * concession;
				mainBed.percentage    = mainBed.net / totalNet;

				livingRoom.gross = secondBed.gross - 250;
				livingRoom.net   = livingRoom.gross * concession;
				livingRoom.percentage = livingRoom.net / totalNet;
			} else {
				secondBed.net    = totalNet / 3;
				secondBed.gross  = secondBed.net / concession;
				secondBed.percentage  = secondBed.net / totalNet;

				mainBed.net      = secondBed.net + 250;
				mainBed.gross    = mainBed.net / concession;
				mainBed.percentage    = mainBed.net / totalNet;

				livingRoom.net   = secondBed.net - 250;
				livingRoom.gross = livingRoom.net / concession;
				livingRoom.percentage = livingRoom.net / totalNet;
			}
		} else if($scope.huxing == 'oneBed') {
			if(totalGross < 3000) return;
			
			if($scope.option.calBasedOnGross) {
				mainBed.gross    = totalGross / 2 + 100;
				mainBed.net      = mainBed.gross * concession;
				mainBed.percentage    = mainBed.net / totalNet;

				livingRoom.gross = totalGross / 2 - 100;
				livingRoom.net   = livingRoom.gross * concession;
				livingRoom.percentage = livingRoom.net / totalNet;
			} else {
				mainBed.net      = totalNet / 2 + 100;
				mainBed.gross    = mainBed.net / concession;
				mainBed.percentage    = mainBed.net / totalNet;

				livingRoom.net   = totalNet / 2 - 100;
				livingRoom.gross = livingRoom.net / concession;
				livingRoom.percentage = livingRoom.net / totalNet;
			}
		}
	}

	$scope.updateHuXing = function() {
		reset();

		console.log($scope.option);

		if($scope.huxing == 'twoBed') {
			$($("#secondBed")[0]).show();
			$scope.mainBed.name = "主卧";
		} else if($scope.huxing == 'oneBed') {
			$($("#secondBed")[0]).hide();
			$scope.mainBed.name = "卧室";
		}
	}

	function reset() {

	}

}]);


