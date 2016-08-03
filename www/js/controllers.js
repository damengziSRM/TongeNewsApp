angular.module('starter.controllers', [])
    .controller('BaseCtrl', function ($scope, $rootScope, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
        $rootScope.imgUrl = server.imgUrl;
        //slide集合
        $scope.slides = $scope.classify;
        //顶部菜单
        $scope.tabs = $scope.classify;

        $scope.getData = function (c) {
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
        // 初始化第一个tab的数据
        $scope.getData($scope.classify[0]);


        //重要：因为页面中用了n个tabs组建，所以这里通过每个controller对应的currentTabId来判断哪个tabs来做选中操作。
        var selectTab = function (index) {
            // 优化 使用delegate-handle来操作tabs # currentTabId
            $ionicTabsDelegate.$getByHandle($scope.currentTabId).select(index);
            // angular.forEach($ionicTabsDelegate._instances, function (tabs) {
            //     if ($scope.currentTabId == tabs.$element[0].id) {
            //         tabs.select(index);
            //     }
            // })
        }

        $scope.slideChanged = function (index) {
            var c = $scope.classify[index]
            $scope.getData(c);
            //选中tabs
            selectTab(index);
        };

        $scope.$on('$ionicView.afterEnter', function () {
            //选中tabs
            selectTab($ionicSlideBoxDelegate.currentIndex());
        });

        $scope.selectedTab = function (index) {
            //滑动的索引和速度
            $ionicSlideBoxDelegate.slide(index)
        }
        $scope.$on('$ionicView.beforeEnter', function () {
            console.log('已经成为活动视图');
            $ionicTabsDelegate.showBar(true);
        });

 

        // Triggered on a button click, or some other target
        $scope.favorite = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '收藏' }
                    // ,{ text: '取消' }
                ],
                destructiveText: 'Delete',
                titleText: '收藏',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                hideSheet();
            }, 2000);

        };


    })
    .controller('Tab1Ctrl', function ($scope, $state, $controller, Tab1Service, $ionicTabsDelegate) {
        $scope.classify = Tab1Service.getClassify()
        $scope.currentTabId = "tab1";
        //调用父级控制器之前先初始化需要的数据 这里要准备的就是分类 和 tab的索引
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            $state.go('tab.tab1-details', { id: item.id, title: item.title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    })
    .controller('Tab1DetailsCtrl', function ($scope, $stateParams, Tab1Service) {
        var id = $stateParams.id;
        var type = $stateParams.type;
        $scope.title = $stateParams.title;
        Tab1Service.getDetails(type, id).success(function (response) {
            $scope.item = response;
        })
    })
    .controller('Tab2Ctrl', function ($scope, $state, Tab2Service, $controller, $ionicTabsDelegate) {
        $scope.classify = Tab2Service.getTab2Menu()
        $scope.currentTabId = "tab2";
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            var title = "", name = "";
            if (item.title) {
                title += item.title;
            }
            if (item.name) {
                title += item.name;
            }
            $state.go('tab.tab2-details', { id: item.id, title: title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    })
    .controller('Tab3Ctrl', function ($scope, Tab3Service, $controller, $state, $ionicTabsDelegate) {
        $scope.classify = Tab3Service.getTab3Menu()
        $scope.currentTabId = "tab3";
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            var title = "", name = "";
            if (item.title) {
                title += item.title;
            }
            if (item.name) {
                title += item.name;
            }
            $state.go('tab.tab3-details', { id: item.id, title: title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    })
    .controller('Tab4Ctrl', function ($scope, Tab4Service, $controller, $state, $ionicTabsDelegate) {
        $scope.classify = Tab4Service.getTab4Menu()
        $scope.currentTabId = "tab4";
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            var title = "", name = "";
            if (item.title) {
                title += item.title;
            }
            if (item.name) {
                title += item.name;
            }
            console.log(item);
            $state.go('tab.tab4-details', { id: item.id, title: title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    })
    .controller('AccountCtrl', function ($scope, $state, $ionicTabsDelegate) {
        $scope.goDetails = function () {
            $state.go('tab.account-details');
            $ionicTabsDelegate.showBar(false);
        }
        $scope.$on('$ionicView.beforeEnter', function () {
            console.log('已经成为活动视图');
            $ionicTabsDelegate.showBar(true);
        });
    })
    .controller('AccountDetailsCtrl', function ($scope) { });
