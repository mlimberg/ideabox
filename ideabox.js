
var ideaQuality = ['swill', 'plausible', 'genius']

getAndDisplayIdeas();
setEventListeners();

function getAndDisplayIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    var idea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    prependIdeas(idea);
  }
}

function setEventListeners() {
  $('#save-button').on('click', () => {
    postSaveAndDisplayIdea();
  });
  $('.idea-list').on('click', '.delete-idea', function() {
    let idea = this.closest('article');
    let ideaId = this.closest('article').id;
    removeFromList(idea);
    removeFromStorage(ideaId);
  });
}

function removeFromList(input) {
  input.remove();
}

function removeFromStorage(input) {
  localStorage.removeItem(input)
}

function postSaveAndDisplayIdea() {
  postAndStoreIdea();
  clearInputFields();
  disableSaveButton();
  refreshIdeaListFromStorage();
}

function NewIdeaConstructor(titleText, bodyText, quality, uniqueid){
  this.titleText = titleText;
  this.bodyText = bodyText;
  this.quality =  quality || ideaQuality[0];
  this.uniqueid = uniqueid || Date.now();
}

function postAndStoreIdea() {
  let titleField = $('#title-input');
  let bodyField = $('#body-input');
  let currentIdea = new NewIdeaConstructor(titleField.val(), bodyField.val());
  prependIdeas(currentIdea);
  storeNewObject(currentIdea);
}

function prependIdeas(currentIdea) {
  $('.idea-list').prepend(
    `<article id=${currentIdea.uniqueid} class="idea-box">
      <div class="search-field">
        <div class="idea-box-header">
          <h2 class="idea-title" contentEditable="true">${currentIdea.titleText}</h2>
          <p class="delete-idea"></p>
        </div>
        <p class="idea-body" contentEditable="true">${currentIdea.bodyText}</p>
      </div>
      <div class="idea-box-footer">
        <p class="upvote"></p>
        <p class="downvote"></p>
        <div class="idea-ranking-quality">quality:</div>
        <div class="idea-ranking">${currentIdea.quality}</div>
      </div>
    </article>`
  );
}

var clearInputFields = () => {
  let titleField = $('#title-input');
  let bodyField = $('#body-input');
  return titleField.val("") && bodyField.val("") && $('#search-input').val("");
}

var disableSaveButton = () => {
  $('#save-button').prop('disabled', true);
}

var storeNewObject = currentIdea => {
  localStorage.setItem(currentIdea.uniqueid, JSON.stringify(currentIdea));
}



$('.idea-list').on('click', '.upvote', function(){
  var qualityStatus = $(this).closest('.idea-box').find('.idea-ranking');
  var quality;
  var ideaID = this.closest('article').id;
  if (qualityStatus.text() == ideaQuality[0]){
    quality = ideaQuality[1];
  } else if (qualityStatus.text() === ideaQuality[1]){
    quality = ideaQuality[2];
  }else if (qualityStatus.text() === ideaQuality[2]){
    return false;
  }
  storeUpdate(ideaID, 'quality', quality);
  refreshIdeaListFromStorage();
});

$('.idea-list').on('click', '.downvote', function(event){
  var qualityStatus = $(this).closest('.idea-box').find('.idea-ranking');
  var quality;
  var ideaID = this.closest('article').id;
  if (qualityStatus.text() == ideaQuality[2]){
    quality = ideaQuality[1];
  } else if (qualityStatus.text() === ideaQuality[1]){
    quality = ideaQuality[0];
  } else if (qualityStatus.text() === ideaQuality[0]){
    return false;
  }
  storeUpdate(ideaID, 'quality', quality);
  refreshIdeaListFromStorage();
});

$('.idea-list').on('blur', '.idea-title', function(){
  var title = $(this).text();
  var ideaID = this.closest('article').id;
  storeUpdate(ideaID, 'title', title);
  refreshIdeaListFromStorage();
});

$('.idea-list').on('blur', '.idea-body', function(){
  var body = $(this).text();
  var ideaID = this.closest('article').id;
  storeUpdate(ideaID, 'body', body);
  refreshIdeaListFromStorage();
});

$('.idea-list').on('keypress', '.idea-title', function(e){
  var title = $(this).text();
  var ideaID = this.closest('article').id;
  if(e.which === 13) {
    storeUpdate(ideaID, 'title', title);
    refreshIdeaListFromStorage();
}
});

$('.idea-list').on('keypress', '.idea-body', function(e){
  var body = $(this).text();
  var ideaID = this.closest('article').id;
  if(e.which === 13) {
    storeUpdate(ideaID, 'body', body);
    refreshIdeaListFromStorage();
}
});

var storeUpdate = (id, attribute, newValue) => {
  for (let i = 0; i < localStorage.length; i++) {
    let idea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (id == idea.uniqueid) {
      if (attribute === 'quality') {
        idea.quality = newValue;
      } else if (attribute === 'title') {
        idea.titleText = newValue;
      } else if (attribute === 'body') {
        idea.bodyText = newValue;
      }
      localStorage.setItem(parseInt(id), JSON.stringify(idea));
    }
  }
}

var refreshIdeaListFromStorage = () => {
  $('.idea-box').remove();
  for (let i = 0; i < localStorage.length; i++) {
    let idea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    prependIdeas(idea);
  }
}

$('#title-input, #body-input').on('input', function(){
  if($('#title-input').val() && $('#body-input').val()){
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
});

$('#title-input, #body-input').keypress(function(event) {
  let titleField = $('#title-input');
  let bodyField = $('#body-input');
  if(event.which === 13) {
    event.preventDefault();
  }
   if (event.which === 13 && titleField.val() && bodyField.val()) {
     postAndStoreIdea();
     clearInputFields();
     disableSaveButton();
   }
 });

 $("#search-input").keyup(function(){
   var filter = $(this).val();
   $(".search-field").each(function() {
     if ($(this).text().search(new RegExp(filter, "i")) < 0) {
       $(this).parent().addClass('hidden');
     } else {
       $(this).parent().removeClass('hidden');
     }
   });
 });
