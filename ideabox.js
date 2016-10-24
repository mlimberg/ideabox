var ideaList = $('.idea-list');


function addNewIdeaBox(titleText, bodyText) {
  var newIdea = $(
    `<article class="idea-box">
      <h1 class="ideaTitle"> ' + titleText + '</h1>
      <img class="delete-idea" />
      <p class="idea-body"> ' + bodyText + '</p>
      <div class="ideaQuality">Swillobv</div>
    `
  );
ideaList.prepend(newIdea);
}
