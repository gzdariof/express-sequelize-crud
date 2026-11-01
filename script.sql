CREATE DATABASE IF NOT EXISTS mi_base_datos;
USE mi_base_datos;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_ultimo_acceso DATETIME DEFAULT NULL,
    contrasena VARCHAR(255) NOT NULL,
    es_administrador TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);