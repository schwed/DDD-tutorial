/**
 * Created by kshevchuk on 7/22/2015.
 */

var Human = Backbone.Model.extend({
    // If you return a string from the validate function,
    // Backbone will throw an error
    validate: function(attributes) {
        if (attributes.age < 0 && attributes.name != 'Dr. Manhattan') {
            return "You cant't be negative years old";
        }
    },
    // Sometimes you will want your model to contain default values.
    // This can easily be accomplished by setting a property name 'defaults' in your model declaration
    defaults: {
        name: 'Fetus',
        age: 0,
        child: ''
    },

    initialize: function() {
        //alert('Welcome to this World');

        this.bind("error", function(model, erroor) {
            // We have received an error, log it, alert it or forget it :)
            alert(erroor);
        });

        this.on("change:name", function(model) {
            var name = model.get("name"); // Stevie Griffin
           //alert("changed my name to: " + name);
        });
    },
    adopt: function(newChildName) {
        this.set({child: newChildName});
    }

});

// initialize() is triggered whenever you create a new instance of a model( models, collections and views work the same way ).
var human = new Human();


// ---------------------------- Setting attributes -----------------------------------
//var human = new Human({ name: "Thomas", age: 67});

// or we can set afterwards, these operations are equivalent
human.set({ name: "Thomas", age: 45, child: 'Ryan' });

// ----------------------------- Getting attributes ---------------------------------
var age = human.get("age"); // 67
var name = human.get("name"); // Thomas
var child = human.get("child"); // 'Ryan'

//alert(age + ", " + name + ", " + child);

// --------------------------- Setting model defaults -----------------------------------
// Sometimes you will want your model to contain default values.
// This can easily be accomplished by setting a property name 'defaults' in your model declaration

//


// -------------------- Manipulating model attributes ----------------------------------------
//Models can contain as many custom methods as you like to manipulate attributes. By default all methods are public
human.adopt("John Smith");
child = human.get("child");
//alert(child);  // John Smith

//we can implement methods to get/set and perform other calculations using attributes from our model at any time.

// -Listening for changes to the model
//Now onto one of the more useful parts of using a library such as backbone.
// All attributes of a model can have listeners bound to them to detect changes to their values.
// In our initialize function we are going to bind a function call every time we change the value of our attribute.
// In this case if the name of our "person" changes we will alert their new name.
human.set({name: "Stevie Griffin"}); // This triggers a change and will alert()

// So we can bind the change listener to individual attributes
// or if we like simply 'this.on("change", function(model){});' to listen for changes to all attributes of the model

// ---------------------------- Interacting with the server ---------------------------------------

//Models are used to represent data from your server and actions you perform on them will be translated to RESTful operations.
// The id attribute of a model identifies how to find it on the database usually mapping to the surrogate key.
// For the purpose of this tutorial imagine that we have a mysql table called Users with the columns id, name, email.
//The server has implemented a RESTful URL /user which allows us to interact with it.
var UserModel = Backbone.Model.extend({
    urlRoot: '/user',
    defaults: {
        name: '',
        email: ''
    }
});

// ------------------------------- Creating a new model -------------------------------------------
//If we wish to create a new user on the server then we will instantiate a new UserModel and call save.
// If the id attribute of the model is null, Backbone.js will send a POST request to the urlRoot of the server
var user = new UserModel();
// Notice that we haven't set an `id
var userDetails = {
    name: 'Thomas',
    email: 'thomasalwyndavis@gmail.com'
};

// Because we have not set a `id` the server will call
// POST /user with a payload of {name:'Thomas', email: 'thomasalwyndavis@gmail.com'}
// The server should save the data and return a response containing the new `id`

/*
user.save(userDetails, {
   success: function(user) {
       alert(user.toJSON());
   }
});
*/

// Our table should now have the values
//   1, 'Thomas', 'thomasalwyndavis@gmail.com'

// ----------------------------- Getting a model ----------------------------------------
//Now that we have saved a new user model, we can retrieve it from the server. We know that the id is 1 from the above example.
//If we instantiate a model with an id,
// Backbone.js will automatically perform a get request to the urlRoot + '/id' (conforming to RESTful conventions)
// Here we have set the `id` of the model
user = new UserModel({id: 1});

// The fetch below will perform GET /user/1
// The server should return the id, name and email from the database

/*
user.fetch({
    success: function(user) {
        alert(user.toJSON());
    }
});
*/


// -------------------------- Updating a model --------------------------
// Now that we have a model that exists on the server we can perform an update using a PUT request.
// We will use the save api call which is intelligent and will send a PUT request instead of a POST request
// if an id is present(conforming to RESTful conventions)

user = new UserModel({
    id: 1,
    name: 'Thomas',
    email: 'thomasalwyndavis@gmail.com'
});

