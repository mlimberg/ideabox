
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
  var title = currentIdea.titleText;
  var body = currentIdea.bodyText;
  ideaList.prepend(
    `<article class="idea-box">
      <h2 class="idea-title">${title}</h2>
      <img class="delete-idea" />
      <p class="idea-body">${body}</p>
      <div class="idea-ranking">Swill</div>

    </article>`

      );
// ideaList.prepend(newIdea);
}

saveButton.on('click', function() {
  addNewIdeaBox();
});
