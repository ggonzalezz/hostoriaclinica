function verificarUsuario() {
    var usu = $("#txt_usu").val();
    var con = $("#txt_pass").val();

    if (usu.length == 0 || con.length == 0) {
        return Swal.fire("Mensaje de Advertencia", "Llene los campos que faltan", "warning");
    }
    $.ajax({
        url: '../controller/usuario/verificar_usuario.php',
        type: 'POST',
        data: {
            user: usu,
            pass: con
        }
    }).done(function (resp) {
        if (resp == 0) {
            Swal.fire("Mensaje de Error", "Usuario y/o Contraseña incorrecta", "error");
        } else {
            var data = JSON.parse(resp);
            if (data[0][5] == 'INACTIVO') {
                Swal.fire("Mensaje de Advertencia", "El usuario " + usu + " esta suspendido por favor comuniquese con el administrador", "warning");
            } else {
                $.ajax({
                    url: '../controller/usuario/crear_session.php',
                    type: 'POST',
                    data: {
                        idusuario: data[0][0],
                        nombreusu: data[0][1],
                        nombrerol: data[0][6]
                    }
                }).done(function (resp) {
                    let timerInterval
                    Swal.fire({
                        title: 'SISTEMA CLINICO',
                        html: 'Espere uno segundos minestras carga <b></b> CREATIVEDOCTOR.',
                        timer: 2000,
                        timerProgressBar: true,
                        onBeforeOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                                const content = Swal.getContent()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                        b.textContent = Swal.getTimerLeft()
                                    }
                                }
                            }, 100)
                        },
                        onClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            location.reload();
                        }
                    })

                })
            }

        }
    })
}