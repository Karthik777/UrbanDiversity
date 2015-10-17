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
function recognizeData(data)
{

var form = new FormData();
form.append("image_request[locale]", "en-US");
form.append("image_request[image]", data);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cloudsightapi.com/image_requests",
  "method": "POST",
  "headers": {
    "authorization": "CloudSight DqE2OqTsKI_DR_Ge2NONNw",
    "cache-control": "no-cache",
    "postman-token": "c4714f93-9935-68aa-9f32-3047544e9acc"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

}

 Template.Animal.events({
      'click .capture': function(event,template){
				MeteorCamera.getPicture({}, function(error, data){
       if (! error) {
         var name = $(event.target).attr("name").split("-");
				 var result = recognizeData(data);
         Meteor.call("insertImage",data,name,Geolocation.latLng());
          }
        });
      }
    });

Template.ImageDisplay.events({

});

 Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
