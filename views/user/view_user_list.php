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
                    <button class="btn btn-danger" style="width:100%"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
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
<script>
    $(document).ready(function() {
        listar_usuario();
    });
</script>