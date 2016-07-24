angular.module('starter.services', [])
  .service('UserService', function ($http) {

    // 获取缓存用户信息
    this.getCacheUser = function () {
      return angular.fromJson(window.localStorage[cache.user]);
    }

  })
  .service('Tab1Service', function ($http) {

    this.getClassify = function () {
      return [
        {
          name: '健康资讯', isload: true, url: server.domain + '/info/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            $this = this;
            console.log("正在加载更多数据..." + this.page);
            $http.get(this.url + "?page=" + this.page + "&rows=" + settings.rows).success(function (response) {
              $this.items = $this.items.concat(response.tngou);
              $this.page++;
              $this.callback();
            });
          },
          doRefresh: function () {
            $this = this;
            $http.get(this.url + "?page=1&rows=" + settings.rows).success(function (response) {
              $this.page = 1;
              $this.items = response.tngou;
              $this.callback();
            });
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康知识', isload: true, url: server.domain + '/lore/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            $this = this;
            $http.get(this.url + "?page=" + this.page + "&rows=" + settings.rows).success(function (response) {
              $this.items = $this.items.concat(response.tngou);
              $this.page++;
              $this.callback();
            });
          },
          doRefresh: function () {
            $this = this;
            $http.get(this.url + "?page=1&rows=" + settings.rows).success(function (response) {
              $this.page = 1;
              $this.items = response.tngou
              $this.callback();
            });
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康问答', isload: true, url: server.domain + '/ask/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            $this = this;
            $http.get(this.url + "?page=" + this.page + "&rows=" + settings.rows).success(function (response) {
              $this.items = $this.items.concat(response.tngou);
              $this.page++;
              $this.callback();
            });
          },
          doRefresh: function () {
            $this = this;
            $http.get(this.url + "?page=1&rows=" + settings.rows).success(function (response) {
              $this.page = 1;
              $this.items = response.tngou
              $this.callback();
            });
          },
          callback: function () {
            //回掉函数
          }
        }
        // ,{
        //   name: '健康图书', viewable: false, url: server.domain + '/book/list',
        //   page: 1, rows: 20, items: [],getList: this.getList
        // }
      ]
    }


  })

  .service('Tab2Service', function ($http) {

  })
  ;
