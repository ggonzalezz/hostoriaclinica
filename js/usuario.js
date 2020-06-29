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

function listar_usuario() {
    var table = $("#tabla_usuario").DataTable({
        "ordering": false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controller/usuario/usuario_listar.php",
            type: 'POST'
        },
        "columns": [
            { "data": "posicion" },
            { "data": "nombreusu" },
            { "data": "nombrerol" },
            {
                "data": "sexousu",
                render: function (data, type, row) {
                    if (data == 'M') {
                        return "MASCULINO";
                    } else {
                        return "FEMINO";
                    }
                }
            },
            {
                "data": "estadousu",
                render: function (data, type, row) {
                    if (data == 'ACTIVO') {
                        return "<span class='label label-success'>" + data + "</span>";
                    } else {
                        return "<span class='label label-danger'>" + data + "</span>";
                    }
                }
            },
            { "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>" }
        ],

        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_usuario_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function () {
        filterColumn($(this).parents('tr').attr('data-column'));
    });

}
function filterGlobal() {
    $('#tabla_usuario').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}