$(document).ready(() => {
  console.log('ready');

  $('.deck').click(() => {
    console.log('here');
    let deck_id = $(event.target).attr('data-id')
    console.log('deck_id', deck_id);
    $.ajax({
      method: 'GET',
      url: '',
      data: { deck_id: deck_id },
      success: (data) => {
        location.href = `/decks/${deck_id}`
      }, error: () => {}
    })
  })
})
