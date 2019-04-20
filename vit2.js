const fs = require('fs');
const vitArr = require('./VITProfiles.json');
const vitCompanies = require('./VITCompanies.json');
const VITFinalWithSynsets = require('./VITFinalWithSynsets');
const VITClusters = require('./VITClusters.json');
const VITFinal = require('./VITFinal.json');

/*
// Process positions to trasnform them as inputs to wordnet.py
fs.readFile("VITPositions.txt", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }

    let positions = data.split('\n');
    positions = positions.map(position => `'${position.toLowerCase().split(' ').join('_')}',`);
    positions = positions.join('');

    fs.writeFile("VITPositionsProcessed.txt", positions, (err) => {
        if(err) {
            console.log(err);
            return;
        }

        console.log("Processed positions created.");
    })
})
*/

/*
// Assign each job a synset after getting output from wordnet.py and store only relevant info
fs.readFile("VITPositionsSynset.txt", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }

    let synsets = data.split('\n');
    synsets.pop();

    let i=0;
    let finalArr = [];
    vitArr.map((person, index) => {
        if(person.jobs.length > 0) {
            let jobArr = [];
            person.jobs.map(job => {
                jobArr.push(
                    {
                        companyUrl: job.companyUrl,
                        synset: synsets[i]
                    }
                );
                i++;
            })
            finalArr.push({
                jobs: jobArr
            });
        }
    })

    fs.writeFile('./VITProfiles.json', JSON.stringify(finalArr, null, 4), (err) => {
        if(err)
            console.log(err);
        else
            console.log("VITProfiles.json updated with synsets")
    });
})
*/

/*
// Add company details corresponding to each job and get final synsets to be clustered
let finalArr = [];
let companiesMissing = '';
let synsets = '';
vitArr.map((person, index) => {
    if(person.jobs.length > 0) {
        let jobs = [];
        person.jobs.map(job => {
            let companyDetails = getCompanyDetails(job.companyUrl);
            if(companyDetails.industry === null) {
                if(job.companyUrl.indexOf("search/") === -1)
                    companiesMissing += job.companyUrl + '\n';
            } else {
                if(companyDetails.industry !== undefined) {
                    jobs.push({
                        synset: job.synset,
                        ...companyDetails
                    })
                    synsets += job.synset + '\n';
                }
            }
        })
        if(jobs.length>0)
            finalArr.push({jobs})
    }
})

fs.writeFile("VITCompaniesMissing.txt", companiesMissing, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log("VITCompaniesMissing.txt updated");
})

fs.writeFile("VITFinalWithSynsets.json", JSON.stringify(finalArr, null, 2), (err) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log("VITFinalWithSynsets.json updated");
})

fs.writeFile("VITFinalSynsets.txt", synsets, (err) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log("VITFinalSynsets.txt updated");
})

function getCompanyDetails (link) {
    let obj = {
        industry: null,
        size: null
    };
    vitCompanies.map(company => {
        if(company.link === link) {
            obj = {
                industry: company.industry,
                size: company.companySize
            }
        }
    })
    return obj;
}
*/

/*
// replcase synsets with profession using clustered result
VITFinalWithSynsets.map(person => {
    person.jobs.map(job => {
        Object.keys(VITClusters).map(profession => {
            if(VITClusters[profession].indexOf(job.synset) !== -1) {
                job.profession = profession;
                delete job.synset;
            }
        })
    })
})
fs.writeFile("VITFinal.json", JSON.stringify(VITFinalWithSynsets, null, 2), (err) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log("VITFinal.json updated");
})
*/