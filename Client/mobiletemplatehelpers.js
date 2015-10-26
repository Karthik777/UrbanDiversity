// templatehelpers.js
if (Meteor.isClient) {
	Meteor.subscribe("SpeciesSuite");
	Meteor.subscribe("Animals");

Template.navigation.events({
	'click .login': function(event,template){
    var t =  Meteor.loginWithAuth0();
		console.log(t);
		},
		'click .logout': function(event,template){
	      Meteor.logout();
				}
		});

		Template.privateView.rendered = function() {
	  	    this.$('.login-dropdown').dropdown();
					this.$(".button-collapse").sideNav();
				  }

		Template.publicView.rendered = function() {
				 		 this.$(".button-collapse").sideNav();
				 			 }

		Template.privateView.helpers({
			 getUserName: function(){
				 if(Meteor.user().profile)
				 {
						return Meteor.user().profile.name;
					}
					else {
						return Meteor.user().username;
					}
				}
			});

			Template.upload.events(

				{'click input[type="submit"]' : function(event,template) {
				  event.preventDefault();
			    var file = $('#file').get(0).files[0];
			    file.owner = Meteor.userId();
			    console.log(file);
          var animal ="Bird-Seagull";
				  recognizeAndStoreData1(file,animal.split("-"));
				}});


 Template.Animal.helpers({
    animal: function(){
			if(Geolocation.latLng())
			{
        var currentAnimal = Session.get("currentAnimal");
        var regex = new RegExp(["^", currentAnimal, "$"].join(""), "i");
        return Animals.find({category: regex});
        }
			},
  });

 Template.EndangeredAnimals.helpers({
    endangeredAnimal: function(){
       return SpeciesSuite.find();
    },
  });
	function dataURItoBlob(dataURI) {
	    // convert base64/URLEncoded data component to raw binary data held in a string
	    var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);

	    // separate out the mime component
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	    // write the bytes of the string to a typed array
	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }

	    return new File([ia],"image.jpeg", {type:mimeString});
	}
	function recognizeAndStoreData1(data,name)
	{
	var image = data;
	var form = new FormData();
	form.append("image_request[locale]", "en-US");
	form.append("image_request[image]", image);

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.cloudsightapi.com/image_requests",
	  "method": "POST",
	  "headers": {
	    "authorization": "CloudSight DqE2OqTsKI_DR_Ge2NONNw",
	    "cache-control": "no-cache"
	  },
	  "processData": false,
	  "contentType": false,
	  "mimeType": "multipart/form-data",
	  "data": form
	}
	var returnObject= new Array();
	$.ajax(settings).done(function (response) {
		var resp = EJSON.parse(response);
		var getURL = "https://api.cloudsightapi.com/image_responses/"+resp["token"];
		var getsettings = {
		  "url": getURL,
		  "method": "GET",
		  "headers": {
		    "authorization": "CloudSight DqE2OqTsKI_DR_Ge2NONNw",
		    "cache-control": "no-cache"
		  }
		};
			$.ajax(getsettings).done(function(getResponse){
				console.log(getResponse);
				if(getResponse.status =="completed"){
					var responseRecommendation = getResponse.name;
					returnObject.push(responseRecommendation);
					if(responseRecommendation.indexOf(name[0])> -1 || responseRecommendation.indexOf(name[1])> -1)
					{
			        returnObject.push(true);
					}
			    else{
						Materialize.toast("It seems like you have uploaded an unrelated image. We think it's a " + responseRecommendation,2000);
						returnObject.push(false);
					}
				}
				else{
					Meteor.setTimeout(function(){
						$.ajax(getsettings).done(function(getResponse){
						 if(getResponse.status =="completed"){
							 var responseRecommendation = getResponse.name;
							 returnObject.push(responseRecommendation);
							 if(responseRecommendation.indexOf(name[0])> -1 || responseRecommendation.indexOf(name[1])> -1)
							 {
								   Materialize.toast("Recognized as " + responseRecommendation);
									 returnObject.push(true);
							 }
							 else{
								 Materialize.toast("It seems like you have uploaded an unrelated image. We think it's a " + responseRecommendation, 2000);
								 returnObject.push(false);
							 }
						 }
					}, 5000);
				});
			}
			if(returnObject.length < 2)
			{
				Materialize.toast("We were not able to recognize the image.But our experts would do it later.", 2000);
			}
			var fileObj = Images.insert(data);
			Meteor.call("insertImage",fileObj._id,name,Geolocation.latLng(),returnObject);

			});
	});
	}

function recognizeAndStoreData(dataString,name)
{
var image = dataURItoBlob(dataString);
var form = new FormData();
form.append("image_request[locale]", "en-US");
form.append("image_request[image]", image);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.cloudsightapi.com/image_requests",
  "method": "POST",
  "headers": {
    "authorization": "CloudSight DqE2OqTsKI_DR_Ge2NONNw",
    "cache-control": "no-cache"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}
var returnObject= new Array();
$.ajax(settings).done(function (response) {
	var resp = EJSON.parse(response);
	var getURL = "https://api.cloudsightapi.com/image_responses/"+resp["token"];
	var getsettings = {
	  "url": getURL,
	  "method": "GET",
	  "headers": {
	    "authorization": "CloudSight DqE2OqTsKI_DR_Ge2NONNw",
	    "cache-control": "no-cache"
	  }
	};
		$.ajax(getsettings).done(function(getResponse){
			console.log(getResponse);
			if(getResponse.status =="completed"){
				var responseRecommendation = getResponse.name;
				returnObject.push(responseRecommendation);
				if(responseRecommendation.indexOf(name[0])> -1 || responseRecommendation.indexOf(name[1])> -1)
				{
		        returnObject.push(true);
				}
		    else{
					Materialize.toast("It seems like you have uploaded an unrelated image. We think it's a " + responseRecommendation,2000);
					returnObject.push(false);
				}
			}
			else{
				Meteor.setTimeout(function(){
					$.ajax(getsettings).done(function(getResponse){
					 if(getResponse.status =="completed"){
						 var responseRecommendation = getResponse.name;
						 returnObject.push(responseRecommendation);
						 if(responseRecommendation.indexOf(name[0])> -1 || responseRecommendation.indexOf(name[1])> -1)
						 {
							   Materialize.toast("Recognized as " + responseRecommendation);
								 returnObject.push(true);
						 }
						 else{
							 Materialize.toast("It seems like you have uploaded an unrelated image. We think it's a " + responseRecommendation, 2000);
							 returnObject.push(false);
						 }
					 }
				}, 5000);
			});
		}
		if(returnObject.length < 2)
		{
			Materialize.toast("We were not able to recognize the image.But our experts would do it later.", 2000);
		}
		var fileObj = Images.insert(dataString);

		Meteor.call("insertImage",fileObj._id,name,Geolocation.latLng(),returnObject);

		});
});
}

 Template.Animal.events({
      'click .capture': function(event,template){
				MeteorCamera.getPicture({}, function(error, data){
       if (! error) {
         var name = $(event.target).attr("name").split("-");
				 recognizeAndStoreData(data,name);

          }
        });
      }
    });


 Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
