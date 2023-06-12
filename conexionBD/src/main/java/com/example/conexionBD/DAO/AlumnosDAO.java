package com.example.conexionBD.DAO;

import com.example.conexionBD.Modelo.Alumnos;

import java.util.List;

public interface AlumnosDAO {
    List<Alumnos> listar();
    void delete(int id);

    void add(Alumnos asignatura);

}
