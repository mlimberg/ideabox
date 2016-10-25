var ideaList = $('.idea-list');
var ideaTitle = $('.idea-title');
var ideaBody = $('.idea-body');
var saveButton = $('#save-button');
var titleField = $('#title-input');
var bodyField = $('#body-input');
var ideaFields = $('#title-input, #body-input');
var storageArray = [];

window.onload = retrieveIdeas();

function retrieveIdeas() {
  storageArray = JSON.parse(localStorage.getItem('storageArray'));
  for (var i = 0; i < storageArray.length; i++) {
    var title = storageArray[i].titleText;
    var body = storageArray[i].bodyText;
    var quality = storageArray[i].quality;
    var uniqueid = storageArray[i].uniqueid;
    var idea = new NewIdeaConstructor(title, body, quality, uniqueid);
    prependIdeas(idea);
    console.log(storageArray[i].titleText);
  }

  // storageArray.forEach(function(idea){
  //   var newIdea = new NewIdeaConstructor(idea.titleText, idea.bodyText, idea.quality, idea.uniqueid)
  //   prependIdeas(newIdea);
  // });
}

saveButton.on('click', function() {
  addNewIdeaBox();
  clearInputFields();
  disableSaveButton();
  createArray();
  stringifyArray();
});


$(ideaFields).on('input', function(){
  if($('#title-input').val() && $('#body-input').val()){
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
});

ideaFields.keypress(function(event){
  if (event.which == 13) {
    $('#save-button').click();
  }
});

function NewIdeaConstructor(titleText, bodyText, quality, uniqueid ){
  this.titleText = titleText;
  this.bodyText = bodyText;
  this.quality =  quality || "swill";
  this.uniqueid = uniqueid || new Date();
}

function clearInputFields() {
  return titleField.val("") && bodyField.val("");
}

function disableSaveButton() {
  saveButton.prop('disabled', true);
}
var currentIdea;

function addNewIdeaBox(titleText, bodyText) {
  currentIdea = new NewIdeaConstructor(titleField.val(), bodyField.val());
  prependIdeas(currentIdea.titleText, currentIdea.bodyText, currentIdea.quality);
}

function prependIdeas(currentIdea) {
  ideaList.prepend(
    `<article id=${currentIdea.uniqueid} class="idea-box">
      <div class="idea-box-header">
        <h2 class="idea-title" contentEditable="true">${currentIdea.titleText}</h2>
        <p class="delete-idea"></p>
      </div>
      <p class="idea-body" contentEditable="true">${currentIdea.bodyText}</p>
      <div class="idea-box-footer">
        <p class="upvote-img"></p>
        <p class="downvote-img"></p>
        <div class="idea-ranking-quality">quality:</div>
        <div class="idea-ranking">${currentIdea.quality}</div>
      </div>
    </article>`);
}
    // $('.delete-idea').on('click', function(){
    //   $(this).parent().parent().remove();
    // });

    // $('upvote-img').on('click', function(){
    //   $(this).parent().parent().
    // })
    //
    // $('downvote-img').on('click', function(){
    //   $(this).parent().parent().
    // })


function createArray(){
  storageArray.push(currentIdea);
  // console.log(storageArray);
}

function stringifyArray(){
  localStorage.setItem("storageArray", JSON.stringify(storageArray));
}

$('.idea-list').on('click', '.delete-idea', function(){
  $(this).parent().parent().remove();
});
