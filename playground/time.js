/**
 * Created by ILYASANATE on 02/04/2017.
 */
//jan 1st 1970 00hr: 00mins: 00secs am - 1000 mills=1 secs

// let date=new Date();
// console.log(date.getMonth());

let moment=require('moment');

// let date=moment();
// console.log(date.format('MMM Do YYYY'));
var stamp=moment().valueOf();
console.log(stamp);
// let createdAt=1234;
// let date=moment(createdAt);
// console.log(date.format('h:mm a'));