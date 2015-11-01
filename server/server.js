// server.js
Meteor.startup(function () {

   Meteor.publish("SpeciesSuite",function(){
   	return SpeciesSuite.find();
   });

   Meteor.publish("Animals",function(){
   	return Animals.find();
   });

  Meteor.publish("Images",function(){
    return Images.find();
  });

  Meteor.publish("Data",function(){
    return Data.find();
  });

  Meteor.methods({
        
          insertImage: function(id,name,marker,result){

  				       Data.insert({
  				            category: name[0],
  				            name: name[1],
  				            marker: marker,
  				            _id: id,
                      result: result,
  				            createdAt: new Date(),            // current time
  				            owner: Meteor.userId(),           // _id of logged in user
  				            username: Meteor.user().username // username of logged in user
                    });
                  },
          deleteItem: function(id)
          {
            Data.remove({_id:id});
          },
          updateItem:function(id,category,species)
          {
            Data.update({_id : id},{
            $set: {name: species, category: category}
      });
          }
  		});

ServiceConfiguration.configurations.remove({ service: 'auth0' });
ServiceConfiguration.configurations.insert({
  service:      'auth0',
  domain:       'karthik.au.auth0.com',
  clientId:     'Qx0E3rVXe13dsYi6KeK2d9y0tjbZbEgC',
  clientSecret: 'BwP7X7fU2IyCDDt2rgI501UbsSOAQx5zKeU8wTZF8QgRySnoIA9GstfvhgdW1bt6',
  callbackURL:  '/',
  redirectURI:'https://karthik.au.auth0.com/login/callback'
});
  });
