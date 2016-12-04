;(() => {
    'use strict'
    var socket = io()
    socket.on('compraAceptada', function(e){
        $('.alerta').show()
    })
    

    
    hideAll()    
    function hideAll(){
            $('#verproductos').hide()
            $('#verstock').hide()
            $('#verproveedores').hide()
            $('#verventas').hide()
            $('.alerta').hide() 
        }
    
    //Cambiar color menu
    $('.li a').on('click',e=>{
            //e.preventDefault()
        })
    $('#menu li a').click(function(e) {
            $('#menu li').removeClass('active');
            var $parent = $(this).parent();
            if (!$parent.hasClass('active')) {
                $parent.addClass('active');
            }     
            //e.preventDefault();
        });

        
        // Actualizar ventanas
        $('.clickverproductos').click(event=>{
            hideAll()
            llenarTablaProductos()
            $('#verproductos').show()
        })
        $('.clickverstock').click(event=>{
            hideAll()
            llenarTablaStock()
            $('#verstock').show()
        })


        function llenarTablaProductos()
        {
            $.ajax({
            url: "/Locatario/obtenerTodo",
            global: false, 
            type: "GET",
            dataType: "json",
            contentType: "application/json", 
            cache: false,
            beforeSend: function() {               
            },
            success: function(html) {                          
                $('.tablaproductos').empty()
                console.log(html)
                $('.tablaproductos').append(`
                                                <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Categoria</th>
                                                <th>Valor</th>
                                                <th>Descripción</th>
                                                <th>Proveedor</th>
                                                <th>Teléfono</th>
                                                <th>Editar</th>
                                                </tr>
                                            `)
                for(var i=0;i<html.productos.length;i++)
                {
                    var  nombre = html.productos[i].nombreproducto
                    $('.tablaproductos').append(`
                                                    <tr>
                                                        <td><img src=/img/drinks/`+nombre+`.png width=100</td>
                                                        <td>`+nombre+`</td>
                                                        <td>`+html.productos[i].categoria+`</td>
                                                        <td>$`+html.productos[i].valor+`</td>
                                                        <td>`+html.productos[i].descripcion+`</td>
                                                        <td>`+html.productos[i].nombreproveedor+`</td>
                                                        <td>`+html.productos[i].telefono+`</td>
                                                        <td><a class='icon-pencil' href='/locatario/#`+html.productos[i].codp+`'></a></td>
                                                    <tr>
                                                `)                   
                }             
            },
            error: function(err){ 
                $('.tablaproductos').empty()
                $('.tablaproductos').append('<center>Error en base de datos</center>')            
            }
            })  
        }

        function llenarTablaStock()
        {
            $.ajax({
            url: "/Locatario/obtenerTodo",
            global: false, 
            type: "GET",
            dataType: "json",
            contentType: "application/json", 
            cache: false,
            beforeSend: function() {               
            },
            success: function(html) {                          
                $('.tablastock').empty()
                $('.tablastock').append(`
                                                <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Valor</th>
                                                <th>Stock</th>
                                                <th>Nivel</th>                                
                                                </tr>
                                            `)
                for(var i=0;i<html.productos.length;i++)
                {
                    var  nombre = html.productos[i].nombreproducto
                    var stock = html.productos[i].stock
                    var td;

                    if(stock < 100)
                        td = "<td class=danger></td>"
                    else if(stock > 100 && stock < 150)
                        td = "<td class=warning></td>"
                    else
                        td = "<td class=success></td>"
                    $('.tablastock').append(`
                                                    <tr>
                                                        <td><img src=/img/drinks/`+nombre+`.png width=100</td>
                                                        <td>`+nombre+`</td>
                                                        <td>`+html.productos[i].valor+`</td>
                                                        <td>`+html.productos[i].stock+`</td>
                                                        `+td+`
                                                    <tr>
                                                `)                   
                }             
            },
            error: function(err){ 
                $('.tablastock').empty()
                $('.tablastock').append('<center>Error en base de datos</center>')            
            }
            })  
        }

})()