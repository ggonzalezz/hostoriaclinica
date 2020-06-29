<?php

class conexion {
    private $servidor;
    private $usuario;
    private $constrasena;
    private $db;
    public $conexion;

    public function __construct()
    {
       $this->servidor = "localhost";
       $this->usuario ="root";
       $this->constrasena ="";
       $this->db = "db_clinica"; 
    }
    function conectar(){
        $this->conexion = new mysqli($this->servidor, $this->usuario, $this->constrasena, $this->db);
        $this->conexion->set_charset("utf8"); 
    }

    function cerrar(){
        $this->conexion->close();
    }
}


?>