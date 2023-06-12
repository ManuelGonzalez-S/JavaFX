package com.example.conexionBD.DAO;

import com.example.conexionBD.Modelo.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public class UsuarioDAOImp implements UsuarioDAO{

    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Usuario> listar() {
        String query = "FROM Usuario";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(int id) {
        Usuario usuario = entityManager.find(Usuario.class,id);
        entityManager.remove(usuario);
    }

    @Override
    public void add(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario find(String nombre) {
        Usuario user = new Usuario();
        for(int i=0;i<listar().size();i++){
            if(listar().get(i).getNombre().equals(nombre)){
                user = listar().get(i);
            }
        }
        return user;
    }
}
