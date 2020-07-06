<?php
    require '../../model/Usuario.php';

    $mUsuario = new Usuario();
    $idusuario = htmlspecialchars($_POST['idusuario'], ENT_QUOTES, 'UTF-8');
    $sexo = htmlspecialchars($_POST['sexo'], ENT_QUOTES, 'UTF-8');
    $rol = htmlspecialchars($_POST['rol'], ENT_QUOTES, 'UTF-8');
    $consulta = $mUsuario->editarUsuario($idusuario,$sexo, $rol);
    
    echo $consulta;

   
?>