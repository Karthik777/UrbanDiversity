// routes.js

Router.configure({
	layoutTemplate : "ApplicationLayout"
});

Router.map(function(){

this.route('/',function(){
	this.render('EndangeredAnimals');
});

this.route('/',{
path: '/:_name' ,
template: "Animal",
// waitOn: function(){
// 		    return Meteor.subscribe("CalledAnimal", this.params._name);
// 	},
data: function(){
	var name = this.params._name;
	
	Session.set("currentAnimal",name);
}

});
});