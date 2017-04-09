$(document).ready(() => {
  console.log('ready');

  $('.deck').click(() => {
    console.log('here');
    let deck_id = $(event.target).attr('id')
    console.log(deck_id);
    $.ajax({
      method: 'GET',
      url: '/decks/:id',
      data: { deck_id: deck_id}
    })
  })
})
