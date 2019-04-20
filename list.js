const IITArr = require('./IITDelhi.json');
const fs = require('fs');

let finalArr = [];
let jobTitles = [];

IITArr.map((person, index) => {
    if(person.jobs.length > 0) {
        person.jobs.map(job => {
            jobTitles.push(job.jobTitle);
        })
        finalArr.push(person);
    }
})

fs.writeFile('./IITProfiles.json', JSON.stringify(finalArr, null, 4), (err) => {
    if(err)
        console.log(err);
    else
        console.log("IITProfiles.json updates. Number: ", finalArr.length)
});

let string = '';
jobTitles.map(title => string+=title+'\n');

fs.writeFile('./IITOriginalPositions.txt', string, (err) => {
    if(err)
        console.log(err);
    else
        console.log("./IITOriginalPositions.txt updates")
})