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

function jobExists(jobObj) {
    for (let i = 0; i < uniqueJobs.length; i++) {
        if ((uniqueJobs[i]) === JSON.stringify(jobObj)) {
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
                conc += JSON.stringify(j) + " ";

            // print the vertex and its adjacency list 
            console.log(i + " -> " + conc);
        }
    }

    addWeights() {
        var get_keys = this.AdjList.keys();
        for (var i of get_keys) {
            let edges = this.AdjList.get(i);
            let weight = 0;
            if(edges.length > 0)
                weight = 1/edges.length;
            for(let j=0; j<edges.length; j++) {
                edges[j] = {vertex: edges[j], weight}
            }
        }
    }

    // bfs(v) 


    // Main DFS method 
    dfs(startingNode, target) {
        this.paths = [];
        this.target = target;
        var visited = [];
        for (var i = 0; i < this.noOfVertices; i++)
            visited[i] = false;

        this.path = {};
        this.path[startingNode] = [startingNode];

        this.DFSUtil(startingNode, visited, 1);
        // console.log(this.paths);
    }

    // Recursive function which process and explore 
    // all the adjacent vertex of the vertex with which it is called 
    DFSUtil(vert, visited, probability) {
        visited[vert] = true;
        if (vert === this.target) {
            this.paths.push({
                probability: probability,
                path: this.path[vert]
            })
        }

        var get_neighbours = this.AdjList.get(vert);

        for (var i in get_neighbours) {
            var get_elem = get_neighbours[i].vertex;
            if(get_elem === vert && get_elem !== this.target)
                continue;

            // console.log("Parent: " + vert + ", Child: " + get_elem);
            this.path[get_elem] = [...this.path[vert], get_elem];
            probability *= get_neighbours[i].weight;
            if (!visited[get_elem])
                this.DFSUtil(get_elem, visited, probability);
            else if(get_elem === this.target)
                this.paths.push({
                    probability: probability,
                    path: this.path[get_elem]
                })
        }
    }

    getShortestPath () {
        let probability = 0;
        let length = Number.MAX_VALUE;
        let path;
        if(!this.paths || this.paths.length === 0) {
            throw new Error("No path found!");
        }
        for (let i=0; i<this.paths.length; i++) {
            if(this.paths[i].path.length > 1 && this.paths[i].probability > probability) {
                probability = this.paths[i].probability;
                path = this.paths[i].path;
            } else if (this.paths[i].path.length > 1 && this.paths[i].probability === probability && this.paths[i].path.length < length) {
                probability = this.paths[i].probability;
                path = this.paths[i].path;
            }
        }

        return {
            probability,
            path
        }
    }

    removeDuplicates () {
        var get_keys = this.AdjList.keys();
        for (var i of get_keys) {
            let edges = this.AdjList.get(i);
            let vis = [];
            for(let j=0; j<edges.length-1; j++) {
                let finalWeight = edges[j].weight;
                for(let k=j+1; k<edges.length; k++) {
                    if(JSON.stringify(edges[k]) === JSON.stringify(edges[j])) {
                        finalWeight += edges[k].weight;
                        edges.splice(k, 1);
                        k--;
                    }
                }
                edges[j].weight = finalWeight;
            }
        }
    }
}

let graph = new Graph(uniqueJobs.length);
for (let i = 0; i < uniqueJobs.length; i++)
    graph.addVertex(i)

jobs.map(personObj => {
    let personJobs = personObj.jobs;
    for (let i = personJobs.length - 1; i > 0; i--) {
        let from = uniqueJobs.findIndex(job => job === JSON.stringify(personJobs[i]));
        let to = uniqueJobs.findIndex(job => job === JSON.stringify(personJobs[i - 1]))
        graph.addEdge(from, to);
    }
})
 
graph.addWeights();
graph.removeDuplicates();
// graph.printGraph();
graph.dfs(246, 198);

try {
    graph.getShortestPath();
} catch (e) {
    console.log(e);
}