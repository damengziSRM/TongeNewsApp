angular.module('starter.services', [])
  .service('UserService', function ($http) {

    // 获取缓存用户信息
    this.getCacheUser = function () {
      return angular.fromJson(window.localStorage[cache.user]);
    }

  })
  .service('Tab1Service', function ($http) {

    var loadMore = function ($this) {
      console.log("正在加载更多数据..." + $this.page);
      $http.get($this.url + "?page=" + $this.page + "&rows=" + settings.rows).success(function (response) {
        $this.items = $this.items.concat(response.tngou);
        $this.page++;
        $this.callback();
      });
    }

    var doRefresh = function ($this) {
      console.log("正在执行refresh操作...");
      $http.get($this.url + "?page=1&rows=" + settings.rows).success(function (response) {
        $this.page = 2;
        $this.items = response.tngou;
        $this.callback();
      });
    }
    this.getClassify = function () {
      return [
        {
          name: '健康资讯', isload: true, url: server.domain + '/info/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            loadMore(this);
          },
          doRefresh: function () {
            doRefresh(this);
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
            loadMore(this);
          },
          doRefresh: function () {
            doRefresh(this);
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
            loadMore(this);
          },
          doRefresh: function () {
            doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        }
      ]
    }

    this.getDetails = function (id) {
      return $http.get(urls.info_show + id);
    }
  })

  .service('Tab2Service', function ($http) {

  })
  ;
