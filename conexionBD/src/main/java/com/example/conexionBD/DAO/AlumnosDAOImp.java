package com.example.conexionBD.DAO;

import com.example.conexionBD.Modelo.Alumnos;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public class AlumnosDAOImp implements AlumnosDAO {

    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Alumnos> listar() {
        String query = "FROM Alumnos";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(int id) {
        Alumnos asignatura = entityManager.find(Alumnos.class,id);
        entityManager.remove(asignatura);
    }

    @Override
    public void add(Alumnos asignatura) {
        entityManager.merge(asignatura);
    }
}
