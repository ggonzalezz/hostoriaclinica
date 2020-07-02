<script src="../js/usuario.js?rev=<?php echo time(); ?>"></script>
<div class="col-md-12">
    <div class="card card-success shadow-sm">
        <div class="card-header">
            <h3 class="card-title">
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Bienvenido al Contenido del Usuario</font>
                </font>
            </h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                </button>
            </div>
            <!-- /.card-tools -->
        </div>
        <!-- /.card-header -->
        <div class="card-body">
            <div class="form-group">
                <div class="col-lg-12">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <br>
                <div class="col-lg-2 float-right">
                    <button class="btn btn-danger" style="width:100%" onclick="abrirModalRegistro()"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
                </div>
            </div>
            <table id="tabla_usuario" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Sexo</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>No</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Sexo</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <!-- /.card-body -->
    </div>
</div>
<!-- Inicio del Modal -->
<form autocomplete="false" onsubmit="return false">
    <div class="modal fade" id="modal_registro" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title"><b>Registro de Usuario</b></h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="col-lg-12">
                        <label for="">Usuario</label>
                        <input type="text" class="form-control" id="txt_usu" placeholder="Ingrese Usuario">
                        <br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Contraseña</label>
                        <input type="password" class="form-control" id="txt_con1" placeholder="Ingrese Contraseña">
                        <br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Repita Contraseña</label>
                        <input type="password" class="form-control" id="txt_con2" placeholder="Repita contraseña">
                        <br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Sexo</label>
                        <select class="js-example-basic-single" name="state" id="cbm_sexo" style="height: 100%;width: 100%; ">
                            <option value="M">MASCULINO</option>
                            <option value="F">FEMENINO</option>
                        </select>
                        <br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Rol</label>
                        <select class="js-example-basic-single" name="state" id="cbm_rol" style="height: 100%;width: 100%; ">

                        </select>
                        <br>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick=" registrar_usuario()">Registrar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</form>
<!-- Fin del Modal -->
<script>
    $(document).ready(function() {
       
        //llamado de funcion para listar usuario
        listar_usuario();
        //llamando funcion para listar rol
        listar_combo_rol();
        //inicializar el select
        $('.js-example-basic-single').select2();
        //foco al primer campo del modal
        $("#modal_registro").on('shown.bs.modal', function() {
            $("#txt_usu").focus();
        })

    });
</script>