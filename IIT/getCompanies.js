const fs = require('fs');
const profiles = require('./IITProfiles.json');

let companies = [];

profiles.map(person => {
    person.jobs.map(job => {
        companies.push(job.companyUrl)
    })
})

let string = '';

companies.map(url => {
    string+=url+'\n';
})

fs.writeFile("companies.txt", string, (err) => err ? console.log("Error") : console.log("Written to companies.txt"))