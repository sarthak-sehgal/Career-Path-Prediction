let arr = require('./VIT.json');
let finalArr = [];

let count = 0;

// let companies = [];

arr.map((obj, index) => {
    if(obj.url) {
        finalArr.push(obj);
        console.log(obj.url);
    }
});

console.log(finalArr.length);