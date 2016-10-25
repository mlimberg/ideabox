var ideaList = $('.idea-list');
var ideaTitle = $('.idea-title');
var ideaBody = $('.idea-body');
var saveButton = $('#save-button');
var titleField = $('#title-input');
var bodyField = $('#body-input');

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

function NewIdeaConstructor(titleText, bodyText) {
  this.titleText = titleField.val();
  this.bodyText = bodyField.val();
}

function clearInputFields() {
  return titleField.val("") && bodyField.val("");
}

function disableSaveButton() {
  saveButton.prop('disabled', true);
}

function addNewIdeaBox(titleText, bodyText) {
  var currentIdea = new NewIdeaConstructor();
  var title = currentIdea.titleText;
  var body = currentIdea.bodyText;
  ideaList.prepend(
    `<article class="idea-box">
      <div class="idea-box-title">
        <h2 class="idea-title" contentEditable="true">${title}</h2>
        <img src="images/delete.svg" class="delete-idea" />
      </div>
      <p class="idea-body" contentEditable="true">${body}</p>
      <div class="idea-box-footer">
        <img src="images/upvote.svg">
        <img src="images/downvote.svg">
        <div class="idea-ranking-quality">
          quality:
        </div>
        <div class="idea-ranking">
          Swill
        </div>
      </div>
    </article>`);
}

saveButton.on('click', function() {
  addNewIdeaBox();
  clearInputFields();
  disableSaveButton();
});
