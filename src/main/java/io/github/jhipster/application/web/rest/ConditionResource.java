package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Condition;
import io.github.jhipster.application.service.ConditionService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Condition.
 */
@RestController
@RequestMapping("/api")
public class ConditionResource {

    private final Logger log = LoggerFactory.getLogger(ConditionResource.class);

    private static final String ENTITY_NAME = "condition";

    private final ConditionService conditionService;

    public ConditionResource(ConditionService conditionService) {
        this.conditionService = conditionService;
    }

    /**
     * POST  /conditions : Create a new condition.
     *
     * @param condition the condition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new condition, or with status 400 (Bad Request) if the condition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/conditions")
    public ResponseEntity<Condition> createCondition(@RequestBody Condition condition) throws URISyntaxException {
        log.debug("REST request to save Condition : {}", condition);
        if (condition.getId() != null) {
            throw new BadRequestAlertException("A new condition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Condition result = conditionService.save(condition);
        return ResponseEntity.created(new URI("/api/conditions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /conditions : Updates an existing condition.
     *
     * @param condition the condition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated condition,
     * or with status 400 (Bad Request) if the condition is not valid,
     * or with status 500 (Internal Server Error) if the condition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/conditions")
    public ResponseEntity<Condition> updateCondition(@RequestBody Condition condition) throws URISyntaxException {
        log.debug("REST request to update Condition : {}", condition);
        if (condition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Condition result = conditionService.save(condition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, condition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /conditions : get all the conditions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of conditions in body
     */
    @GetMapping("/conditions")
    public ResponseEntity<List<Condition>> getAllConditions(Pageable pageable) {
        log.debug("REST request to get a page of Conditions");
        Page<Condition> page = conditionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/conditions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /conditions/:id : get the "id" condition.
     *
     * @param id the id of the condition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the condition, or with status 404 (Not Found)
     */
    @GetMapping("/conditions/{id}")
    public ResponseEntity<Condition> getCondition(@PathVariable Long id) {
        log.debug("REST request to get Condition : {}", id);
        Optional<Condition> condition = conditionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(condition);
    }

    /**
     * DELETE  /conditions/:id : delete the "id" condition.
     *
     * @param id the id of the condition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/conditions/{id}")
    public ResponseEntity<Void> deleteCondition(@PathVariable Long id) {
        log.debug("REST request to delete Condition : {}", id);
        conditionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
