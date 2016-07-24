angular.module('starter.controllers', [])
    .controller('Tab1Ctrl', function ($scope, $rootScope, $timeout, Tab1Service, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
        $rootScope.imgUrl = server.imgUrl;

        var classify = Tab1Service.getClassify()
        $scope.slides = classify;
        $scope.tabs = classify;

        $scope.slideChanged = function (index) {
            //这里使用instances[1]的原因是视图中有两个tabs
            $ionicTabsDelegate._instances[1].select(index);
        };
        $scope.$on('$ionicView.afterEnter', function () {
            //等待视图加载完成的时候默认选中第一个菜单
            // $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());
        });

        $scope.selectedTab = function (index) {
            //滑动的索引和速度
            $ionicSlideBoxDelegate.slide(index)
        }

        var page = 1,isLock=false;
        $scope.items = [];
        $scope.loadMore = function () {
            if(isLock)return;
            isLock=true;
            Tab1Service.getList(classify[0].url, page).success(function (response) {
                console.log(page)
                if (response.tngou.length == 0) {
                    $scope.hasmore = true;
                    return;
                }
                page++;
                $scope.items = $scope.items.concat(response.tngou);
            }).finally(function (error) {
                isLock = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.doRefresh = function () {
            page = 1;
            $scope.items = [];
            $scope.loadMore();
        }
        // $scope.$on('stateChangeSuccess', function () {
        //     $scope.loadMore();
        // });
    })
    .controller('Tab2Ctrl', function ($scope) { })
    .controller('Tab3Ctrl', function ($scope) { })
    .controller('Tab4Ctrl', function ($scope) { })
    .controller('AccountCtrl', function ($scope) { });
