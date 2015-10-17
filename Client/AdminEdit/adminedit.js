if (Meteor.isClient) {
  Meteor.subscribe("Images");
Template.category.events({
      'change .ui.selection.dropdown': function(event,template){

        var category =$(event.target).val();
        Session.set('category',category);

    }
});

Template.imageView.events({
      'click .submit': function(event,tmpl){
        var animalcategory = $('#animalID').text();
        var speciescategory = $('#speciesID').text();
        var categoryregex = new RegExp(["^", animalcategory, "$"].join(""), "i");
        var speciesregex = new RegExp(["^", speciescategory, "$"].join(""), "i");
        var tempCollection = new Meteor.Collection(null);
        var FileData = Data.find({category:categoryregex ,name: speciesregex});
        FileData.forEach(function(user)
          {
              var newRecord = {
                    name: user.name,
                    category: user.category,
                    marker: user.marker,
                    _id :user._id,
                    image: Images.findOne({_id: user._id})
                  };
              tempCollection.insert(newRecord);
          });
        Session.set('ImageData',tempCollection.find().fetch());
        console.log(Session.get('ImageData'));
    },
});

Template.category.rendered = function() {
  $('.ui.selection.dropdown')
    .dropdown('restore default text')
    ;
}
// Add the template helper to get the Vendors list
Template.category.helpers({
  animalList: function() {
    return SpeciesSuite.find({},{category:1});
  }
});

Template.Countofspecies.rendered = function() {
  $('.ui.selection.dropdown')
    .dropdown('restore default text')
    ;
}

Template.Countofspecies.helpers({
  speciesList: function() {
    var category = Session.get('category');
    var regex = new RegExp(["^", category, "$"].join(""), "i");
    return Animals.find({category: regex},{fields: {species:1}});
  }
});

Template.Images.helpers({
  ImageData: function(){
    return Session.get('ImageData');
  }
});

Template.Images.onRendered=(function(){
 delete Session.keys.Images;
 delete Session.keys.ImageData;
});

Template.imageView.rendered = function() {
  var $container = $('.imageView');
  $container.imagesLoaded( function(){
    $container.masonry({
      itemSelector : '.image'
    });
  });
}
}
