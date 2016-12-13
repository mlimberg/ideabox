const ideaQuality = ['swill', 'plausible', 'genius']

aaaa

displayIdeasFromStorage();
setEventListeners();

function displayIdeasFromStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var idea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    prependIdeas(idea);
  }
}

postSaveAndDisplayIdea = () => {
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

clearInputFields = () => {
  let titleField = $('#title-input');
  let bodyField = $('#body-input');
  return titleField.val("") && bodyField.val("") && $('#search-input').val("");
}

disableSaveButton = () => {
  $('#save-button').prop('disabled', true);
}

storeNewObject = currentIdea => {
  localStorage.setItem(currentIdea.uniqueid, JSON.stringify(currentIdea));
}

removeIdea = (idea, ideaId) => {
  idea.remove();
  localStorage.removeItem(ideaId);
}

function changeQualityUp(input, ideaId) {
  if (input === ideaQuality[0]){
    input = ideaQuality[1];
  } else if (input === ideaQuality[1]){
    input = ideaQuality[2];
  }else if (input === ideaQuality[2]){
    input = input;
  }
  return input
}

function changeQualityDown(input, ideaId) {
  if(input === ideaQuality[2]){
    input = ideaQuality[1];
  } else if (input === ideaQuality[1]){
    input = ideaQuality[0];
  } else if (input === ideaQuality[0]){
    input = input;
  }
  return input;
}

storeUpdate = (id, attribute, newValue) => {
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
  refreshIdeaListFromStorage();
}

refreshIdeaListFromStorage = () => {
  $('.idea-box').remove();
  for (let i = 0; i < localStorage.length; i++) {
    let idea = JSON.parse(localStorage.getItem(localStorage.key(i)));
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
    removeIdea(idea, ideaId);
  });

  $('.idea-list').on('click', '.upvote', function(){
    let qualityStatus = $(this).closest('.idea-box').find('.idea-ranking').text();
    let ideaId = this.closest('article').id;
    qualityStatus = changeQualityUp(qualityStatus, ideaId)
    storeUpdate(ideaId, 'quality', qualityStatus);
  });

  $('.idea-list').on('click', '.downvote', function(){
    let qualityStatus = $(this).closest('.idea-box').find('.idea-ranking').text();
    let ideaId = this.closest('article').id;
    qualityStatus = changeQualityDown(qualityStatus, ideaId)
    storeUpdate(ideaId, 'quality', qualityStatus)
  });

  $('.idea-list').on('blur', '.idea-title', function(){
    let title = $(this).text();
    let ideaID = this.closest('article').id;
    storeUpdate(ideaID, 'title', title);
  });

  $('.idea-list').on('blur', '.idea-body', function(){
    let body = $(this).text();
    let ideaID = this.closest('article').id;
    storeUpdate(ideaID, 'body', body);
  });

  $('.idea-list').on('keypress', '.idea-title', function(e){
    let title = $(this).text();
    let ideaID = this.closest('article').id;
    if(e.which === 13) {
      storeUpdate(ideaID, 'title', title);
    }
  });

  $('.idea-list').on('keypress', '.idea-body', function(e){
    let body = $(this).text();
    let ideaID = this.closest('article').id;
    if(e.which === 13) {
      storeUpdate(ideaID, 'body', body);
    }
  });

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
      postSaveAndDisplayIdea();
    }
  });

  $("#search-input").keyup(function(){
    let filter = $(this).val();
    $(".search-field").each(function() {
      if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).parent().addClass('hidden');
      } else {
        $(this).parent().removeClass('hidden');
      }
    });
  });
}
