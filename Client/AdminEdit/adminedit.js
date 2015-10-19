if (Meteor.isClient) {
  Meteor.subscribe("Images");
Meteor.subscribe("Data");

Template.category.events({
      'click .category-item': function(event,template){
        var category =template.$(event.target).html();
        template.$('#CategoryName').html(category);
        Session.set('category',category);

    }
});

Template.SelectedCategory.events({
      'click .category-item': function(event,template){
        var category =template.$(event.target).html();
        template.$('#CategoryName').html(category);
        Session.set('selectedcategory',category);

    }
});


Template.imageView.helpers({
  isRefresh: function(){
     return Session.get("isRefresh");
  }
});

Template.imageView.events({
      'click .submit': function(event,tmpl){
        var animalcategory = tmpl.$('#CategoryName').html();
        var speciescategory = tmpl.$('#SpeciesName').html();
        loadData(animalcategory,speciescategory);
        Session.set("isRefresh",true);
}});


function loadData(animalcategory, speciescategory)
{
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
}

Template.Countofspecies.events({
      'click .species-item': function(event,template){
        var species =template.$(event.target).html();
        template.$('#SpeciesName').html(species);
    }
});

Template.SelectedSpecies.events({
      'click .species-item': function(event,template){
        var species =template.$(event.target).html();
        template.$('#SpeciesName').html(species);
    }
});

Template.category.rendered = function() {
  Tracker.autorun(function(){
  this.$('.category-dropdown').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
});
  });
}

Template.SelectedCategory.rendered = function() {
  Tracker.autorun(function(){
  this.$('.selectedcategory-dropdown').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
});
  });
}

// Add the template helper to get the Vendors list
Template.category.helpers({
  animalList: function() {
    return SpeciesSuite.find({},{category:1});
  }
});

Template.SelectedCategory.helpers({
  animalList: function() {
    return SpeciesSuite.find({},{category:1});
  }
});


Template.Countofspecies.rendered = function() {
  Tracker.autorun(function(){
  this.$('.species-dropdown').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
  });
    });
}

Template.SelectedSpecies.rendered = function() {
  Tracker.autorun(function(){
  this.$('.selectedspecies-dropdown').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
  });
    });
}

Template.Countofspecies.helpers({
  speciesList: function() {
    var category = Session.get('category');
    var regex = new RegExp(["^", category, "$"].join(""), "i");
    return Animals.find({category: regex},{fields: {species:1}});
  }
});

Template.SelectedSpecies.helpers({
  speciesList: function() {
    var category = Session.get('selectedcategory');
    var regex = new RegExp(["^", category, "$"].join(""), "i");
    return Animals.find({category: regex},{fields: {species:1}});
  }
});

Template.Images.helpers({
  ImageData: function(){
    return Session.get('ImageData');
  },
});

Template.CardContent.helpers({
  resultoutput: function (value) {
    return value[0];
  },
  isrecognized:function(value){
    return value[1] === true;
  },

});


Template.CardContent.events({
  'click .deleteCard' : function(event,tmpl) {
    var id = tmpl.$('.data-card .hdnDataId').val();
    // Meteor.call('deleteItem',id);
    console.log($(event.target).parents('li'));
     tmpl.$(event.target).parents('li').remove();
  },
  "click .accept": function(event,template){
    var animalcategory = template.$('#CategoryName').html();
    var speciescategory = template.$('#SpeciesName').html();
    var id = template.$('.hdnDataId').val();
    Meteor.call("updateItem",id,animalcategory,speciescategory);
  }
});

Template.CardDescription.helpers({
  geo2address: function(marker){
    if(marker !== null)
    {
    var lat = marker.lat,
        lng = marker.lng;
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false";
    $.get(url).done(function(responseText){
      Session.set('location',responseText.results[0].formatted_address);
    });
    return Session.get('location');
  }
  else {

    return "Unknown";
  }
}
});

Template.CardReveal.events({
  "click .editCard": function(event, template){
       Session.set('isEdit',true);
  },
  "click .return": function(event,template){
    Session.set("isEdit", false);
  },
  "click .save": function(event,template){

  }

});

Template.CardReveal.onCreated = function(){
   Session.setDefault("isEdit", false);
};


Template.CardReveal.helpers({
  isEdit: function(){
     return Session.get("isEdit");
  },

});


Template.Images.rendered = function(){
 delete Session.keys.Images;
 delete Session.keys.ImageData;
}
}
