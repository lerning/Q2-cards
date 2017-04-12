$(document).ready(() => {

  $('.carousel').carousel()

  $('.deck').click(() => {
    console.log('deck clicked');
    let deck_id = $(event.target).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '',
      data: {
        deck_id: deck_id
      },
      success: (data) => {
        location.href = `/decks/${deck_id}`
      },
      error: () => {}
    })
  })

  $('.sampleDeck').click(() => {
    console.log('deck clicked');
    let deck_id = $(event.target).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '',
      data: {
        deck_id: deck_id
      },
      success: (data) => {
        location.href = `/decks/sample/${deck_id}`
      },
      error: () => {}
    })
  })

  $('body').keyup(function(e) {
    if (e.keyCode == 32) {
      $('.click').toggleClass("flipped")
    }
  });

  //flip cards on click
  $('.card').click((event) => {
    if ($(event.target).hasClass("flipped")) {
      console.log($(event.target));
      $(event.target).removeClass("flipped")
    } else {
      $(event.target).addClass("flipped");
    }
  })

  //delete functionality on individual decks
  $('.btnDestroy').click(() => {
    let id = $(event.target).attr('data-id');
    $.ajax({
      method: 'DELETE',
      url: '/decks',
      data: {
        id: id
      },
      success: (data) => {
        if (data) {
          location.reload();
        }
      },
      error: () => {}
    })
  })

  //update individual deck info
  $('.btnUpdate').click((event) => {
    let deck_id = $(event.target).attr('data-id');
    $.ajax({
      method: 'PUT',
      url: '/decks',
      data: {
        deck_id: deck_id
      },
      success: (data) => {
        if (data) {
          location.href = `/update/${deck_id}`
        }
      },
      error: () => {}
    })
  })
// add more rows to update/create
  $('.addMore').click(() => {
    $('.addMoreRows').append(`<div class="row">
          <div class="input-field col-md-6 col-sm-6">
             <label for="Front">Front</label>
             <textarea class="form-control" rows="1" name="front" data-id="3" placeholder="front"></textarea>
          </div>
          <div class="input-field col-md-6 col-sm-6">
             <label for="Back">Back</label>
             <textarea class="form-control" rows="1" name="back" data-id="3" placeholder="back"></textarea>
          </div>
          <button type="button" name="button" class="delInput">X</button>
        </div>`)
  })

// delete rows from update/create
  $('.addMoreRows').on('click', '.delInput', () => {
    $(event.target).parent().remove()
  })


})
