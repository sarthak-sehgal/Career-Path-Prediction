let bitsArr = require('./bits.json');
let bitsCompanies = require('./bitsCompanies.json');
let bitsFinalArr = [];

let count = 0;

let companies = [];

bitsArr.map((obj, index) => {
    if(obj.jobs && obj.jobs.length > 0) {
        let object = {};
        let jobs = [];
        obj.jobs.map(job => {
            let synset = job.jobTitle;
            synset = synset.toLowerCase();
            synset = synset.split(' ').join('_');
            let jobObj = {
                companyName: job.companyName,
                companyUrl: job.companyUrl,
                jobTitle: job.jobTitle,
                dateRange: job.dateRange,
                synset
            };
            jobs.push(jobObj);
            // console.log(jobObj.jobTitle + ',');
            companies.push(job.companyUrl);
            console.log(job.companyUrl);
        })
        object.jobs = jobs;
        object.schools = obj.schools;
        object.profile = obj.general.profileUrl;
        bitsFinalArr.push(object);
    }
});

console.log(companies.length, bitsCompanies.length);

// console.log(JSON.stringify(bitsFinalArr, null, 2));