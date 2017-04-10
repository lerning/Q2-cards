$(document).ready(() => {

  $('.carousel').carousel()

  $('.deck').click(() => {
    let deck_id = $(event.target).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '',
      data: { deck_id: deck_id },
      success: (data) => {
        location.href = `/decks/${deck_id}`
      }, error: () => {}
    })
  })


$('.card').click(() => {
  if ($(event.target).hasClass('flipped')) {
    $(event.target).removeClass("flipped")
  } else {
    $(event.target).addClass("flipped");
  }
})

})
