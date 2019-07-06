app.controller('baseController', function ($scope) {

    //分页控件配置
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            $scope.reloadList();
        }
    };
    $scope.reloadList = function () {
        $scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage)

    };

    $scope.selectIds = [];
    $scope.updateSelection = function ($event, id) {
        if ($event.target.checked) {
            $scope.selectIds.push(id);
        } else {
            var idx = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx, 1);
        }
    };

    $scope.selectCheck = function (id) {
        for (let i = 0; i < $scope.selectIds.length; i++) {
            if (id === $scope.selectIds[i]) {
                return true;
            }
        }
        return false;
    };



    $scope.jsonToString = function (jsonString, key) {
        var json = JSON.parse(jsonString);
        var value = "";

        for (var i = 0; i < json.length; i++) {
            if (i > 0) {
                value += ",";
            }

            value += json[i][key];
        }
        return value;
    }

});