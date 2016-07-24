angular.module('starter.controllers', [])
    .controller('Tab1Ctrl', function ($scope, $rootScope, $timeout, Tab1Service, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
        $rootScope.imgUrl = server.imgUrl;

        var classify = Tab1Service.getClassify()
        $scope.slides = classify;
        $scope.tabs = classify;

        var getData = function (index) {
            var c = classify[index];
            // 安卓平台不会自动触发加载
            if (ionic.Platform.isAndroid()) {
                c.doRefresh();
            }  
            // 初始化数据，和回调函数 
            c.isload = false;
            c.callback = function () {
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }
        getData(0);

        $scope.slideChanged = function (index) {
            getData(index);
            //这里使用instances[1]的原因是视图中有两个tabs
            $ionicTabsDelegate._instances[1].select(index);
        };

        $scope.$on('$ionicView.afterEnter', function () {
            //等待视图加载完成的时候默认选中第一个菜单
            $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());
        });

        $scope.selectedTab = function (index) {
            //滑动的索引和速度
            $ionicSlideBoxDelegate.slide(index)
        } 
    })
    .controller('ListCtrl', function ($scope) {
        alert(1) 
    })
    .controller('Tab2Ctrl', function ($scope) { })
    .controller('Tab3Ctrl', function ($scope) { })
    .controller('Tab4Ctrl', function ($scope) { })
    .controller('AccountCtrl', function ($scope) { });
