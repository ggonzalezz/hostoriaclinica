<?php
    require '../../model/Usuario.php';

    $mUsuario = new Usuario();
    $usuario = htmlspecialchars($_POST['usuario'], ENT_QUOTES, 'UTF-8');
    $consulta = $mUsuario->traerDatosUsuario($usuario);
    echo json_encode($consulta);
?>