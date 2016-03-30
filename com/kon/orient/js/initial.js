/**
 * Created by kshevchuk on 7/14/2015.
 */

//anonymous function is passed directly to the jQuery constructor, which assigns it to the ready event
// such as $(document).ready(function());
$(function() {
    $("#divTest1").text("Hello, world!")
        .removeClass("blue")
        .addClass("bold")
        .css("color", "blue");

    var container = $('#radio_container');
    for (var i = 0; i < 20; i++) {
        container.append('<input type="radio" name="radio_group" value="' + i + '">');
    }

    $(".bold").css("font-weight", "bold");

    //This will match all span elements with "bold" as the class.
    // Of course, it can be used with ID's and pretty much all of the other selectors as well.

    //$("span.bold").css("font-weight", "bold");

    // use the attribute selector to find all elements on the page which has a title attribute and then underline it
    //JQuery Attribute Selector - Find elements with a specific attribute
    $("[title]").css("text-decoration", "underline");


    // Find elements with a specific value for a specific attribute
    $("a[target='_blank']").append(" [new window]");

    //The selector simply tells jQuery to find all links (the a elements)
    // which has a target attribute that equals the string value "_blank" and then append the text "[new window]" to them.
    // But what if you're looking for all elements which don't have the value
    $("a[target!='_blank']").append(" [same window]");

    //Find elements with a value which starts with a specific string using the ^= operator:
    $("input[name^='txt']").css("color", "blue");

    //Find elements with a value which ends with a specific string using the $= operator
    $("input[name$='letter']").css("color", "red");

    //Find elements with a value which contains a specific word:
    $("input[name*='txt']").css("color", "blue");

    // - Parent/child relation selectors

    //finding children which are direct descendants of an element
    $("div > a")

    //match all links within a div element, no matter if they are directly related or not
    $("div a")


    //color bold tags blue if they are directly descending from the first test area:
    $("#divTestArea1 > b").css("color", "blue");

    //As you will see, only the first bold tag is colored.
    // Now, if you had used the second approach, both bold tags would have been colored blue.
    // Try the following example, where the only thing changed is the greater-than character which has been replaced with a space,
    // to note that we also accept non-direct descendants or "grand children" as they are sometimes called:
    $("#divTestArea1 b").css("color", "blue");


    // - Fading elements

    // Doing simple animation is very easy with jQuery.
    // One of the effects it supports out-of-the-box, is fading an element in and out of visibility.
    // Here's a simple example, where we fade in an otherwise hidden box, using the fadeIn() method:


});

function ShowBox()
{
    $("#divFade").fadeIn();
}

function ShowBoxes()
{
    $("#divTestArea21").fadeIn("fast");
    $("#divTestArea22").fadeIn("slow");
    $("#divTestArea23").fadeIn(2000);
}


$(function() {
    $("#divTestArea3").fadeIn(2000, function() {
        $("#divTestArea3").fadeOut(3000);
    });
});

function ToggleBox() {
    $("#divTestArea4").fadeToggle("slow");
}


// - Sliding elements
function ShowBoxSlideDown() {
    $("#divTestArea5").slideDown();
}

// For hiding the box again, we can use the slideUp() method.
// They both take the same set of parameters, which are all optional.
// The first parameter allows you to specify a duration for the effect in milliseconds, or "fast" or "slow",
// which is the same as specifying either 200 or 600 milliseconds
function ShowThreeBoxes()
{
    $("#divTestArea31").slideDown("fast");
    $("#divTestArea32").slideDown("slow");
    $("#divTestArea33").slideDown(2000);
}

//he second parameter can either be the name of an easing function (which we won't use in this tutorial)
// or a callback function that you may supply, to be called once the effect is done

$(function()
{
    $("#divTestArea55").slideDown(2000, function()
    {
        $("#divTestArea55").slideUp(3000);
    });
});

function ToggleBoxUpDown() {
    $("#divTestArea56").slideToggle("slow");
}

// - DOM manipulation
//Text is a textual (no HTML) representation of the inner content for all regular elements,
// values are for form elements and HTML is the same as text, but including any markup.
$(function() {
    alert("Text: " + $("#divTest2").text());
    alert("HTML: " + $("#divTest2").html());
    alert("Value: " + $("#divTest2").val());

    alert("Text: " + $("#txtTest2").text());
    alert("HTML: " + $("#txtTest2").html());
    alert("Value: " + $("#txtTest2").val());
});

// dynamically set values
$(function()
{
    $("#divTextA").text("A dynamically set text");
    $("#divHtmlA").html("<b><i>A dynamically set HTML string</i></b>");
    $("#txtTestA").val("A dynamically set value");
});

// callback to capture old text - can be done the same for html and val
$(function() {
    $("p").text(function(index, oldText) {
        return "Existing text: " + oldText + ". New text: A dynamically set text (#" + index + ")";
    });
});

// - Getting and setting attributes [attr()]

