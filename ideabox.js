
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
var inputFields = $('');
var ideaTitle = $('.idea-title');
var ideaBody = $('.idea-body');
var saveButton = $('#save-button');

function addNewIdeaBox(titleText, bodyText) {
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
}

);
