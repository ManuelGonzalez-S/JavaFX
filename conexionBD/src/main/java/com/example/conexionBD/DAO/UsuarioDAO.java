package com.example.conexionBD.DAO;

import com.example.conexionBD.Modelo.Usuario;

import java.util.List;

public interface UsuarioDAO {
    List<Usuario> listar();
    void delete(int id);
    void add(Usuario asignatura);
    Usuario find(String nombre);

}
