angular.module('starter.controllers', [])
    .controller('Tab1Ctrl', function ($scope, $rootScope, $timeout, Tab1Service, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
        $rootScope.imgUrl = server.imgUrl;

        var classify = Tab1Service.getClassify()
        $scope.slides = classify;
        $scope.tabs = classify;

        var slideIndex = 0;
    
        $scope.slideChanged = function (index) {
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

        var vm = $scope.vm = {
            moredata: false,
            items: [],
            page: 1, 
            init: function () {
                Tab1Service.getList(classify[0].url, vm.page).success(function (response) {
                    console.log(response);
                    if (response.status) {
                        vm.items = response.tngou;
                    }
                }).finally(function (error) {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            },
            doRefresh: function () {
                this.init();
                $timeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            },
            loadMore: function () {
                vm.page += 1;
                console.log('正在加载页数：'+vm.page);
                Tab1Service.getList(classify[0].url, vm.page).success(function (response) {
                    console.log(response);
                    vm.items = vm.items.concat(response.tngou);
                    if (response.tngou.length == 0) {
                        vm.moredata = true;
                    };
                })
            }
        }
        vm.init();

    })
    .controller('Tab2Ctrl', function ($scope) { })
    .controller('Tab3Ctrl', function ($scope) { })
    .controller('Tab4Ctrl', function ($scope) { })
    .controller('AccountCtrl', function ($scope) { });
