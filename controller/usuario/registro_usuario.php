<?php
    require '../../model/Usuario.php';

    $mUsuario = new Usuario();
    $usuario = htmlspecialchars($_POST['usuario'], ENT_QUOTES, 'UTF-8');
    $contra = password_hash($_POST['contrasena'], PASSWORD_DEFAULT,['cost'=>10]);
    $sexo = htmlspecialchars($_POST['sexo'], ENT_QUOTES, 'UTF-8');
    $rol = htmlspecialchars($_POST['rol'], ENT_QUOTES, 'UTF-8');
    $consulta = $mUsuario->registrarUsuario($usuario, $contra,$sexo, $rol);
    
    echo $consulta;

   
?>