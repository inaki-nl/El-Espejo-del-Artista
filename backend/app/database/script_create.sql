CREATE DATABASE IF NOT EXISTS backend_espejo_artista;
USE backend_espejo_artista;

DROP TABLE IF EXISTS Usuario;
CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_pila varchar(100) NOT NULL,
    apellido_paterno varchar(100) NOT NULL,
    apellido_materno varchar(100),
    correo varchar(120) NOT NULL UNIQUE,
    contrasena_hash varchar(255) NOT NULL,
    fecha_registro DATETIME NOT NULL
);

DROP TABLE IF EXISTS Obra;
CREATE TABLE Obra(
    id_obra INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    titulo_obra varchar(120) NOT NULL,
    ruta_archivo_imagen varchar(255) NOT NULL,
    fecha_subida DATETIME NOT NULL,

    Foreign Key (id_usuario) References Usuario(id_usuario)
);

DROP TABLE IF EXISTS Analisis;
CREATE TABLE Analisis(
    id_analisis INT PRIMARY KEY AUTO_INCREMENT,
    id_obra INT NOT NULL,
    id_usuario INT NOT NULL,
    paleta_color JSON,
    contraste DECIMAL(5, 2),
    iluminacion DECIMAL(5, 2),
    balance_compositivo DECIMAL(5, 2),
    estado varchar(20) NOT NULL,
    fecha_analisis DATETIME NOT NULL,

    Foreign Key (id_obra) References Obra(id_obra),
    Foreign Key (id_usuario) References Usuario(id_usuario)
);

DROP TABLE IF EXISTS Critica;
CREATE TABLE Critica(
    id_critica INT PRIMARY KEY AUTO_INCREMENT,
    id_analisis INT NOT NULL,
    texto_critica TEXT NOT NULL,
    fecha_generacion DATETIME NOT NULL,

    Foreign Key (id_analisis) References Analisis(id_analisis)
);

DROP TABLE IF EXISTS Ejercicio;
CREATE TABLE Ejercicio(
    id_ejercicio INT PRIMARY KEY AUTO_INCREMENT,
    id_critica INT NOT NULL,
    descripcion TEXT NOT NULL,
    estado varchar(20) NOT NULL,
    fecha_asignacion DATETIME NOT NULL,
    fecha_entrega DATETIME,

    Foreign Key (id_critica) References Critica(id_critica)
);

DROP TABLE IF EXISTS Progreso;
CREATE TABLE Progreso(
    id_progreso INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_obra_actual INT NOT NULL,
    id_obra_anterior INT NOT NULL,
    metrica_comparada ENUM(
        'contraste',
        'iluminacion',
        'balance_compositivo'
    ) NOT NULL,
    variacion DECIMAL(6, 2) NOT NULL,

    Foreign Key (id_usuario) References Usuario(id_usuario),
    Foreign Key (id_obra_actual) References Obra(id_obra),
    Foreign Key (id_obra_anterior) References Obra(id_obra)
);
