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

exports.dateFilter = function (req) {
    var reqType = req.headers['x-request-type'] ? req.headers['x-request-type'] : '0';
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var day;

    switch (reqType) {
        case 'Today':
            return day = {
                $gte: moment(new Date(Date.now())).startOf('day').toDate(),
                $lte: moment(new Date(Date.now())).endOf('day').toDate(),
            }
            break;

        case 'Yesterday':
            return day = {
                $gte: moment(new Date(Date.now())).startOf('day').subtract(1, 'day').toDate(),
                $lte: moment(new Date(Date.now())).endOf('day').subtract(1, 'day').toDate(),
            }
            break;

        case 'Last 7 Days':
            return day = {
                $gte: moment(new Date(Date.now())).startOf('week').subtract(1, 'week').toDate(),
                $lte: moment(new Date(Date.now())).toDate(),
            }
            break;

        case 'Last 30 Days':
            return day = {
                $gte: moment(new Date(Date.now())).startOf('day').subtract(30, 'day').toDate(),
                $lte: moment(new Date(Date.now())).toDate(),
            }
            break;

        case 'Last 90 Days':
            return day = {
                $gte: moment(new Date(Date.now())).startOf('day').subtract(90, 'day').toDate(),
                $lte: moment(new Date(Date.now())).toDate(),
            }
            break;

        case 'Last Year':
            return day = {
                $gte: moment(new Date(Date.now())).startOf('year').subtract(1, 'year').toDate(),
                $lte: moment(new Date(Date.now())).toDate(),
            }
            break;

        case 'Custom':
            return day = {
                $gte: moment(new Date(startDate)).toDate(),
                $lte: moment(new Date(endDate)).add(1, 'day').toDate(),
            }
            break;

        default:
            return day = 'Invalid';
    }
    //return day;
};