// Now lets save the model
// Because there is id present, Backbone.js will fire
// PUT /user/1 with a payload of {name: 'Davis', email: 'thomasalwyndavis@gmail.com'}

/*
user.save({name: 'Davis'}, {
   success: function(user) {
    alert(user.toJSON());
   }
});
*/

// ------------------------------------ Deleting a model ------------------------------
//When a model has an id we know that it exists on the server,
// so if we wish to remove it from the server we can call destroy.
// destroy will fire off a DELETE /user/id (conforming to RESTful conventions).

// Here we have set the id of the model
user = new UserModel({
    id: 1,
    name: 'Thomas',
    email: 'thomasalwyndavis@gmail.com'
});

// Because there is id present, Backbone.js will fire
// DELETE /user/1

/*
user.destroy({
    success: function() {
        alert('Destroyed');
    }
});
*/

// -------------------------- Tips and Tricks -----------------------------
//Get all the current attributes
human = new Human({ name: "Thomas", age: 67});
var attributes = human.toJSON(); // { name: "Thomas", age: 67}
// This simply returns a copy of the current attributes.

attributes = human.attributes;
// The line above gives a direct reference to the attributes and you should be careful when playing with it.
// Best practise would suggest that you use .set() to edit attributes of a model to take advantage of backbone listeners. */


// -------------------------- Validate data before you set or save it ------------------------------------



// -------------------------- What is a collection? -------------------------------------------------------
//Backbone collections are simply an ordered set of models. Such that it can be used in situations such as;
//  •   Model: Student, Collection: ClassStudents
//  •   Model: Todo Item, Collection: Todo List
//  •   Model: Animal, Collection: Zoo

// Typically your collection will only use one type of model but models themselves are not limited to a type of collection;
//  •   Model: Student, Collection: Gym Class
//  •   Model: Student, Collection: Art Class
//  •   Model: Student, Collection: English Class

// Here is a generic Model/Collection example.
var Song = Backbone.Model.extend({

    defaults: {
        name: "Not specifies",
        artist: "Not specified"
    },
    initialize: function() {
        //alert('Music is the answer.');
    }
});

var Album = Backbone.Collection.extend({
    model: Song
});

//----------------------- Building a collection --------------------------------
// Now we are going to populate a collection with some useful data
var Song1 = new Song({name: "How bizarre", artist: "OMC"});
var Song2 = new Song({name: "Sweet Thing", artist: "Mick Jagger"});
var Song3 = new Song({name: "True colours", artist: "Fill Collings"});

var myAlbum = new Album([Song1, Song2, Song3]);
//console.log(myAlbum.models); // [song1, song2, song3]



// ----------------------------- What is a view ------------------------------------------
// Backbone views are used to reflect what your applications' data models look like.
// They are also used to listen to events and react accordingly.

// need to learn how to bind models and collections to views --------------------

//focus on view functionality and how to use views with a JavaScript templating library, specifically Underscore.js's _.template.
// We will be using jQuery 1.8.2 as our DOM manipulator as Backbone.js documentation endorses jQuery
// For the purposes of this demonstration, we will be implementing a search box.
var SearchView = Backbone.View.extend({
    initialize: function() {
        //alert("Alerts are bed practice!");
        this.render();
    },
    render: function() {
        // Compile the template using underscore
        var template = _.template( $("#search_template").html(), {} );

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );

    },

    events: {

        "click input[type=button]":"doSearch"
    },
    doSearch: function(event) {
        // Button clicked, you can access the element that was clicked with event.currentTarget
        alert("search for: " + $("#search_input").val());
    }


});


// The initialize function is always called when instantiating a Backbone View.
// Consider it the constructor of the class.
var search_view = new SearchView({el: $("#search_container")});

// The "el" property
// Note: Keep in mind that this binds the container element. Any events we trigger must be in this element


// The "el" property references the DOM object created in the browser.
// Every Backbone.js view has an "el" property, and if it is not defined, Backbone.js will construct its own,
// which is an empty div element.
// Let us set our view's "el" property to div#search_container, effectively making Backbone.View the owner of the DOM element.


//-------------- Loading a template ----------------------------------

//Backbone.js is dependent on Underscore.js, which includes its own micro-templating solution.
// Refer to Underscore.js's documentation for more information.
//Let us implement a "render()" function and call it when the view is initialized.
// The "render()" function will load our template into the view's "el" property using jQuery.


// Tip: Place all your templates in a file and serve them from a CDN. This ensures your users will always have your application cached


//------------------------------ Listening for events -----------------------------------------
//To attach a listener to our view, we use the "events" attribute of Backbone.View.
// Remember that event listeners can only be attached to child elements of the "el" property. Let us attach a "click" listener to our button.