// In the previous chapter, we saw how easy it was to get and set text and HTML content from and to an element.
// Fortunately, changing one or more attributes of an element is just as easy.
// We use the attr() method for this, which in its simplest form takes one parameter:
// The name of the attribute we wish to get:

$(function() {
    alert($("#aGoogle1").attr("href"));
});

// In this example, we get the value of the "href" attribute of our link and then show it to the user.
//
// To change an attribute, we simply specify an extra parameter:
$(function()
{
    $("#aGoogle2").attr("href", "http://www.google.co.uk");
});

//This will change the link to point to the British version of Google.
// The attr() method can also take a map of name/value pairs, for setting multiple attributes at the same time.
// Here we set both the href and the title attributes simultaneously

$(function() {
    $("#aGoogle3").attr({
            "href" : "http://www.google.co.uk",
            "title" : "Google.co.uk"
        });
});


// The attr() method also supports the special overload where the value parameter is instead a callback function,
// allowing you to access the index of the element selected as well as the existing attribute value
$(function() {
    $("a.google").attr("href", function(index, oldValue) {
        return oldValue + "imghp?tab=wi";
    });
});

// We simply change all the Google links to point to the
// Image search instead of the default page, by adding an extra parameter to the href attribute.
// In this example we don't really use the index parameter,
// but we could have if we needed it, to tell us which index in the list of elements selected we're currently dealing with.



// - Getting and setting CSS classes

// In the following example we will use three of the most interesting class related methods: hasClass(),
// which checks if one or several elements already has a specific class defined, addClass(),
// which simply adds a class name to one or several elements and the removeClass() methods,
// which will.... well, you've probably already guessed it.

function ToggleClass(sender) {

    if($(sender).hasClass("bold"))
        $(sender).removeClass("bold");
    else
        $(sender).addClass("bold");
}

//The example is actually very simple.
// When the link is clicked, we send the link itself (this) as a parameter to the ToggleClass() method that we have defined.
// In it, we check if the sender already has the "bold" class - if it has, we remove it,
// otherwise we add it. This is a pretty common thing to do,
// so obviously the jQuery people didn't want us to write an entire three lines of code to it.
// That's why they implemented the toggleClass() method, with which we can turn our entire example above into a single line of code:
// <a href="javascript:void(0);" onclick="$(this).toggleClass('bold');">Toggle class</a>


// we can select multiple elements, where we can add or remove multiple classes, as well
$(function() {
    $("#divTestArea6 span, #divTestArea6 b").addClass("blue");
    $("#divTestArea6 div").addClass("bold blue");
});


// - The append() and prepend() methods

// Adding new stuff to existing elements is very easy with jQuery.
// There are methods for appending or prepending, taking HTML in string format,
// DOM elements and jQuery objects as parameters. In the next example,
// you will see how easy it is to insert new elements in a list,
// using both the append() and the prepend() method:


// we could have generated the new items with jQuery as well, or created it through regular JavaScript code and DOM elements.
// In fact, both the append() and the prepend() method takes an infinite amount of new elements as parameters.
function AppendItemsToList() {
    var item1 = $("<li></li>").text("Item 1");
    var item2 = "<li>Item 2</li>";
    var item3 = document.createElement("li");
    item3.innerHTML = "Item 3";

    $("#olTestList2").append(item1, item2, item3);
}

// As you can see, item1 is a jQuery generated element, item2 is a simple HTML string and item3 is a JavaScript DOM generated element.
// They are all appended to the list using the same call and of course this would have worked for the prepend() method too.

// There are variations of the append() and prepend() methods, called appendTo() and prependTo().
// They do pretty much the same, but they do it the other way around,
// so instead of calling them on the elements you wish to append/prepend to,
// with a parameter of what is to be appended/prepended, you do the exact opposite.
// Which to use obviously depends on the situation, but here's an example showing you how to use them both:

function PrependItemsToList() {
    $("#olTestList3").prepend($("<li></li>").text("prepend() item"));
    $("<li></li>").text("prependTo() item").prependTo("#olTestList3");
}


// - The before() and after() methods
function InsertElements() {
    var element1 = $("<b></b>").text("Hello ");
    var element2 = "<i>there </i>";
    var element3 = document.createElement("u");
    element3.innerHTML = "jQuery!";

    $("#spnTest2").after(element1, element2, element3);
}


// -- Introduction to AJAX
/**
- Advantages

 Your page will be more pleasant to use, when you can update parts of it without a refresh, which causes the browser to flicker and the statusbar to run.
 Because you only load the data you need to update the page, instead of refreshing the entire page, you save bandwidth.
 - Disadvantages

 Because the updates are done by JavaScript on the client, the state will not register in the browsers history, making it impossible to use the Back and Forward buttons to navigate between various states of the page.
 For the same reason, a specific state can't be bookmarked by the user.
 Data loaded through AJAX won't be indexed by any of the major search engines.
 People using browsers without JavaScript support, or with JavaScript disabled, will not be able to use the functionality that you provide through AJAX.


 The first two items on the list may be circumvented though,
 typically through the use of an iframe and reading and writing data from the part of the URL after the # character.
*/

