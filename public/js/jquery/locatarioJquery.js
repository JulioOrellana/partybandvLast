;(() => {

    hideAll()

    function hideAll(){
        $('#verproductos').hide()
        $('#verstock').hide()
        $('#verproveedores').hide()
        $('#verventas').hide()
    }


   //Cambiar color menu
   $('.li a').on('click',e=>{
        e.preventDefault()
    })
   $('#menu li a').click(function(e) {
        $('#menu li').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });

    
    // Actualizar ventanas
    $('.clickverproductos').click(event=>{
        hideAll()
        $('#verproductos').show()
    })
    $('.clickverstock').click(event=>{
        hideAll()
        $('#verstock').show()
    })
    

})()