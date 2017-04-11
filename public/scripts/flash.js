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

  $('body').keyup(function(e) {
    if (e.keyCode == 32) {
      console.log('still doing it!!!!');
      $('.click').toggleClass("flipped")
    }
  });

  //flip cards on click
  $('.card').click(() => {
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
    console.log(id);
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
  $('.btnUpdate').click(() => {
    console.log('update clicked');
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
})
