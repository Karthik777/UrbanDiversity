//  Router.map(function () {
//   this.route('about');  // By default, path = '/about', template = 'about'
//   this.route('home', {
//     path: '/',  //overrides the default '/home'
//   });
  
//   this.route('spiders', {
//     data: function () {return Animals.find({category: "Spider"})}  //set template data context
//   });
  
//   this.route('frogs', {
//     data: function () {return Animals.find({category: "Frog"})},
//     template:'spiders'  //set template data context
//   });

//   this.route('takePhotos', {
//     path: '/takePhotos/:_id',
//     data: function () {return Articles.findOne({_id: this.params._id})},
//     template: 'takePhoto'
//   });

//   this.route('spider', {
//     path: '/spiders/:_id',
//     data: function () {return Animals.findOne({name: this.params._id})},
//     template: 'specieslist'
//   });

// this.route('australia', {
    
//     data: function () {}
//   });
// this.route('imageView',{
// data: function () {
//   // return Images.find();
// // var FileData = Data.find({name: 'Redback'},{ fields: {file: 1} });
// // // varArr = [];val=0;
// // var varArr1=new Array();
// // FileData.forEach(function(user)
// //   {
// //     varArr1.push(user._id);
   
// //   });
// // console.log(varArr1.slice(0,varArr1.length));
// //  // console.log(filearray.find().fetch);
// //  // return Images.find({_id: {$in:[varArr.join()]}}).fetch();
// //  return Images.find({_id: {$in:varArr1.slice(0,varArr1.length)}}).fetch();
  
//   } 
// });
// });

// if(Meteor.isClient){
//   var MAP_ZOOM = 15;
//   // var latLng = Geolocation.latLng();
  
//   navItems = ['viewsMenu', 'adminMenu', 'categoriesMenu'];
   

//     Template.spiders.events({
//       'click .capture': function(event,template){
        
//         MeteorCamera.getPicture({}, function(error, data){
//        if (! error) {
          
//      var fileObj =Images.insert(data);
     
//          var name = $(event.target).attr("name").split("-");
//          console.log(name[0]);
//           Data.insert({
//             category: name[0],
//             name: name[1],
//             marker: Geolocation.latLng(),
//             _id: fileObj._id,
            
//           });
//         }

//         });
//         console.log("Button clicked.");
//       }
//     });

// Template.category.events({
//       'change .ui.selection.dropdown': function(event,template){
        
//         var category =$(event.target).val();

//         Session.set('category',category);

//     }
// });

// Template.imageView.events({
//       'click .submit': function(event,tmpl){
//         var animalcategory = $('#animalID').text();
//         var speciescategory = $('#speciesID').text();
//     var categoryregex = new RegExp(["^", animalcategory, "$"].join(""), "i");
//     var speciesregex = new RegExp(["^", speciescategory, "$"].join(""), "i");

//         var FileData = Data.find({category:categoryregex ,name: speciesregex});
// var varArr1=new Array();
// var varArr2= new Array();
// FileData.forEach(function(user)
//   {
//     varArr1.push(user._id);
//     varArr2.push(user.marker);
//   });
// Session.set('ImageData',varArr2);
//  Session.set('Images',Images.find({_id: {$in:varArr1.slice(0,varArr1.length)}}).fetch());
//     },
// });
//     // Template.imageView.helpers({
//     //     images: function () {
//     //     return Data.find({name: 'Redback'},{ file: 1, _id: 0 });
//     //   }});
//  // return _.map(Data.findOne({name: 'Redback'}).file, function(image) {
//  //            return image.url;
//  //          // return Images.find(); // Where Images is an FS.Collection instance
//  //        });}});
  
// Template.map.helpers({  
//   markers:Session.get('ImageData'),
//   geolocationError: function() {
//     var error = Geolocation.error();
//     return error && error.message;
//   },
//   mapOptions: function() {
//     var latLng = Geolocation.latLng();
//     // Initialize the map once we have the latLng.
//     if (GoogleMaps.loaded() && latLng) {
//       return {
//         center: new google.maps.LatLng(latLng.lat, latLng.lng),
//         zoom: MAP_ZOOM
//       };
//     }
//   }
// });

// Template.map.onCreated(function() {
//     var self = this;

//     GoogleMaps.ready('map', function(map) {
//       var marker;

