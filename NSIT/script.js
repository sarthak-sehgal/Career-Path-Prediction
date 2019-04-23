const fs = require('fs');
const arr = require('./profiles.json');
const arr2 = require('./ProfilesWithSynset.json');
const companies = require('./companiesData.json');
const finalWithSynsets = require('./FinalWithSynsets.json');
const clusters = require('./clusters.json');
// const VITFinal = require('./VITFinal.json');

/*
// Process positions to transform them as inputs to wordnet.py
fs.readFile("PositionsRenamed.txt", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }

    let positions = data.split('\n');
    positions = positions.map(position => `'${position.toLowerCase().split(' ').join('_')}',`);
    positions = positions.join('\n');

    fs.writeFile("PositionsProcessed.txt", positions, (err) => {
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
fs.readFile("PositionsSynset.txt", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }

    let synsets = data.split('\n');
    synsets.pop();

    let i=0;
    let finalArr = [];
    arr.map((person, index) => {
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

    fs.writeFile('./ProfilesWithSynset.json', JSON.stringify(finalArr, null, 4), (err) => {
        if(err)
            console.log(err);
        else
            console.log("ProfilesWithSynset.json updated with synsets")
    });
})
*/

/*
// Add company details corresponding to each job and get final synsets to be clustered
let finalArr = [];
let companiesMissing = '';
let synsets = '';
arr2.map((person, index) => {
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

fs.writeFile("CompaniesMissing.txt", companiesMissing, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log("CompaniesMissing.txt updated");
})

fs.writeFile("FinalWithSynsets.json", JSON.stringify(finalArr, null, 2), (err) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log("FinalWithSynsets.json updated");
})

fs.writeFile("FinalSynsets.txt", synsets, (err) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log("FinalSynsets.txt updated");
})

function getCompanyDetails (link) {
    let obj = {
        industry: null,
        size: null
    };
    companies.map(company => {
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
// Set missing size
let count = 0;
finalWithSynsets.map(person => {
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
fs.writeFile("./FinalWithSynsets.json", JSON.stringify(finalWithSynsets, null, 2), (err) => err ? console.log("Error updating company sizes") : console.log(count + " company sizes updated successfully!"))
*/

/*
// replace synsets with profession using clustered result
finalWithSynsets.map(person => {
    person.jobs.map(job => {
        Object.keys(clusters).map(profession => {
            if(clusters[profession].indexOf(job.synset) !== -1) {
                job.profession = profession;
                delete job.synset;
            }
        })
    })
})
fs.writeFile("FINAL.json", JSON.stringify(finalWithSynsets, null, 2), (err) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log("FINAL.json updated");
})
*/