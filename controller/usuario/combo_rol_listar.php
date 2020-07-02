<?php

require '../../model/Usuario.php';

$mUsuario = new Usuario();
$consulta = $mUsuario->listar_combo_rol();

echo json_encode($consulta);

?>