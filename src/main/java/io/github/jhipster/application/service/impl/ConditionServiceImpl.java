package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ConditionService;
import io.github.jhipster.application.domain.Condition;
import io.github.jhipster.application.repository.ConditionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Condition.
 */
@Service
@Transactional
public class ConditionServiceImpl implements ConditionService {

    private final Logger log = LoggerFactory.getLogger(ConditionServiceImpl.class);

    private final ConditionRepository conditionRepository;

    public ConditionServiceImpl(ConditionRepository conditionRepository) {
        this.conditionRepository = conditionRepository;
    }

    /**
     * Save a condition.
     *
     * @param condition the entity to save
     * @return the persisted entity
     */
    @Override
    public Condition save(Condition condition) {
        log.debug("Request to save Condition : {}", condition);
        return conditionRepository.save(condition);
    }

    /**
     * Get all the conditions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Condition> findAll(Pageable pageable) {
        log.debug("Request to get all Conditions");
        return conditionRepository.findAll(pageable);
    }


    /**
     * Get one condition by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Condition> findOne(Long id) {
        log.debug("Request to get Condition : {}", id);
        return conditionRepository.findById(id);
    }

    /**
     * Delete the condition by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Condition : {}", id);
        conditionRepository.deleteById(id);
    }
}
