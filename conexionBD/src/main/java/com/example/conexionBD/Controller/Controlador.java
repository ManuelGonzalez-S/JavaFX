package com.example.conexionBD.Controller;

import com.example.conexionBD.DAO.AlumnosDAO;
import com.example.conexionBD.DAO.UsuarioDAO;
import com.example.conexionBD.Modelo.Alumnos;
import com.example.conexionBD.Modelo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controlador {
    @Autowired
    AlumnosDAO alumnosDAO;

    @Autowired
    UsuarioDAO usuarioDao;


    @GetMapping("/listarAlumnos")
    public List<Alumnos> listarAlumnos(){
        return alumnosDAO.listar();
    }

    @DeleteMapping("/eliminarAlumnos/{id}")
    public void deleteAlumnos(@PathVariable int id){
        alumnosDAO.delete(id);
    }

    @PostMapping("/añadirAlumnos")
    public void addAlumnos(@RequestBody Alumnos alumnos){
        alumnosDAO.add(alumnos);
    }

    @GetMapping("/listarUsuarios")
    public List<Usuario> listarUsuarios(){
        return usuarioDao.listar();
    }

    @DeleteMapping("/eliminarUsuarios/{id}")
    public void deleteUsuarios(@PathVariable int id){
        usuarioDao.delete(id);
    }

    @PostMapping("/añadirUsuarios")
    public void addUsuarios(@RequestBody Usuario usuario){
        usuarioDao.add(usuario);
    }

    @GetMapping("/findUsuarios/{nombre}")
    public Usuario findAlumno(@PathVariable String nombre) {
        int permisos = 2;
        Usuario prueba = usuarioDao.find(nombre);
        Usuario user = new Usuario();
        user.setId(0);
        if(prueba.getNombre()!=null){
            user = prueba;
        }
        return user;


    }

}
