const json = require('./VITFinal.json');
const fs = require('fs');
let industryCount = 0;
let sizeCount = 0;
let count = 0;

json.map(person => {
    person.jobs.map(job => {
        if(!job.industry || !job.size) {
            if(!job.industry) {
                industryCount++;
            } else if (!job.size) {
                job.size = "1,001-5,000 employees";
            }
            count++;
        }
    })
})

fs.writeFile("./VITFinal.json", JSON.stringify(json, null, 2), (err) => err ? console.log("Error") : console.log("Success"))