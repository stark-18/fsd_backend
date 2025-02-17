const fs=require('fs')

const unlink=()=>{
fs.unlink('./mydir/data.txt',(err)=>{
 if(err)
  console.log(err)
else
 console.log("deleted succesfully")
 })
}

unlink();