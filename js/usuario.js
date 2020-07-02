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
var table;
function listar_usuario() {
    table = $("#tabla_usuario").DataTable({
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
                        return "<span class='badge badge-primary'>MASCULINO</span>";
                    } else {
                        return "<span class='badge badge-warning'>FEMENINO</span>";;
                    }
                }
            },
            {
                "data": "estadousu",
                render: function (data, type, row) {
                    if (data == 'ACTIVO') {
                        return "<span class='badge badge-success'>" + data + "</span>";
                    } else {
                        return "<span class='badge badge-danger'>" + data + "</span>";
                    }
                }
            },
            { "defaultContent": "<button style='font-size:13px;' type='button' class='desactivar btn btn-primary'><i class='fa fa-trash'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success'><i class='fa fa-check'></i></button>" }
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
//manejo del estatus para desactivar
// se utiliza la clase desactivar 
$('#tabla_usuario').on('click', '.desactivar', function () {
    var data = table.row($(this).parents('tr')).data();
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }


    Swal.fire({
        title: 'Desea desactivar el usuario?',
        text: "Al desactivarlo le restringe el acceso al sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Desctivar!'
    }).then((result) => {
        if (result.value) {
            actualizar_estado(data.idusuario, 'INACTIVO')
        }
    })
})
//manejo del estatus para activarlo
// se utiliza la clase activarlo 
$('#tabla_usuario').on('click', '.activar', function () {
    var data = table.row($(this).parents('tr')).data();
    if (table.row(this).child.isShown()) {
        var data = table.row(this).data();
    }


    Swal.fire({
        title: 'Desea Activar el usuario?',
        text: "Al activarlo le otorga acceso al sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Activar!'
    }).then((result) => {
        if (result.value) {
            actualizar_estado(data.idusuario, 'ACTIVO')
        }
    })
})
//actualizar estado del usuario
function actualizar_estado(idusuario, estatus) {
    var mensaje = "";
    if(estatus == 'INACTIVO'){
        mensaje = "desactivado";
    }else{
        mensaje = "activo";
    }
    $.ajax({
        "url": "../controller/usuario/modificar_estatus_usuario.php",
        type: 'POST',
        data: {
            idusuario: idusuario,
            estatus: estatus
        }
    }).done(function (resp) {
        alert(resp);
        if (resp > 0) {
            Swal.fire("Mensaje de Confirmacion", "Usuario "+mensaje+" con exito", 
            "success")
            .then((value) => {
                table.ajax.reload();
            });
        }
    })
}



function filterGlobal() {
    $('#tabla_usuario').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function abrirModalRegistro() {
    $("#modal_registro").modal({ backdrop: 'static', keyboard: false })
    $("#modal_registro").modal('show');
}

//listar el rol en el select2
function listar_combo_rol() {
    $.ajax({
        "url": "../controller/usuario/combo_rol_listar.php",
        type: 'POST'
    }).done(function (resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_rol").html(cadena);
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
        }
    })
}

function registrar_usuario() {
    var usu = $("#txt_usu").val();
    var contra = $("#txt_con1").val();
    var contra2 = $("#txt_con2").val();
    var sexo = $("#cbm_sexo").val();
    var rol = $("#cbm_rol").val();
    if (usu.length == 0 || contra.length == 0 || contra2.length == 0 || sexo.length == 0 || rol.length == 0) {
        return Swal.fire("Mensaje de Advertencia", "Llene los campos que faltan", "warning");
    }
    if (contra != contra2) {
        return Swal.fire("Mensaje de Advertencia", "Las Constraseñas no Coinciden", "warning");
    }
    $.ajax({
        "url": "../controller/usuario/registro_usuario.php",
        type: 'POST',
        data: {
            usuario: usu,
            contrasena: contra,
            sexo: sexo,
            rol: rol
        }
    }).done(function (resp) {
        alert(resp);
        if (resp > 0) {
            if (resp == 1) {
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje de Confirmacion", "Datos Correctos, Nuevo Usuario Ingresado", "success").then((value) => {
                    limpiarRegistros();
                    table.ajax.reload();
                });
            } else {
                Swal.fire("Mensaje de Error", "Lo sentimos el nombre del usuario ya esta en la base de datos", "error");
            }
        } else {
            Swal.fire("Mensaje de Error", "Lo sentimos no se pudo completar el registro", "error");
        }
    })
}

function limpiarRegistros() {
    $("#txt_usu").val("");
    $("#txt_con1").val("");
    $("#txt_con2").val("");
}