let jobs = require('./bitsFinalProcessed.json');
let uniqueJobs = []; // unique jobs; parameters: profession, industry, size
let uniqueJobsCount = [];
let count = 0;
let probabilities = [];
let professions = [];
let industries = [];
let sizes = [];

jobs.map(personObj => {
    personObj.jobs.map(jobObj => {
        if (!jobExists(jobObj))
            uniqueJobs.push(JSON.stringify(jobObj));
        count++; // total number of jobs
    })
})

function jobExists (jobObj) {
    for(let i=0; i<uniqueJobs.length; i++) {
        if((uniqueJobs[i]) === JSON.stringify(jobObj)) {
            uniqueJobsCount[i]++;
            return true;
        }
    }
    uniqueJobsCount[uniqueJobs.length] = 1;
    return false;
}

class Graph {
    // defining vertex array and 
    // adjacent list 
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    // functions to be implemented 

    addVertex(v) {
        // initialize the adjacent list with a 
        // null array 
        this.AdjList.set(v, []);
    }


    addEdge(v, w) {
        // get the list for vertex v and put the 
        // vertex w denoting edge betweeen v and w 
        this.AdjList.get(v).push(w);

        // Since graph is undirected, 
        // add an edge from w to v also 
        // this.AdjList.get(w).push(v);
    }

    printGraph() {
        // get all the vertices 
        var get_keys = this.AdjList.keys();

        // iterate over the vertices 
        for (var i of get_keys) {
            // great the corresponding adjacency list 
            // for the vertex 
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list 
            // concatenate the values into a string 
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list 
            console.log(i + " -> " + conc);
        }
    }

    // bfs(v) 
    // dfs(v) 
}

let graph = new Graph(uniqueJobs.length);
for (let i = 0; i < uniqueJobs.length; i++)
    graph.addVertex(i)

jobs.map(personObj => {
    let personJobs = personObj.jobs;
    for(let i=personJobs.length-1; i>0; i--) {
        let from = uniqueJobs.findIndex(job => job === JSON.stringify(personJobs[i]));
        let to = uniqueJobs.findIndex(job => job === JSON.stringify(personJobs[i-1]))
        graph.addEdge(from, to);
    }
})

graph.printGraph();