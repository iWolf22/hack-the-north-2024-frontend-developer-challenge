/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Converts UNIX time to a month-day-year date
function dateConverter(time: number) {
    var date = new Date(time);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// Converts UNIX time to a hour-minute-am/pm time
function timeConverter(time: number) {
    var date = new Date(time);
    return (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ':' + (JSON.stringify(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes()) + ' ' + (date.getHours() >= 12 ? 'pm' : 'am');
}

// Exports functions
export {
    dateConverter,
    timeConverter
}