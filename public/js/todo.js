;(() => {
  $('#fixedButton').click(event =>{
    event.preventDefault()

    $('#myModal').removeClass('hide')
    $('#myModal').modal('show')

    return false
  })
})()
