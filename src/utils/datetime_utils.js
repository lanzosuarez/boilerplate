// compute time difference
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