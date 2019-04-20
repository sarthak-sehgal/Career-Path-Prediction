const fs = require('fs');
let bitsArr = require('./bits.json');
let bitsCompanies = require('./bitsCompanies.json');
let clusters = require('./bitsClusters.json');

let bitsFinalArr = [];
let count = 0;
let companies = [];

fs.readFile('./positionsSynset.txt', "utf-8", (err, data) => {
    if(err) {
        console.log("Error while reading file positionsSynset.txt");
        return;
    }

    let synsets = data;
    synsets = data.split('\n');
    let i = 0;
    
    bitsArr.map((obj, index) => {
        if(obj.jobs && obj.jobs.length > 0) {
            let object = {};
            let jobs = [];
            obj.jobs.map(job => {
                let jobObj = {
                    // companyName: job.companyName,
                    // companyUrl: job.companyUrl,
                    // jobTitle: job.jobTitle,
                    // dateRange: job.dateRange,
                    // synset: synsets[i]
                };
                
                // get cluster corresponding to synset
                Object.keys(clusters).map(profession => {
                    clusters[profession].map(synset => {
                        if(synsets[i] === synset)
                            jobObj.profession = profession
                        return;
                    });
                })
                
                i++;
                let companyDetails = getCompanyDetails(bitsCompanies, job.companyUrl);
                jobObj = {
                    ...jobObj,
                    ...companyDetails
                }
                if(jobObj.size)
                    jobs.push(jobObj);

                companies.push(job.companyUrl);
            })
            if(jobs.length > 0) {
                object.jobs = jobs;
                // object.profile = obj.general.profileUrl;
                bitsFinalArr.push(object);
            }
        }
    });
    fs.writeFile("./bitsFinalProcessed.json", JSON.stringify(bitsFinalArr, null, 4), (err) => {
        if(err) {
            console.log(err);
            return;
        }

        console.log("Data stored in ./bitsFinalProcessed.json");
    })
})


function getCompanyDetails (allCompanies, link) {
    let obj = {
        industry: null,
        size: null
    };
    allCompanies.map(company => {
        if(company.link === link) {
            obj = {
                industry: company.industry,
                size: company.companySize
            }
        }
    })
    return obj;
}
