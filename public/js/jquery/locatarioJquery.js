;(() => {
    'use strict'
    var socket = io()
    socket.on('compraAceptada', function(e){
        $('.alerta').show()
    })
    
    llenarTablaProductos()
    llenarTablaStock()
    llenarTablaProveedores()
    llenarTablaVentas()

    
    hideAll()    
    function hideAll(){
            $('#verproductos').hide()
            $('#verstock').hide()
            $('#verproveedores').hide()
            $('#verventa').hide()
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
    $('.clickverproveedor').click(event=>{
        hideAll()
        llenarTablaProveedores()
        $('#verproveedor').show()
    })
    $('.clickverventas').click(event=>{
        hideAll()
        llenarTablaVentas()
        $('#verventa').show()
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

    // Función de llenado de tablas con Stock

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
                                            <th>Editar</th>                                 
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
                                                    <td><a class='icon-pencil' href='/locatario/#`+html.productos[i].codp+`'></a></td>
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

    //Función con llenado de tablas de proveedores

    function llenarTablaProveedores()
    {
        $.ajax({
        url: "/Locatario/obtenerProveedores",
        global: false, 
        type: "GET",
        dataType: "json",
        contentType: "application/json", 
        cache: false,
        beforeSend: function() {               
        },
        success: function(html) {
            console.log(html)                          
            $('.tablaproveedor').empty()
            $('.tablaproveedor').append(`
                                            <tr>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Teléfonp</th>
                                            <th>Editar</th>                                                                        
                                            </tr>
                                        `)
            for(var i=0;i<html.proveedores.length;i++)
            {
                $('.tablaproveedor').append(`
                                                <tr>
                                                    <td>`+html.proveedores[i].nombre+`</td>
                                                    <td>`+html.proveedores[i].descripcion+`</td>
                                                    <td>`+html.proveedores[i].telefono+`</td>
                                                    <td><a class='icon-pencil' href='/locatario/#`+html.proveedores[i].codp+`'></a></td>
                                                <tr>
                                            `)                   
            }             
        },
        error: function(err){ 
            $('.tablaproveedor').empty()
            $('.tablaproveedor').append('<center>Error en base de datos</center>')            
        }
        })  
    }
    function llenarTablaVentas()
    {
        llenarMasVendido()
    }

    $('#selectmonth,#selectyear').on('change',e=>{
        llenarMasVendido()          
    })

    function llenarMasVendido()
    {
            var year = $('#selectyear').val()
            var month = $('#selectmonth').val()
            
            if(year == undefined || year == null)
                return

            $.ajax({
            url: "/Locatario/obtenerTodoVentas/"+month+"/"+year,
            global: false, 
            type: "GET",
            dataType: "json",
            contentType: "application/json", 
            cache: false,
            beforeSend: function() {               
            },
            success: function(html) {
                console.log(html)

                $('.emptyAll').empty()

                var ventatotalmes = (html.data[0].suma? +html.data[0].suma : 'No hay registro')
                var clientestotales = (html.data[1].sum? html.data[1].sum : 'No hay registro')


                //
                //
                $('.ventatotalmes').append(accounting.formatMoney(ventatotalmes,'$ ',0))
                //
                //
                $('.clientestotales').append(clientestotales)
                //
                //
                $('.clientestotalespordia').append(parseFloat(clientestotales/30).toFixed(2))
                //
                //
                if(html.data[2].length > 0)
                {
                    $('.tablaventa03').empty()
                    $('.tablaventa03').append(`
                                                <tr>
                                                <th>Más vendido</th>
                                                <th>Cantidad</th>                                                                                                                       
                                                </tr>
                                            `)
                    for(var a = 0 ; a < html.data[2].length ; a++)
                    {
                        $('.tablaventa03').append('<tr><td>'+html.data[2][a].producto+'</td><td>'+html.data[2][a].cantidad+'</td></tr>')
                    }
                }
                else
                {
                    $('.tablaventa03').empty()
                    $('.tablaventa03').append(`
                                                <tr>
                                                <th>Más vendido</th>
                                                <th>Cantidad</th>                                                                                                                       
                                                </tr>
                                                <tr><td>Sin registros</td><td>Sin registros</td></tr>
                                            `)
                }
                //
                //
                //
                if(html.data[3].length > 0)
                {
                    $('.tablaventa04').empty()
                    $('.tablaventa04').append(`
                                                <tr>
                                                    <th colspan=3>Ventas por día</th>                                                                                                                                                                       
                                                </tr>
                                                <tr>
                                                    <th>Día</th>
                                                    <th>Cantidad</th>
                                                    <th>Monto</th>
                                                </tr>
                                            `)
                    for(var a = 0 ; a < html.data[3].length ; a++)
                    {
                        $('.tablaventa04').append(`<tr>
                                                        <td>`+html.data[3][a].fecha+`</td>
                                                        <td>`+html.data[3][a].cantidad+`</td>
                                                        <td>`+accounting.formatMoney(html.data[3][a].total,'$ ',0)+`</td>
                                                    </tr>`)
                        }
                }
                else
                {
                    $('.tablaventa04').empty()
                    $('.tablaventa04').append(`
                                                <tr>
                                                <th colspan=3>Ventas por día</th>                                                                                                                                                                       
                                                </tr>
                                                <tr>
                                                    <th>Día</th>
                                                    <th>Cantidad</th>
                                                    <th>Monto</th>
                                                </tr>
                                                <tr>
                                                    <td>Sin registros</td>
                                                    <td>Sin registros</td>
                                                    <td>Sin registros</td>
                                                </tr>
                                            `)
                }
                 
            },
            error: function(err){ 
                $('.ventatotalmes').empty()
                $('.ventatotalmes').append('<center>Error en base de datos</center>')            
            }
            })        
    }
    

})()