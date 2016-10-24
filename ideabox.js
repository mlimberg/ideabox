
$('#title-input').on('input', function(){
  if($('#title-input').val() && $('#body-input').val()){
    $('#save-button').prop('disabled', false);
  }
});

$('#body-input').on('input', function(){
  if($('#title-input').val() && $('#body-input').val()){
    $('#save-button').prop('disabled', false);
  }
});

var ideaList = $('.idea-list');
var ideaTitle = $('.idea-title');
var ideaBody = $('.idea-body');
var saveButton = $('#save-button');
var titleField = $('#title-input');
var bodyField = $('#body-input');


function NewIdeaConstructor(titleText, bodyText) {
  this.titleText = titleField.val();
  this.bodyText = bodyField.val();
}

function clearInputFields() {
  return titleField.val("") && bodyField.val("");
}


function addNewIdeaBox(titleText, bodyText) {
  var currentIdea = new NewIdeaConstructor();
  var titleText = currentIdea['titleText'];
  var bodyText = currentIdea['bodyText'];
  var newIdea = $(
    `<article class="idea-box">
      <h1 class="idea-title">${titleText}</h1>
      <img class="delete-idea" />
      <p class="idea-body">${bodyText}</p>
      <div class="idea-quality">Swillobv</div>`
      );
ideaList.prepend(newIdea);
}

saveButton.on('click', function() {
  addNewIdeaBox();
  clearInputFields();
});