//       // Create and move the marker when latLng changes.
//       self.autorun(function() {
//         var latLng = Geolocation.latLng();
//         if (! latLng)
//           return;
// //        Session.get('ImageData').forEach(function(user)
// //   {
// //     latLng=user;
// //         // If the marker doesn't yet exist, create it.
//         if (! marker) {
//           marker = new google.maps.Marker({
//             position: new google.maps.LatLng(latLng.lat, latLng.lng),
//             map: map.instance
//           });
//         }
//         // The marker already exists, so we'll just change its position.
//         else {
//           marker.setPosition(latLng);
//         }

//         // Center and zoom the map view onto the current position.
//         map.instance.setCenter(marker.getPosition());
//         map.instance.setZoom(MAP_ZOOM);
       
// // });
//       });
//     });
//   });

// Template.Australia.helpers({
//     loc: function () {
//       // return 0, 0 if the location isn't ready
//       var location = Geolocation.latLng();

//       return Geolocation.latLng() || { lat: 0, lng: 0 };
//     },
//     error: Geolocation.error
//   });

//   Template.spiders.helpers({
//     'photo': function(){
//     // console.log(Session.get('id'));
//     // return Session.get('photo');
//       return Data.findOne();
//     }
//   });

// Template.category.rendered = function() {
//   $('.ui.selection.dropdown')
//     .dropdown('restore default text')
//     ;
// }
// // Add the template helper to get the Vendors list
// Template.category.helpers({
//   animalList: function() {
//     return SpeciesSuite.find({},{category:1});
//   }
// });

// Template.Countofspecies.rendered = function() {
//   $('.ui.selection.dropdown')
//     .dropdown('restore default text')
//     ;
// }

// Template.Countofspecies.helpers({
//   speciesList: function() {
//     var category = Session.get('category');
//     var regex = new RegExp(["^", category, "$"].join(""), "i");
//     return Animals.find({category: regex},{fields: {species:1}});
//   }
// });

// Template.Images.helpers({
//   Image: function() {
  
//   return Session.get('Images');
//   }
// });

// Template.Images.onRendered=(function(){
//  delete Session.keys.Images;
// });

//   Template.spiders.onCreated = function() {

    
//   var $container = $('.content');

//   $container.imagesLoaded( function(){
//     $container.masonry({
//       itemSelector : '.result-item'
//     });
//   });
// };

//   Template.imageView.rendered = function() {
//     var $container = $('.imageView');
//     $container.imagesLoaded( function(){
//       $container.masonry({
//         itemSelector : '.image'
//       });
//     });
//   }
// }

// Animals = new Meteor.Collection('animals')
// Data = new Mongo.Collection('speciesdata')
// SpeciesSuite = new Meteor.Collection('animalList')
// //Image Storage with File System
// var createThumb = function(fileObj, readStream, writeStream) {
//   // Transform the image into a 10x10px thumbnail
//   gm(readStream, fileObj.name()).resize('200', '200').stream().pipe(writeStream);
// };

// FS.debug = true;

// Images = new FS.Collection("images", {
//   stores: [
//     new FS.Store.FileSystem("thumbs", { transformWrite: createThumb }),
//     new FS.Store.FileSystem("images"),
//   ],
//   filter: {
//     allow: {
//       contentTypes: ['image/*'] //allow only images in this FS.Collection
//     }
//   }
// });

// Images.allow({
//   insert: function () {
//     return true;
//   },
//   update: function () {
//     return true;
//   },
//   remove: function () {
//     return true;
//   },
//   download: function () {
//     return true;
//   }
// });
// //


// if (Meteor.isServer) {

//   Meteor.startup(function () {
//     // GoogleMaps.load();
//     if (! Animals.findOne({category: 'Spider'})){
//       //  var fs = Npm.require('fs');
//       // var files = fs.readdirSync(Meteor.absoluteUrl+"/Spiders");
//       // _(files).each(r, function(filename) {
//       //         var spider = {path: "/Spiders/"+filename , category: "Spiders", species: filename};
//       //         console.log(filename);
//       //         Animals.insert(spider);
//       //     });
      
//       // var files =Assets.getText("public/Spiders");
//       //  _(files).each(r, function(filename) {
//       //         var spider = {path: "/Spiders/"+filename , category: "Spiders", species: filename};
//       //         console.log(filename);
//       //         Animals.insert(spider);
//       //     });

