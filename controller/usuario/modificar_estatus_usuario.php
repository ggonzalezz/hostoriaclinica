<?php
    require '../../model/Usuario.php';

    $mUsuario = new Usuario();
    $idusuario = htmlspecialchars($_POST['idusuario'], ENT_QUOTES, 'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'], ENT_QUOTES, 'UTF-8');
    $consulta = $mUsuario->modificarEstadoUsuario($idusuario, $estatus);
    
    echo $consulta;

   
?>