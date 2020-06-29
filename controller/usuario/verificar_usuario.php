<?php
    require '../../model/Usuario.php';

    $mUsuario = new Usuario();
    $usuario = htmlspecialchars($_POST['user'], ENT_QUOTES, 'UTF-8');
    $contra = htmlspecialchars($_POST['pass'], ENT_QUOTES, 'UTF-8');
    $consulta = $mUsuario->VerificarUsuario($usuario, $contra);
    $data = json_encode($consulta);
    if(count($consulta)> 0)
    {
        echo $data;
    }else{
        echo 0;
    }
    



?>