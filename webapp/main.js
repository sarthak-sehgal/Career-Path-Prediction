let jobs = require('./bitsFinalProcessed.json');
let uniqueJobs = []; // unique jobs; parameters: profession, industry, size
let count = 0;

jobs.map(personObj => {
    personObj.jobs.map(jobObj => {
        if(!jobExists(jobObj))
            uniqueJobs.push(jobObj);
        count++; // total number of jobs
    })
})

let table = document.getElementsByTagName('table')[0];
let tdString = '';

for(let i=0; i<=uniqueJobs.length; i++) {
    if(i) {
        tr.innerHTML += `<th>${JSON.stringify(uniqueJobs[i-1], null, 2)}</th>`;
        tdString+='<td></td>';
    }
    else
        tr.innerHTML += '<th></th>';
}
table.append(tr);

for(let i=0; i<uniqueJobs.length; i++) {
    let tr = document.createElement('tr');
    tr.innerHTML += `<th>${JSON.stringify(uniqueJobs[i], null, 2)}</th>`;
    tr.innerHTML += tdString;
    table.append(tr);
}

let tds = document.getElementsByTagName('td');

for(let i=0; i<uniqueJobs.length; i++) {
    for (let j=0; j<uniqueJobs.length; j++) {
        let from = uniqueJobs[i];
        let td = tds[i*uniqueJobs.length + j];
        let to = uniqueJobs[j];

        if(i===j) {
            td.innerHTML = "N.A.";
        } else {
            // total = findTotal (from, to);
            td.innerHTML = "Calc";
        }
    }
}

function jobExists (jobObj) {
    for(let i=0; i<uniqueJobs.length; i++) {
        if(JSON.stringify(uniqueJobs[i]) === JSON.stringify(jobObj)) {
            return true;
        }
    }
    return false;
}

function findTotal (from, to) {
    let count = 0;
    for(let i=0; i<jobs.length; i++) {
        for(let j=jobs[i].jobs.length-1; j>=0; j--) {
            if(j-1 > 0) {
                if(JSON.stringify(jobs[i].jobs[j]) === JSON.stringify(from) && JSON.stringify(jobs[i].jobs[j-1]) === JSON.stringify(to)) {
                    count++;
                }
            }
        }
    }
    return count;
}