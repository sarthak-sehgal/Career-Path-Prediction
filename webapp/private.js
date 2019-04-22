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

let fromProfession = document.getElementById("fromProfession");
let fromIndustry = document.getElementById("fromIndustry");
let fromSize = document.getElementById("fromSize");
let toProfession = document.getElementById("toProfession");
let toIndustry = document.getElementById("toIndustry");
let toSize = document.getElementById("toSize");

uniqueJobs.map(jobObj => {
    if(!professions.find(profession => profession === jobObj.profession))
        professions.push(jobObj.profession)
    if(!industries.find(industry => industry === jobObj.industry))
        industries.push(jobObj.industry)
    if(!sizes.find(size => size === jobObj.size))
        sizes.push(jobObj.size)
})

professions.map(profession => {
    fromProfession.innerHTML += `<option>${profession}</option>`
    toProfession.innerHTML += `<option>${profession}</option>`
})

industries.map(industry => {
    fromIndustry.innerHTML += `<option>${industry}</option>`
    toIndustry.innerHTML += `<option>${industry}</option>`
})

sizes.map(size => {
    fromSize.innerHTML += `<option>${size}</option>`
    toSize.innerHTML += `<option>${size}</option>`
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

document.getElementById("go").addEventListener("click", function () {
    document.getElementById("shortestPath").innerHTML = '';
    document.getElementById("error").innerHTML = '';
    let fromObj = {
        profession: fromProfession.value,
        industry: fromIndustry.value,
        size: fromSize.value
    }

    let toObj = {
        profession: toProfession.value,
        industry: toIndustry.value,
        size: toSize.value
    }

    let fromFound = false;
    let toFound = false;
    let fromIndex;
    let toIndex;
    uniqueJobs.map((jobObj, index) => {
        if(compareJobs(fromObj, jobObj)) {
            fromFound = true;
            fromIndex = index;
        }
        if(compareJobs(toObj, jobObj)) {
            toFound = true;
            toIndex = index;
        }
    })
    console.log(fromObj, fromIndex);
    console.log(toObj, toIndex);
    if(!fromFound)
        document.getElementById("error").innerHTML = "From not found!"
    else if (!toFound)
        document.getElementById("error").innerHTML = "To not found!"
    else {
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
                this.path[startingNode] = {path: [startingNode], probability: 0};
        
                this.DFSUtil(startingNode, visited, 1);
                // console.log(this.paths);
            }
        
            // Recursive function which process and explore 
            // all the adjacent vertex of the vertex with which it is called 
            DFSUtil(vert, visited) {
                visited[vert] = true;
                
                if (vert === this.target) {
                    this.paths.push({
                        probability: this.path[vert].probability,
                        path: this.path[vert].path
                    })
                }
        
                var get_neighbours = this.AdjList.get(vert);
        
                for (var i in get_neighbours) {
                    let get_elem = get_neighbours[i].vertex;

                    if(get_elem === vert && get_elem !== this.target)
                        continue;
                        
                    let probability = this.path[vert].probability;
                    if(!probability)
                        probability = 1;
                    probability *= get_neighbours[i].weight;

                    if(this.path[get_elem] !== undefined) {
                        if(probability > this.path[get_elem].probability && this.path[vert].path.findIndex(num => num === get_elem) === -1) {
                            this.path[get_elem].path = [...this.path[vert].path, get_elem];
                            this.path[get_elem].probability = probability;
                            
                            if(get_elem === this.target)
                                this.paths.push({
                                    probability: probability,
                                    path: this.path[get_elem].path
                                })
                            else
                                this.DFSUtil(get_elem, visited, probability);
                        }
                    } else {
                        this.path[get_elem] = {};
                        this.path[get_elem].path = [...this.path[vert].path, get_elem];
                        this.path[get_elem].probability = probability;
                        
                        if (!visited[get_elem])
                            this.DFSUtil(get_elem, visited, probability);
                        else if(get_elem === this.target)
                            this.paths.push({
                                probability: probability,
                                path: this.path[get_elem].path
                            })
                    }
                }
            }
        
            getShortestPath () {
                let probability = 0;
                let length = Number.MAX_VALUE;
                let path = [];
                console.log(this.paths);
                if(!this.paths || this.paths.length === 0) {
                    // throw new Error("No path found!");
                    return {
                        probability,
                        path
                    };
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
                            if(edges[j].vertex === edges[k].vertex && edges[j].weight === edges[k].weight) {
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
                let from = uniqueJobs.findIndex(job => compareJobs(job, personJobs[i]));
                let to = uniqueJobs.findIndex(job => compareJobs(job, personJobs[i-1]));
                // console.log(from, to);
                graph.addEdge(from, to);
            }
        })
         
        graph.addWeights();
        graph.removeDuplicates();
        graph.printGraph();
        graph.dfs(fromIndex, toIndex);
        
        try {
            let shortestPath = graph.getShortestPath();
            console.log(shortestPath);
            let div = document.getElementById("shortestPath");
            div.innerHTML += `<h1 id='probability'>Probability: ${shortestPath.probability}</h1>`
            shortestPath.path.map((i, index) => {
                div.innerHTML += `
                    <div class="job">
                        <span>Profession: ${uniqueJobs[i].profession}</span>
                        <span>Industry: ${uniqueJobs[i].industry}</span>
                        <span>Size: ${uniqueJobs[i].size}</span>
                    </div>
                `;
                if(index !== shortestPath.path.length-1)
                    div.innerHTML += '<div class="arrow">&darr;</div>'
            })
        } catch (e) {
            document.getElementById("error").innerHTML = e;
        }
    }
})

function compareJobs (obj1, obj2) {
    if(obj1.profession === obj2.profession && obj1.industry === obj2.industry && obj1.size === obj2.size) {
        return true;
    }
    return false;
}