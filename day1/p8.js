const fs=require('fs');

fs.mkdir("mydir",(err)=>{
  if (err){
    console.error("error creating directory:",err);
    return;
  }
  console.log("directory created successfully");
})
mkdir();