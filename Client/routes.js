// routes.js

Router.configure({
	layoutTemplate : "ApplicationLayout",
	loadingTemplate:"loading"
});

Router.map(function(){
	this.route('/mapview',function(){
	this.render('mapview');
});

	this.route('/data',function(){
		this.render('imageView');
	})

this.route('/',function(){
	this.render('EndangeredAnimals');
});

this.route('/',{
path: '/:_name',
template: "Animal",
// waitOn: function(){
// 		    return Meteor.subscribe("CalledAnimal", this.params._name);
// 	},
data: function(){
	if(Geolocation.latLng())
	{
	var name = this.params._name;
	Session.set("currentAnimal",name);
  }
}

});

});
