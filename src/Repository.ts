/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { Entity, EntityId } from '@domaincrafters/domain/mod.ts';
import { Optional } from '@domaincrafters/std';

/**
 * Defines a generic repository interface for managing domain entities within Domain Driven Development.
 *
 * The `Repository` interface provides the standard operations for accessing and manipulating
 * domain entities. It abstracts the data storage mechanism, allowing for flexibility and
 * ease of testing.
 *
 * @typeParam E - The type of the entity managed by the repository.
 */
export interface Repository<E extends Entity> {
    /**
     * Retrieves an entity by its unique identifier.
     *
     * @param id - The unique identifier of the entity to retrieve.
     * @returns A promise that resolves to an Optional containing the entity if found, or empty if not found.
     */
    byId(id: EntityId): Promise<Optional<E>>;

    /**
     * Persists the given entity to the repository.
     *
     * @param entity - The entity to save.
     * @returns A promise that resolves when the entity has been successfully saved.
     */
    save(entity: E): Promise<void>;

    /**
     * Removes the given entity from the repository.
     *
     * @param entity - The entity to remove.
     * @returns A promise that resolves when the entity has been successfully removed.
     */
    remove(entity: E): Promise<void>;
}
