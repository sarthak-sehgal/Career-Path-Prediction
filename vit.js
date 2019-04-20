const vitArr = require('./VITProfiles.json');
const fs = require('fs');

let finalArr = [];
let jobTitles = [];

vitArr.map((person, index) => {
    if(person.jobs.length > 0) {
        person.jobs.map(job => {
            jobTitles.push(job.jobTitle);
        })
        finalArr.push(person);
    }
})

fs.writeFile('./VITProfiles.json', JSON.stringify(finalArr, null, 4), (err) => {
    if(err)
        console.log(err);
    else
        console.log("VITProfiles.json updates")
});

let string = '';
jobTitles.map(title => string+=title+'\n');

fs.writeFile('./VITOriginalPositions.txt', string, (err) => {
    if(err)
        console.log(err);
    else
        console.log("./VITOriginalPositions.txt updates")
})