// - The load() method
$(function() {
    $("#divTestArea7").load("content.html");
});

// If you have the content file in another directory,
// or if you have named it differently, you will have to change the parameter for the load method accordingly.
// This is all it takes to load content from an external file with jQuery and the load method.
// A pretty cool trick is that you can actually pass a selector along with the URL,
// to only get a part of the page. In the first example, we loaded the entire file, but in the following example,
// we will only use the div, which contains the first sentence:

$(function()
{
    $("#divTestArea8").load("content.html #divContent");
});

// The load method can take two extra parameters:
// A set of querystring key/value pairs, and a callback function which will be executed when the load method finishes,
// no matter if it succeeds or fails.
// Here is an example where we use the callback function to inform about the result.
// Normally, you would likely only show a message if the method fails, but to illustrate how it works,
// we do it if the method fails as well. I make sure that it fails for the example, by requesting a file which doesn't exist:
$(function() {
    $("#divTestArea9").load("no-content.html", function(responseText, statusText, xhr) {
        if(statusText == "success")
            alert("Successfully loaded the content!");
        if(statusText == "error")
            alert("An error occurred: " + xhr.status + " - " + xhr.statusText);
    });
});

// As you can see, the callback function specifies 3 parameters, which jQuery will fill in for you.
// The first parameter will contain the resulting content if the call succeeds.
// The second parameter is a string which specifies the status of the call, e.g. "success" or "error".
// You can use it to see if the call was successful or not.
// The third parameter is the XMLHttpRequest object used to perform the AJAX call.
// It will contain properties which you can use to see what went wrong and many other things.

// -- The get() and post() methods
$(function() {
    $.get("content.html", function(data, textStatus) {
        alert("Done, with the following status: " + textStatus + ". Here is the response: " + data);
    });
});

$(function() {
    $.post("test_post.php", {
            name: "John Doe",
            age: "42"
        },
        function(data, textStatus) {
            alert("Response from server: " + data);
        });
});


// - Working with widths and heights
// jQuery makes it easy for you to work with the dimensions of your elements and even the browser window.
// You can use the width() and height() methods for finding the dimensions,
// or alternatively the innerWidth()/innerHeight()/outerWidth()/outerHeight() methods,
// depending on the measurements you need. First a little example illustrating the differences and the some explanation

function ShowElementDimensions() {
    var result = "";

    result += "Dimensions of div: " + $("#divTestAreaA").width() + "x" + $("#divTestAreaA").height() + "</br>";
    result += "Inner dimensions of div: " + $("#divTestAreaA").innerWidth() + "x" + $("#divTestAreaA").innerHeight() + "</br>";
    result += "Outer dimensions of div: " + $("#divTestAreaA").outerWidth() + "x" + $("#divTestAreaA").outerHeight() + "</br>";
    result += "Outer dimensions of div (with margin): " + $("#divTestAreaA").outerWidth(true) + "x" + $("#divTestArea1").outerHeight(true) + "</br>";

    $("#divTestAreaA").html(result);
}

// The example is quite simple. We have a div element with extra padding, extra margin and a border. When we click the link, we use the width()/height(), innerWidth()/innerHeight() and outerWidth()/outerHeight() methods to show the dimensions of the element.

// The width() and height() is simply the computed size of the element.
// If you use innerWidth() and innerHeight(), padding is included in the returned values.
// If you use the outerWidth() and outerHeight() methods, both padding and border is included in the returned values.
// hese last methods take an optional boolean parameter which tells jQuery whether or not to include the margin as well,
// as you can see from the example.

// The width() and height() methods can also be used to get the current dimensions of the browser window
function ShowBrowserDimensions() {
    alert("Dimensions of document: " + $(document).width() + "x" + $(document).height());
    alert("Dimensions of window: " + $(window).width() + "x" + $(window).height());
}


// Both the width() and the height() methods can also be used to set new dimensions for an element,
// simply by providing a parameter with the new value. Check out this example

function ResizeElement() {
    $("#divTestAreaB").width(150).height(50);
}


// Other frameworks and the noConflict() method


// There may come a time when you wish to use other frameworks on your pages,
// while still using jQuery. For instance, a lot of third party JavaScript packages
// out there depends on one of the popular JavaScript frameworks, like ExtJS, MooTools and so on.
// Some of them uses the $ character as a shortcut, just like jQuery does,
// and suddenly you have two different frameworks trying to claim the same identifier,
// which might make your external scripts stop working. Fortunately the jQuery developers have already thought
// about situations like this and implemented the noConflict() method.

//$.noConflict();
//jQuery("#divTestAreaC").text("jQuery is still here!");