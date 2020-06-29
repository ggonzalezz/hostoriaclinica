<?php
    $IDUSUARIO = $_POST['idusuario'];
    $NOMBREUSU = $_POST['nombreusu'];
    $NOMBREROL = $_POST['nombrerol'];

    session_start();

    $_SESSION['S_IDUSUARIO']=$IDUSUARIO;
    $_SESSION['S_NOMBREUSU']=$NOMBREUSU;
    $_SESSION['S_NOMBREROL']=$NOMBREROL;
    

?>