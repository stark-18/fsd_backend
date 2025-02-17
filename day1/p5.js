const fs=require('fs')

const write=()=>{
  const data="i am upadtaed data"
  fs.writeFile('./data.txt',data,(err)=>{
    if(err)
      console.log(err);
    else
    console.log("file updated successfully");
  })
}
write();