//       var animals = [
//         {path: '/Spiders/redback-spider.jpg', category: 'Spider', species: 'Redback'},
//         {path: '/Spiders/australian-garden-spider.jpg', category: 'Spider', species: 'Australian Garden'},
//         {path: '/Spiders/australian-tarantula.jpg', category: 'Spider', species: 'Australian Tarantula'},
//         {path: '/Spiders/black-house-spider.jpg', category: 'Spider', species: 'Black House'},
//         {path: '/Spiders/brown-recluse.jpg', category: 'Spider', species: 'Brown Recluse'},
//         {path: '/Spiders/huntsman-spider.jpg', category: 'Spider', species: 'Huntsman'},
//         {path: '/Spiders/mouse-spider.jpg', category: 'Spider', species: 'Mouse'},
//         {path: '/Spiders/sydney-funnel-web.jpg', category: 'Spider', species: 'Sydney Funnel Web'},
//         {path: '/Spiders/sydney-trapdoor-spider.jpg', category: 'Spider', species: 'Sydney Trapdoor'},
//         {path: '/Spiders/white-tailed-spider.jpg', category: 'Spider', species: 'White Tailed'}
        
//       ];
//       animals.forEach(function (animal) {
//         Animals.insert(animal);
//       })

//     }
//     if (! Animals.findOne({category:'Frog'})){
//       //  var fs = Npm.require('fs');
//       // var files = fs.readdirSync(Meteor.absoluteUrl+"/Spiders");
//       // _(files).each(r, function(filename) {
//       //         var spider = {path: "/Spiders/"+filename , category: "Spiders", species: filename};
//       //         console.log(filename);
//       //         Animals.insert(spider);
//       //     });
      
//       // var files =Assets.getText("public/Spiders");
//       //  _(files).each(r, function(filename) {
//       //         var spider = {path: "/Spiders/"+filename , category: "Spiders", species: filename};
//       //         console.log(filename);
//       //         Animals.insert(spider);
//       //     });

//       var animals = [
//         {path: '/Spiders/redback-spider.jpg', category: 'Frog', species: 'Frog1'},
//         {path: '/Spiders/australian-garden-spider.jpg', category: 'Frog', species: 'Frog2'},
//         {path: '/Spiders/australian-tarantula.jpg', category: 'Frog', species: 'Frog8'},
//         {path: '/Spiders/black-house-spider.jpg', category: 'Frog', species: 'Frog3'},
//         {path: '/Spiders/brown-recluse.jpg', category: 'Frog', species: 'Frog4'},
//         {path: '/Spiders/huntsman-spider.jpg', category: 'Frog', species: 'Frog5'},
//         {path: '/Spiders/mouse-spider.jpg', category: 'Frog', species: 'Frog6'},
//         {path: '/Spiders/sydney-funnel-web.jpg', category: 'Frog', species: 'Frog7'},
//         {path: '/Spiders/sydney-trapdoor-spider.jpg', category: 'Frog', species: 'Frog9'},
//         {path: '/Spiders/white-tailed-spider.jpg', category: 'Frog', species: 'Frog10'}
//       ];
//       animals.forEach(function (animal) {
//         Animals.insert(animal);
//       })

//     }
    
//     if(!SpeciesSuite.findOne({category: 'Spider'}))
//     {
//       var animalList = [
//        {category:'Spider', species: {1:'Redback',2:'Australian Garden',3:'Australian Tarantula',4:'Black House',5:'Brown Recluse',6:'Huntsman',7:'Mouse',8:'Sydney Funnel Web',9:'Sydney Trapdoor',10:'White Tailed'}},
       
//       ];
//       animalList.forEach(function(animal){
//         SpeciesSuite.insert(animal);
//       })
      
//     }


//     if(!SpeciesSuite.findOne({category: 'Frog'}))
//     {
//       var animalList = [
//        {category:'Frog', species: {1:'Frog1',2:'Frog2',3:'Frog3',4:'Frog4',5:'Frog5',6:'Frog6',7:'Frog7',8:'Frog8',9:'Frog9',10:'Frog10'}},
       
//       ];
//       animalList.forEach(function(animal){
//         SpeciesSuite.insert(animal);
//       })
      
//     }
//     // code to run on server at startup
   
//   });
// }
