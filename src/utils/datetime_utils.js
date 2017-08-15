// compute time difference

const moment = require('moment-timezone');

exports.computeTimeDiff = function (start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    return (hours < 9 ? '0' : '') + hours + ':' + (minutes < 9 ? '0' : '') + minutes;
};

// convert hh:mm to decimal
exports.timeToDecimal = function (t) {
    var arr = t.split(':');
    return parseFloat(parseInt(arr[0], 10) + '.' + parseInt((arr[1] / 6) * 10, 10));
};

exports.dateFilter = function (req, utcOffset) {
    var reqType = req.headers['x-request-type'] ? req.headers['x-request-type'] : '0';
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var day;

    switch (reqType) {
        case 'Today':
            day = {
                $gte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).startOf('day').toDate(),
                $lte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).endOf('day').toDate(),
            }
            break;

        case 'Yesterday':
            day = {
                $gte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).startOf('day').subtract(1, 'day').toDate(),
                $lte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).endOf('day').subtract(1, 'day').toDate(),
            }
            break;

        case 'Last 7 Days':
            day = {
                $gte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).startOf('week').subtract(1, 'week').toDate(),
                $lte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).toDate(),
            }
            break;

        case 'Last 30 Days':
            day = {
                $gte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).startOf('day').subtract(30, 'day').toDate(),
                $lte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).toDate(),
            }
            break;

        case 'Last 90 Days':
            day = {
                $gte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).startOf('day').subtract(90, 'day').toDate(),
                $lte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).toDate(),
            }
            break;

        case 'Last Year':
            day = {
                $gte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).startOf('year').subtract(1, 'year').toDate(),
                $lte: moment(
                    this.getTimeZoneDate(new Date(Date.now()), utcOffset)
                ).toDate(),
            }
            break;

        case 'Custom':
            day = {
                $gte: moment(
                    this.getTimeZoneDate(new Date(startDate), utcOffset)
                ).toDate(),
                $lte: moment(
                    this.getTimeZoneDate(new Date(endDate), utcOffset)
                ).add(1, 'day').toDate(),
            }
            break;

        default:
            day = 'Invalid';
    }
    return day;
};