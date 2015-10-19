// server.js
Meteor.startup(function () {
       if (! Animals.findOne()){
           var animals = [
        {path: '/Spiders/redback-spider.jpg', category: 'Spider', species: 'Redback'},
        {path: '/Spiders/australian-garden-spider.jpg', category: 'Spider', species: 'Australian Garden'},
        {path: '/Spiders/australian-tarantula.jpg', category: 'Spider', species: 'Australian Tarantula'},
        {path: '/Spiders/black-house-spider.jpg', category: 'Spider', species: 'Black House'},
        {path: '/Spiders/brown-recluse.jpg', category: 'Spider', species: 'Brown Recluse'},
        {path: '/Spiders/huntsman-spider.jpg', category: 'Spider', species: 'Huntsman'},
        {path: '/Spiders/mouse-spider.jpg', category: 'Spider', species: 'Mouse'},
        {path: '/Frogs/froglet.jpg', category: 'Frog', species: 'Froglet'},
        {path: '/Frogs/Pobblebonk.jpg', category: 'Frog', species: 'Pobblebonk'},
        {path: '/Frogs/Tadpole.jpg', category: 'Frog', species: 'Tadpole'},
        {path: '/Snakes/Cobra.jpg', category: 'Snake', species: 'Cobra'},
        {path: '/Snakes/python.jpg', category: 'Snake', species: 'Python'},
        {path: '/Snakes/rattlesnake.jpg', category: 'Snake', species: 'Rattle Snake'},
        {path: '/Birds/Cockatoo.jpg', category: 'Bird', species: 'Cockatoo'},
        {path: '/Birds/Cormorant.jpg', category: 'Bird', species: 'Cormorant'},
        {path: '/Birds/Duck.jpg', category: 'Bird', species: 'Duck'},
        {path: '/Birds/Eagle.jpg', category: 'Bird', species: 'Eagle'},
        {path: '/Birds/Honeyeater.jpg', category: 'Bird', species: 'Honeyeater'},
        {path: '/Birds/lorikeet.jpg', category: 'Bird', species: 'Lorikeet'},
        {path: '/Birds/magpie.jpg', category: 'Bird', species: 'Magpie'},
        {path: '/Birds/Owl.jpg', category: 'Bird', species: 'Owl'},
        {path: '/Birds/parrot.jpg', category: 'Bird', species: 'Parrot'},
        {path: '/Birds/Rosella.jpg', category: 'Bird', species: 'Rosella'},
        {path: '/Birds/seagull.jpg', category: 'Bird', species: 'Seagull'},
        {path: '/Bats/fruitbat.jpg', category: 'Bat', species: 'Fruit Bat'},
        {path: '/Bats/vampirebat.jpg', category: 'Bat', species: 'Vampire Bat'},
        ];
      animals.forEach(function (animal) {
        Animals.insert(animal);
      });

    }

    if(!SpeciesSuite.findOne())
    {
      var animalList = [
       {category:'Spider', path:'spider.jpg'},
       {category:'Frog', path:'frog.jpg' },
       {category:'Snake', path:'snake.jpg'},
       {category:'Bird', path:'bird.jpg' },
       {category:'Bat', path:'Bat.jpg' },
        ];
      animalList.forEach(function(animal){
        SpeciesSuite.insert(animal);
      })

    }



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
            console.log(id,category,species);
            Data.update({_id : id},{
            $set: {name: species, category: category}
      });
          }
  		});
  });
