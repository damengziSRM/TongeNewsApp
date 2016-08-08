angular.module('starter.filter', [])
    .filter('substring', function () {
        return function (str) {
            if (str.length >= 40) {
                return str.substr(0, 40) + "...";
            }
            return str;
        }
    })
     .filter('toSex', function () {
        return function (gender) {
            if (gender) {
                return "男";
            }
            return "女";
        }
    })