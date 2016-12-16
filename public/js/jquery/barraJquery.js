;(() => {


  // Descativar la tecla ENTER
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  })

  /*

  Event Model

  */

  var compra = []
  var usuario = []
  var pulsera;
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
    $('.errorpinpulsera').hide()

    for(var i = 0; i < res.length ; i++)
    {
      // (0) Cantidad
      // (1) Nombre producto
      // (2) Valor producto
      // (3) Codigo producto
      var items = res[i].split("+"); // (0)+(1)+(2)+(3)
      if(items[0]!=0)
      {
        //compra.push(res[i]+'+'+rToken)

        var productosJSOn = new Object()
        productosJSOn.cantidad = items[0]
        productosJSOn.nombre = items[1]
        productosJSOn.valor = items[2]
        productosJSOn.codigo = items[3]
        productosJSOn.token = rToken
        compra.push(productosJSOn)

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
    $('#lectorpulsera').get(0).focus()
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
        pulsera = ''
      }
      else
        {
          $('.form-confirmar-compra-div').show()
          $('.form-nombre-usuario').append('<p>Nombre: '+dato.data.nombre+'</p>')
          $('.form-saldo-usuario').append('<p>Saldo: $'+dato.data.saldo+'</p>')
          $('#pinpulsera').get(0).focus()
          if( dato.data.saldo < suma)
          {
            $('.form-saldo-insuficiente').show()
            $('#boton-confirmar').prop('disabled',true)  
          }
          else
          {
            usuario = dato
            pulsera = numpulsera
            $('#boton-confirmar').prop('disabled',false)
          }
        }
    })  
  })

  //Resetear datos

  $('.botonReset').click(event =>{
      console.log('botonreset')
      location.href=location.href
    })


  $('#boton-confirmar').click(event =>{
    var pinp = $('#pinpulsera').val()
    //console.log('pinp= '+pinp)
    //console.log('usario.pin= '+usuario.data.pin)
    if(pinp == usuario.data.pin)
    {      
      compra.push(usuario.data.codc)
      compra.push(suma)
      compra.push(pulsera)
      
      $.ajax({
          url: "/Barra/agregarCompra",
          global: false, 
          type: "POST",
          dataType: "json",
          data: (JSON.stringify(compra)),
          contentType: "application/json", 
          cache: false,
          beforeSend: function() {         

              $('.modal-body').empty()
              $('.modal-body').html("<center><img src='/img/loading.gif' /></center>")
      
          },
          success: function(html) {
                          
              $('.modal-body').empty()
              $('.modal-body').html(`<center><img src='/img/tick_green.png' /><br>
                                     Pago Aceptado</center>`)

              setTimeout(function(){ 

              location.href=location.href

              },10000)                      
          },
          error: function(err){          
                        
              $('.modal-body').empty()
              $('.modal-body').append('<center>rechazado</center>')
            
          }
        })       
    }
    else
    {
      $('.errorpinpulsera').show()
    }
  })

  $('#borrarpin').click(e=>{
    $('#pinpulsera').val('')
    $('.errorpinpulsera').hide()
    $('#pinpulsera').get(0).focus()
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
