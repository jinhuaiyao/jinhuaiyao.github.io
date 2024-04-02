// moment.js twitter plugin
(function () {
    var day, formats, hour, initialize, minute, second, week;
    second = 1e3;
    minute = 6e4;
    hour = 36e5;
    day = 864e5;
    week = 6048e5;
    year = new Date().getFullYear();
    formats = {
        seconds: {
            short: ' Sec',
            long: ' Second'
        },
        minutes: {
            short: ' Min',
            long: ' Minute'
        },
        hours: {
            short: ' Hr',
            long: ' Hour'
        },
        days: {
            short: ' D',
            long: ' Day'
        }
    };

    initialize = function (moment) {
        var twitterFormat;
        twitterFormat = function (format) {
            return this.format('YYYY.MM.DD HH:mm');
        };
        moment.fn.twitterLong = function () {
            return twitterFormat.call(this, 'long');
        };
        moment.fn.twitter = moment.fn.twitterShort = function () {
            return twitterFormat.call(this, 'long');
        };
        return moment;
    };

    if (typeof define === 'function' && define.amd) {
        define('moment-twitter', ['moment'], function (moment) {
            return this.moment = initialize(moment);
        });
    } else if (typeof module !== 'undefined') {
        module.exports = initialize(require('moment'));
    } else if (typeof window !== "undefined" && window.moment) {
        this.moment = initialize(this.moment);
    }

}).call(this);
