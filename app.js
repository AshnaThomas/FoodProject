// requiring mongoose
const mongoose = require("mongoose");

// Connecting DB
mongoose.connect("mongodb://localhost:27017/fruitsDB")

// Creating Fruit collection
const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[1,"Name required."]
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  name:"Apple",
  rating:7,
  review:"Healthy"
});

// fruit.save();

// Creating People collection
const peopleSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favfruit:fruitSchema
});

const People = mongoose.model("People",peopleSchema);

const people = new People({
  name:"John",
  age:37
});

// people.save();

const kiwi = new Fruit({
  name:"kiwi",
  rating:6,
  review:"Tough looking"
});

const orange = new Fruit({
  name:"orange",
  rating:8,
  review:"Juicy and sour"
});

const banana = new Fruit({
  name:"banana",
  rating:9,
  review:"Easy breakfast"
});

// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Success");
//   }
// });

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

People.updateOne({name:"John"},{favfruit:kiwi},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Sucessfully added kiwi to John.");
  }
})
