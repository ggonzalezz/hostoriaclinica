<?php
    class Usuario{
        private $conexion;
        function __construct()
        {
            require_once 'conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
            
        }
        //funcion para verificar usuario
        function VerificarUsuario($usuario, $contra){
            $sql = "call SP_VERIFICAR_USUARIO('$usuario')";
            $arreglo = array();
            if($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    if(password_verify($contra, $consulta_VU["constrasenausu"])){
                        $arreglo[] = $consulta_VU;
                    }
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }
        //funcion para listar usuario
        function listar_usuario(){
            $sql = "call sp_listar_usuario()";
            $arreglo = array();
            if($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_VU = mysqli_fetch_assoc($consulta)){
                   $arreglo["data"][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }
        //listar combo rol
        
        function listar_combo_rol(){
            $sql = "call sp_listar_combo_rol()";
            $arreglo = array();
            if($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_VU = mysqli_fetch_array($consulta)){
                   $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }
        ///insertar usuario
        function registrarUsuario($usuario, $contra,$sexo, $rol){
            $sql = "call sp_registrar_usuario('$usuario','$contra','$sexo','$rol')";
            if($consulta = $this->conexion->conexion->query($sql)){
                if($row = mysqli_fetch_array($consulta)){
                    return $id= trim($row[0]);
                }
               
                $this->conexion->cerrar();
            }
        }
        ///Actualizar estado del usuario
        function modificarEstadoUsuario($idusuario, $estatus){
            $sql = "call sp_modificar_estadus_usuario('$idusuario','$estatus')";
            if($consulta = $this->conexion->conexion->query($sql)){
                return 1;
            }else{
                return 0;
            }
        }
        // actualizar datos del usuario
        
        function editarUsuario($idusuario,$sexo, $rol){
            $sql = "call sp_modificar_datos_usuario('$idusuario','$sexo','$rol')";
            if($consulta = $this->conexion->conexion->query($sql)){
                return 1;
            }else{
                return 0;
            }
        }
        function traerDatosUsuario($usuario){
            $sql = "call SP_VERIFICAR_USUARIO('$usuario')";
            $arreglo = array();
            if($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }
    }

?>