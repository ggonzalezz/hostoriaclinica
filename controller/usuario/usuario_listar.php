<?php
    require '../../model/Usuario.php';

    $mUsuario = new Usuario();
    $consulta = $mUsuario->listar_usuario();
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
    }



?>