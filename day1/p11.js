const fs = require('fs/promises');

const write= async()=>{
    const data = "i am new data"
    fs.writeFile("./data.txt",data,(err)=>{
        if(err)
            console.log("error writing data to file",err)
        else console.log("file updated successfully");
    });
}
write();