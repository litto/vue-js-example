
var app= new Vue({
el:'#app',
data:{
  product: "Socks",
  image: "product.jpg",
  productlink: "https://vuejs.org",
  inventory:1,
  details:["80% cotton","20% of Polyster","Gener-Neutral"],
  variants:[
{
  variantid:"1",
  variantcolor:"red"
},
{
  variantid:"2",
  variantcolor:"green"
},
{
  variantid:"23",
  variantcolor:"blue"
},
{
  variantid:"256",
  variantcolor:"yellow"
},

  ]


}

})