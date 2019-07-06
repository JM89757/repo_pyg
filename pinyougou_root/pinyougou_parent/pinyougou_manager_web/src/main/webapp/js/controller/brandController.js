app.controller('brandController', function ($scope, $controller, brandService) {


    $controller('baseController', {$scope: $scope});



    $scope.findAll = function () {
        brandService.findAll().success(
            function (data) {
                $scope.list = data;
            }
        );
    };

    /*
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

        };*/

    $scope.findPage = function (page, rows) {
        brandService.findPage(page, rows).success(
            function (data) {
                $scope.list = data.rows;
                $scope.paginationConf.totalItems = data.total;
            }
        );
    };

    $scope.findOne = function (id) {
        brandService.findOne(id).success(
            function (data) {
                $scope.entity = data;
            }
        );
    };

    $scope.save = function () {
        var object = null;
        if ($scope.entity.id != null) {
            object = brandService.update($scope.entity);
        } else {
            object = brandService.add($scope.entity);
        }
        object.success(
            function (data) {
                if (data.success) {
                    $scope.reloadList();
                } else {
                    alert(data.message);
                }
            }
        );
    };

    /* $scope.selectIds = [];
     $scope.updateSelection = function ($event, id) {
         if ($event.target.checked) {
             $scope.selectIds.push(id);
         } else {
             var idx = $scope.selectIds.indexOf(id);
             $scope.selectIds.splice(idx, 1);
         }
     };*/

    $scope.del = function () {
        if (confirm('Are you sure?')) {
            brandService.del($scope.selectIds).success(
                function (data) {
                    if (data.success) {
                        $scope.reloadList();
                    } else {
                        alert(data.message);
                    }
                }
            );
        }
    };

    $scope.searchEntity = {};
    $scope.search = function (page, rows) {
        brandService.search(page, rows, $scope.searchEntity).success(
            function (data) {
                $scope.list = data.rows;
                $scope.paginationConf.totalItems = data.total;
            }
        );
    };
});