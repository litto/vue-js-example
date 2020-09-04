Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
  <b>Please correct the following error(s):</b>
  <ul>
    <li v-for="error in errors">{{ error }}</li>
  </ul>
</p>

  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
  }
  },
  methods:{
    onSubmit() {
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        this.errors=[]
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
      }
    }


  }
})


Vue.component('product', {
  props:{
    premium :{
      type:Boolean,
      required:true,
    }
  },
  template: `<div class="product">
<div class="product-image"><img v-bind:src="image"/></div>
<div class=""product-info >
  
  <h1><a v-bind:href="productlink">{{title}}</a></h1>
<p v-if="inventory>5">In Stock</p>
<p v-else-if="inventory<=5 && inventory>0">Almost Out of Stock</p>
<p v-else> Out of Stock</p>
<p> Shipping {{shipping}} </p>
<ul>
<li v-for="detail in details"> {{detail}}</li>

</ul>
<h4> Colour Variations Available</h4>
<div v-for="(variant,index) in variants" :key="variant.VariantId" 
class="color-box" 
:style="{backgroundColor:variant.variantColor}" @mouseover="updateProduct(index)" >
</div>

<button v-on:click="addToCart" :disabled="stockavailable<=0" :class="{ disabledButton:stockavailable<=0}">+Add</button>
<p><div class="cart">Qty: {{cart}}</div></p>
<button v-on:click="removefromCart" :disabled="cart<=0" :class="{ disabledButton:cart<=0}" >-Remove</button>

</div>
<div>

<product-review @review-submitted="addReview"></product-review>    
<h2>Reviews</h2>
<p v-if="!reviews.length">There are no reviews yet.</p>
<ul>
  <li v-for="review in reviews">
  <p>{{ review.name }}</p>
  <p>Rating: {{ review.rating }}</p>
  <p>{{ review.review }}</p>
  </li>
</ul>
</div>

</div>`,
data() { 
  return{
    product: "Socks",
    brand: "Adidas",
    selectedVariant:0,
    productlink: "https://vuejs.org",
    stockavailable:this.inventory,
    cart:0,
    details:["80% cotton","20% of Polyster","Gener-Neutral"],
    variants:[
    { variantId:2213,variantColor:"green",variantimage:"product.jpg",variantInventory:"6"},
    { variantId:2214,variantColor:"blue",variantimage:"blue.jpg",variantInventory:"4"}
  ],
  reviews: []
  }
},
methods:{
addToCart: function(){
  this.cart +=1;
  this.stockavailable =this.inventory-this.cart;
},
updateProduct:function(index){
  this.selectedVariant=index;
},
removefromCart: function(){
  this.cart -=1;
  this.stockavailable =this.inventory-this.cart;
},
addReview(productReview) {
  this.reviews.push(productReview)
}
},
computed:{
title(){
  return this.brand +' '+this.product;
},
image(){
  return this.variants[this.selectedVariant].variantimage;
},
inventory(){
  return this.variants[this.selectedVariant].variantInventory;
},
shipping(){
if(this.premium){
return "Free shipping";
}else{
return "5 USD";
}

}

}
})

var app= new Vue({
el:'#app',
data :{
 premium:false,
}


})