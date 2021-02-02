const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdefj.js', (err) => {
        if(err){
            console.log(err);
        }
    });
}, 1000);