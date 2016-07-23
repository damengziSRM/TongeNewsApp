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
        { name: '健康资讯', viewable: true, url: server.domain + '/info/list', page: 1, rows: 20 },
        { name: '健康知识', viewable: false, url: server.domain + '/lore/list', page: 1, rows: 20 },
        { name: '健康问答', viewable: false, url: server.domain + '/ask/list', page: 1, rows: 20 },
        { name: '健康图书', viewable: false, url: server.domain + '/book/list', page: 1, rows: 20 }
      ]
    }

    this.getList = function (url, page) {
      return $http.get(url + "?page=" + page + "&rows=" + settings.rows);
    }
  })

  .service('Tab2Service', function ($http) {

  })
  ;
