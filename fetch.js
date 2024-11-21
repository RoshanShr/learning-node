fetch("https://jsonplaceholder.tycode.com/sdfsdffs")
.then((response)=>{
  console.log('aaa')
})
.catch((err)=>{
  console.log('Hello')
})


setTimeout(function(){
  console.log('b')
},0)

console.log('a')


console.log('c')