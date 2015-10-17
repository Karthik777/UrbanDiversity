// helper.js
Animals = new Meteor.Collection("Animals");
SpeciesSuite = new Meteor.Collection('AnimalList');
Data = new Meteor.Collection('speciesData')
var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('200', '200').stream().pipe(writeStream);
};

Images = new FS.Collection("images", {
  stores: [
    new FS.Store.FileSystem("thumbs", { transformWrite: createThumb }),
    new FS.Store.FileSystem("images"),
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});

Images.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return false;
  },
  remove: function () {
    return false;
  },
  download: function () {
    return true;
  }
});


Meteor.methods({

        insertImage: function(data,name,marker){

               var fileObj = Images.insert(data);

				       Data.insert({
				            category: name[0],
				            name: name[1],
				            marker: marker,
				            _id: fileObj._id,
				            createdAt: new Date(),            // current time
				            owner: Meteor.userId(),           // _id of logged in user
				            username: Meteor.user().username // username of logged in user
                  });
                  //
                  // var form = new FormData();
                  // form.append("image_request[locale]", "en-US");
                  // form.append("image_request[image]", data);
                  // var settings = {
                  //   "async": true,
                  //   "crossDomain": true,
                  //   "url": "https://api.cloudsightapi.com/image_requests",
                  //   "method": "POST",
                  //   "headers": {
                  //     "authorization": "CloudSight DqE2OqTsKI_DR_Ge2NONNw",
                  //   },
                  //   "processData": false,
                  //   "contentType": false,
                  //   "mimeType": "multipart/form-data",
                  //   "data": form
                  // }
                  //
                  // $.ajax(settings).done(function (response) {
                  //   console.log(response);
                  //
                  // });
                  		},

		});
