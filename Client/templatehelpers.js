// templatehelpers.js
if (Meteor.isClient) {
	Meteor.subscribe("SpeciesSuite");
	Meteor.subscribe("Animals");
 Template.Animal.helpers({
    animal: function(){
        var currentAnimal = Session.get("currentAnimal");
        var regex = new RegExp(["^", currentAnimal, "$"].join(""), "i");
        return Animals.find({category: regex});
        },
  });

 Template.EndangeredAnimals.helpers({
    endangeredAnimal: function(){
       return SpeciesSuite.find();
    },  
  });

 Template.Animal.events({
      'click .capture': function(event,template){
        
        MeteorCamera.getPicture({}, function(error, data){
       if (! error) {
         var name = $(event.target).attr("name").split("-");
         Meteor.call("insertImage",data,name,Geolocation.latLng());
          }
        });       
      }
    });

 Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}
