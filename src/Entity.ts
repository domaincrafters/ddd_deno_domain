/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { EntityId } from '@domaincrafters/domain/mod.ts';

/**
 * Represents a generic Entity within the context of Domain Driven Development.
 *
 * An Entity is an object that is defined primarily by its identity rather than its attributes.
 * This abstract class provides the foundational structure for all domain entities, ensuring
 * that each entity has a unique identifier and can be compared based on this identity.
 *
 * @example Usage
 * ```typescript
 * import { UUIDEntityId } from './UUIDEntityId.ts';
 * import { Entity } from './Entity.ts';
 *
 * // Example of extending Entity for a specific domain entity
 * class User extends Entity {
 *     private name: string;
 *
 *     constructor(id: EntityId, name: string) {
 *         super(id);
 *         this.name = name;
 *         this.validateState();
 *     }
 *
 *     protected validateState(): void {
 *         if (!this.name) {
 *             throw new Error("User name cannot be empty.");
 *         }
 *     }
 * }
 *
 * // Creating a new User entity
 * const userId = new UUIDEntityId(UUIDEntityId.generate());
 * const user = new User(userId, "Alice");
 *
 * // Accessing the User's ID
 * console.log(`User ID: ${user.id.toString()}`);
 *
 * // Comparing two User entities
 * const anotherUserId = new UUIDEntityId(UUIDEntityId.generate());
 * const anotherUser = new User(anotherUserId, "Bob");
 * console.log(`Are users equal? ${user.equals(anotherUser)}`); // Outputs: false
 * ```
 */
export abstract class Entity {
    protected readonly _id: EntityId;

    /**
     * Creates an instance of Entity.
     *
     * @param id - The unique identifier for the entity.
     */
    constructor(id: EntityId) {
        this._id = id;
    }

    /**
     * Retrieves the unique identifier of the entity.
     *
     * @returns The EntityId of the entity.
     */
    get id(): EntityId {
        return this._id;
    }

    /**
     * Determines whether this entity is equal to another entity based on their identifiers.
     *
     * @param other - The other Entity to compare with.
     * @returns `true` if both entities have the same identifier, otherwise `false`.
     */
    equals(other: Entity): boolean {
        if (!other) {
            return false;
        }

        return this._id.equals(other._id);
    }

    /**
     * Validates the current state of the entity.
     *
     * This method must be implemented by concrete subclasses to enforce
     * business rules and invariants specific to the entity.
     *
     * @throws Will throw an error if the entity's state is invalid.
     */
    protected abstract validateState(): void;
}
