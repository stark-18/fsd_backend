const fs=require('fs')

const append=()=>{
  const data="BY BOSS"
  fs.appendFile('./data.txt',data,(err)=>{
    if (err)
      console.log(err);
    else
    console.log("successfully appended");
})
}

append();