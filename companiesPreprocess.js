const fs = require('fs');

fs.readFile('./positions.txt', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return; 
    }

    let content = data;
    content = content.split('\n').join('');
    content = content.split(',');
    let finalPos = [];
    content = content.map(pos => "'" + pos.toLowerCase().split(' ').join('_') + "'")
    let finalContent = '';
    content.map(pos => finalContent += pos + '\n')
    // console.log(finalContent);
    fs.writeFile('./positionsProcessed.txt', finalContent, (err) => {
        if(err)
            console.log(err);
        else
            console.log("Saved data to file positionsProcessed.txt!");
    })
})