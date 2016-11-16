;(() => {

  /*

  Event Model

  */

  var compra = []
  /*
    compra[] contiene 5 elementos por celda.
    (0) Cantidad de producto seleccionado
    (1) Nombre del producto
    (2) Valor del producto
    (3) Llave primaria del producto
    (4) Token de compra.

  */
  // Model Start

  var suma = 0

  $('#fixedButton').click(event =>{
    event.preventDefault()
    compra = []
    var res = returnDropdownList().split(",")
    suma = 0
    var rToken = randomToken()

    // Eliminar contenido de contenedores
    $('.span4.drink-names.data').empty()
    $('.span4.drink-values.data').empty()
    $('.span4.drink-quantity.data').empty()
    $('.span4.drink-value.data').empty()
    $('.span4.drink-result').empty()

    $('.form-confirmar-compra-div').hide()
    $('.pulsera-no-encontrada').hide()
    $('.form-saldo-insuficiente').hide()

    $('.carro-vacio').hide()
    $('.carro-con-productos').hide()

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
        $('.span4.drink-names.data').append('<p>'+items[1]+'</p>')
        $('.span4.drink-quantity.data').append('<p>'+items[0]+'<p>')
        $('.span4.drink-value.data').append('<p>'+items[2]+'<p>')
        $('.span4.drink-values.data').append('<p>$'+s+'<p>')
        suma+=s
      }
    }

    if(compra.length == 0)
      $('.carro-vacio').show()
    
    else if(compra.length != 0)
      $('.carro-con-productos').show()
    
    console.log(compra)
    $('.span4.drink-result').append('<p>$'+suma+'<p>')
    $('#myModal').removeClass('hide')
    $('#myModal').modal('show')

    return false
  })

   /*

   Event Scroll Down

   */

  $('.scroll-down').click(event =>{
    //window.scrollTo(0,document.body.scrollHeight);
    $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
    return false
  })

  /*

  Event On Change Text Numero Pulsera

  */

  $('#lectorpulsera').on('input',function() {
    var numpulsera = $('#lectorpulsera').val()

    if(numpulsera.length != 10) return

    
    $('.form-nombre-usuario').empty()
    $('.form-saldo-usuario').empty()

    $('#lectorpulsera').attr('value','')

    $.get('/Barra/getUser/'+numpulsera,function(dato){
      
      if(dato.data.nombre === undefined)
      {
        $('.pulsera-no-encontrada').show()
        $('.form-confirmar-compra-div').hide()
      }
      else
        {
          $('.form-confirmar-compra-div').show()
          $('.form-nombre-usuario').append('<p>Nombre: '+dato.data.nombre+'</p>')
          $('.form-saldo-usuario').append('<p>Saldo: $'+dato.data.saldo+'</p>')
          if( dato.data.saldo < suma)
          {
            $('.form-saldo-insuficiente').show()
            $('#boton-confirmar').attr('disable',true)  
          }
        }


      /*
      if(data.data.nombre === undefined)
        $('.result-data-user').append('<p>'+data.data+'</p>')
      else
      {

        $('.result-data-user').append("<form id='form-confirmar-compra' href='/Barra/confirmarcompra' method='post'>")
        $('.result-data-user').append('<p>Nombre: '+data.data.nombre+'</p>')
        $('.result-data-user').append('<p>Saldo: $'+data.data.saldo+'</p>')
        $('.result-data-user').append("<input type='password' maxlength='4' id='pinpulsera'><br>")
        $('.result-data-user').append("<input type='submit' class='btn btn-success' value='Confirmar'>&nbsp;")
        $('.result-data-user').append("<input type='reset' class='btn btn-danger botonReset' value='Borrar Datos'>")
        $('.result-data-user').append('</form>')
      }
      */
    })  
  })

  $('.botonReset').click(event =>{
      console.log('botonreset')
      location.href=location.href
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
