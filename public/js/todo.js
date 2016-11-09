;(() => {


  var compra = []
  // Model Start
  $('#fixedButton').click(event =>{
    event.preventDefault()
    compra = []
    var res = returnDropdownList().split(",")
    var suma = 0
    var rToken = randomToken()

    // Eliminar contenido de contenedores
    $('.span4.drink-names').empty()
    $('.span4.drink-values').empty()
    $('.span4.drink-quantity').empty()
    $('.span4.drink-result').empty()

    for(var i = 0; i < res.length ; i++)
    {
      // (0) Cantidad
      // (1) Nombre producto
      // (2) Valor producto
      // (3) Codigo producto
      var items = res[i].split("+"); // (0)+(1)+(2)+(3)
      if(items[0]!=0)
      {
        compra.push(res[i]+'+'+rToken)
        var s = items[0] * items[2] // Cantidad x valor
        $('.span4.drink-names').append('<p>'+items[1]+'</p>  ')
        $('.span4.drink-quantity').append('<p>'+items[0]+'<p>')
        $('.span4.drink-values').append('<p>'+s+'<p>')
        suma+=s
      }
    }
    console.log(compra)
    $('.span4.drink-result').append('<p>$'+suma+'<p>')
    $('#myModal').removeClass('hide')
    $('#myModal').modal('show')

    return false
  })



  $('.scroll-down').click(event =>{
    //window.scrollTo(0,document.body.scrollHeight);
    $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
    return false
  })


})()

function randomToken(){
  return Math.random().toString(36).substring(7)
}

function returnDropdownList(){
  var values = new Array();
  var items;
  $.each($("select[name='dropdown']"), function() {
      values.push($(this).val())
  })
  return items = values.join(',')
}
