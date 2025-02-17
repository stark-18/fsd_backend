const fs=require('fs')
fs.rmdir("mydir",(err)=>{
  if (err){
    console.error("error deleting directory:",err);
    return;
  }
  console.log("directory deleted successfully");
})