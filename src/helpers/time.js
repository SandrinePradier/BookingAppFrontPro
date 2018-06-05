//importing momentJs library //
import moment from 'moment';

//local setting
import 'moment/locale/fr';
moment.locale('fr');

//using twix to get range time
import twix from 'twix';
import _ from 'underscore';


//return an array with days as moment object for a given time range
function getDaysOfTheTimeRange(start,end){
	if (moment(end).isAfter(moment(start))){
		let arr = moment(start).twix(end).toArray('days');
		return arr
	}
	else{
		let arr = moment(end).twix(start).toArray('days');
		return arr
	}
}

// return the name of the day of a moment date
function getNameOfDay(date){
	return moment(date).format('dddd');
}


//return a number from a string
function filterInt (value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}


//return a number of minutes from hh:mm
function convertTimeInMinutes (hoursMinutes){
	let timeSplit = [];
	timeSplit = hoursMinutes.split(":");
	let totalMinutes = filterInt(timeSplit[0])*60 + filterInt(timeSplit[1])
	return totalMinutes;
}

//create slot object
function createSlotObject(start, duration, status){
	let slotObject = Object.create(null);
	slotObject.start = moment(start);
	slotObject.end = moment(start).add(duration, 'minutes');
	slotObject.duration = duration;
	slotObject.status = status;
	return slotObject;
}


//return array of slotsobjects for a given period
function setSlotsArray(startPoint,endPoint,duration, status){
			let slotsArray = []
			let start = moment(startPoint);
			let end = moment(endPoint);
			for (let i=start; i.isBefore(end); i.add(duration,'minutes')){
				let builtslot = createSlotObject(i, duration, status);
				slotsArray.push(builtslot);
			}
			return slotsArray;
}


//this function anable to find the lowest date and the bigger date in a slot range.
function GetMinTimeFromSlotsArray(slotList){
	let sortedSlots = _.sortBy(slotList, 'date');
	console.log('sorted: ',sortedSlots);
	let minDate = sortedSlots[0].start;
	let maxDate = sortedSlots[sortedSlots.length-1].start;
	let minTr = {
		start : minDate,
		end: maxDate
	};
	return minTr;
}


// return the first day (moment object) of the week for a date given as parameter
function getWeekFirstDate(date){
	return moment(date).startOf('week');
};


function addTwoMonth(date){
	return moment(date).add(2,'month');
}

//return an array with days as moment object for a given time range
function getDaysOfTheTimeRange(start,end){
	 let arr = moment(start).twix(end).toArray('days');
	 return arr;
}

//this function will take as parameter day, week or month for the durationName. 
//the start will be the begin of Display
//will return the number of days to display in the calendar
function limitDisplay (durationName, start ){
	let duration = '';
	if (durationName == 'day'){duration = 1;}
	if (durationName == 'week'){duration = 7;}
	else {duration = 31;}
	return start + duration;
}

// return the week number (number) for a date given as parameter
function getWeekNumber(date){
	return moment(date).format('ww');
};

function getTimeRange (minTR){
      let nowStartWeek = getWeekFirstDate(moment());
      let end = addTwoMonth(minTR.end);
      return getDaysOfTheTimeRange(nowStartWeek,end);
}

export {
	getDaysOfTheTimeRange,
	getNameOfDay,
	filterInt,
	convertTimeInMinutes,
	createSlotObject,
	setSlotsArray,
	GetMinTimeFromSlotsArray,
	getWeekFirstDate,
	addTwoMonth,
	limitDisplay,
	getWeekNumber,
	getTimeRange
}