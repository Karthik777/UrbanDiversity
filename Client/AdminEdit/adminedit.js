if (Meteor.isClient) {
  Meteor.subscribe("Images");
Meteor.subscribe("Data");
Template.category.events({
      'click .category-item': function(event,template){
        var category =$(event.target).html();
        $('#CategoryName').html(category);
        Session.set('category',category);

    }
});

Template.imageView.events({
      'click .submit': function(event,tmpl){
        var animalcategory = $('#CategoryName').html();
        var speciescategory = $('#SpeciesName').html();
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
                    result:user.result,
                    image: Images.findOne({_id: user._id})
                  };
              tempCollection.insert(newRecord);
          });
        Session.set('ImageData',tempCollection.find().fetch());
    },
    'click .deleteCard' : function(event,tmpl) {
      var id = $('.row .hdnId').val();
      Meteor.call('deleteItem',id);
      console.log($(this).parent());
       $(this).parent().remove();
    }
});

Template.Countofspecies.events({
      'click .species-item': function(event,template){
        var species =$(event.target).html();
        $('#SpeciesName').html(species);
    }
});

Template.category.rendered = function() {
  this.$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
});

}
// Add the template helper to get the Vendors list
Template.category.helpers({
  animalList: function() {
    return SpeciesSuite.find({},{category:1});
  }
});

Template.Countofspecies.rendered = function() {
  this.$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
  });
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

}
