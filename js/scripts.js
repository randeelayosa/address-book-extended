// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0,
  this.contactAddresses = []
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.addEmail = function(contactAddress) {
  contactAddress.id = this.assignId();
  this.contactAddresses.push(contactAddress);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailList = email,
  this.address = address
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    function showContact(contactId) {
      var contact = addressBook.findContact(contactId);
      $("#show-contact").show();
      $(".first-name").html(contact.firstName);
      $(".last-name").html(contact.lastName);
      $(".phone-number").html(contact.phoneNumber);
      $(".email").html(contact.emailList.emailInput);
      $(".work-email").html(contact.emailList.workEmailInput);
      $(".personal-email").html(contact.emailList.personalEmailInput);
      $(".other-email").html(contact.emailList.otherEmailInput);
      $(".address").html(contact.address);
      var buttons = $("#buttons");
      buttons.empty();
      buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
    }

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = {
         emailInput: $("input#new-email").val(),
         workEmailInput: $("#new-work-email").val(),
         personalEmailInput: $("#new-personal-email").val(),
         otherEmailInput: $("#new-other-email").val()
    }
    console.log(inputtedEmail);
    var inputtedAddress = $("input#new-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-work-email").val("");
    $("input#new-personal-email").val("");
    $("input#new-other-email").val("");
    $("input#new-address").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
