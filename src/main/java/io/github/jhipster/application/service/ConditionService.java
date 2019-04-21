package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Condition;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Condition.
 */
public interface ConditionService {

    /**
     * Save a condition.
     *
     * @param condition the entity to save
     * @return the persisted entity
     */
    Condition save(Condition condition);

    /**
     * Get all the conditions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Condition> findAll(Pageable pageable);


    /**
     * Get the "id" condition.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Condition> findOne(Long id);

    /**
     * Delete the "id" condition.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
