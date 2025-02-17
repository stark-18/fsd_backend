const fs=require('fs')

const write=()=>{
  const data="i am updated data"
  fs.writeFile('./mydir/data.txt',data,(err)=>{
    if(err)
      console.log(err);
    else
    console.log("file updated successfully");
  })
}
write();
//git add .
//git commit -m "gsghfjk"
//git push