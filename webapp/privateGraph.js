let jobs = require('./private.json');
let uniqueJobs = []; // unique jobs; parameters: profession, industry, size
let uniqueJobsCount = [];
let count = 0;
let probabilities = [];
let professions = [];
let industries = [];
let sizes = [];

jobs.map(personObj => {
    personObj.jobs.map(jobObj => {
        if(!jobExists(jobObj))
            uniqueJobs.push(jobObj);
        count++; // total number of jobs
    })
})

function jobExists (jobObj) {
    for(let i=0; i<uniqueJobs.length; i++) {
        if(compareJobs(uniqueJobs[i], jobObj)) {
            uniqueJobsCount[i]++;
            return true;
        }
    }
    uniqueJobsCount[uniqueJobs.length] = 1;
    return false;
}

window.onload = function () {
    let graph = new Graph();
    
    jobs.map(personObj => {
        let personJobs = personObj.jobs;
        for (let i = personJobs.length - 1; i > 0; i--) {
            let from = uniqueJobs.findIndex(job => compareJobs(job, personJobs[i]));
            let to = uniqueJobs.findIndex(job => compareJobs(job, personJobs[i-1]));
            graph.addEdge(from, to);
        }
    })
        
    // graph.addWeights();
    // graph.removeDuplicates();
    
    /* layout the graph using the Spring layout implementation */
    var layouter = new Graph.Layout.Spring(graph);
    layouter.layout();

    /* draw the graph using the RaphaelJS draw implementation */
    var renderer = new Graph.Renderer.Raphael('canvas', graph, 10000, 8000);
    renderer.draw();

    redraw = function() {
        layouter.layout();
        renderer.draw();
    };

    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();
        let index = document.getElementById("index").value;
        let dataDiv = document.getElementById("data");
        if(uniqueJobs[index]) {
            dataDiv.innerHTML = `Position: ${uniqueJobs[index].profession}<br>Industry: ${uniqueJobs[index].industry}<br>Company Size: ${uniqueJobs[index].size}`;
        } else {
            dataDiv.innerHTML = "Not found";
        }
    })
};

function compareJobs (obj1, obj2) {
    if(obj1.profession === obj2.profession && obj1.industry === obj2.industry && obj1.size === obj2.size) {
        return true;
    }
    return false;
}