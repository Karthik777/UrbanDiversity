if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
  Template.mapview.helpers({
    exampleMapOptions: function() {
    // Make sure the maps API has loaded

    if (Geolocation.latLng() && GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-25.307327, 134.131766),
        zoom: 5
      };
    }
  }
  });

  Template.mapview.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  var instance = this;
  var image = {
   url: '/Icons/spider1.ico',
   // This marker is 20 pixels wide by 32 pixels high.
   size: new google.maps.Size(20, 32),
   // The origin for this image is (0, 0).
   origin: new google.maps.Point(0, 0),
  //  // The anchor for this image is the base of the flagpole at (0, 32).
   anchor: new google.maps.Point(0, 32)
 };

  instance.autorun(function(){
        GoogleMaps.ready('exampleMap', function(map) {
          var markers = [];
          var FileData = Data.find();

          var i =0;
        FileData.forEach(function(user)
          {
          var imageIcon = CreateImage(ConstructImagePath(user.category,user.name));
          console.log(imageIcon);
          if(!imageIcon)
          {
            imageIcon = CreateImage("/Icons/animal.ico");
          }
          addMarkerWithTimeout(user.marker,i*200,user.name,imageIcon);
          i++;
          });

          function CreateImage(path)
          {
            var icon = {
             url: path,
             // This marker is 20 pixels wide by 32 pixels high.
             size: new google.maps.Size(20, 32),
             // The origin for this image is (0, 0).
             origin: new google.maps.Point(0, 0),
             // The anchor for this image is the base of the flagpole at (0, 32).
             anchor: new google.maps.Point(0, 32)
           };
            return icon;
          }

          function ConstructImagePath(category,name)
          {
            var basepath = "/Icons"
            var path = basepath+"/"+
                      category.toLowerCase()+
                      "/"+
                      name.replace(" ","")
                      .toLowerCase()+".ico";
            return path;
          }
          function addMarkerWithTimeout(position, timeout,name,imageIcon) {
                window.setTimeout(function() {
                   markers.push(new google.maps.Marker({
                    position: position,
                    map: map.instance,
                    title:name,
                    icon:imageIcon,
                    animation: google.maps.Animation.DROP
                  }));
                }, timeout);
              }
        // // Add a marker to the map once it's ready
        // var position = Geolocation.latLng();
        // var marker = new google.maps.Marker({
        //   position: position,//map.options.center,
        //   map: map.instance,
        //   title:"redback",
        //   icon: image,
        //   animation: google.maps.Animation.DROP
        // });
        //
        // var position = Geolocation.latLng();
        // var marker = new google.maps.Marker({
        //   position: {lat: -25.307327,lng:134.131766},//map.options.center,
        //   map: map.instance,
        //   animation: google.maps.Animation.DROP
        // });
      });
  });


});

}
