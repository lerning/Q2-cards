$(document).ready(() => {
  console.log('ready');

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

  $('.card').click(() => {
    if ($(event.target).hasClass('flipped')) {
      $(event.target).removeClass("flipped")
    } else {
      $(event.target).addClass("flipped");
    }
  })

  //delete functionality on individual decks
  $('.btnDestroy').click(() => {
    console.log('destory clicked');
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
