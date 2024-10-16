/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { EntityId } from '@domaincrafters/domain/mod.ts';
import { UUID } from '@domaincrafters/std';

/**
 * Represents a UUID-based Entity Identifier in the context of Domain Driven Development.
 *
 * This abstract class provides a foundation for creating entity identifiers using UUIDs.
 * It ensures that each entity has a unique and consistent identifier across the domain.
 *
 * @example Usage
 * ```typescript
 * // Example of extending UUIDEntityId for a specific domain entity
 * class UserId extends UUIDEntityId {}
 *
 * // Generating a new UUID for a UserId
 * const newUserId = UserId.generate();
 * const userId = new UserId(newUserId);
 *
 * // Comparing two UserIds for equality
 * const anotherUserId = new UserId(UserId.generate());
 * const isEqual = userId.equals(anotherUserId);
 * console.log(`Are User IDs equal? ${isEqual}`);
 *
 * // Getting the string representation of the UserId
 * console.log(`User ID: ${userId.toString()}`);
 *
 * // Accessing the UUID value directly
 * console.log(`UUID Value: ${userId.value}`);
 * ```
 */
export abstract class UUIDEntityId implements EntityId {
    private readonly _id: UUID;

    /**
     * Creates an instance of UUIDEntityId.
     *
     * @param id - The UUID string to initialize the entity ID.
     */
    protected constructor(id: string) {
        this._id = UUID.parse(id);
    }

    /**
     * Generates a new UUID string for the entity ID.
     *
     * @returns A newly generated UUID string.
     */
    static generate(): string {
        return UUID.create().value;
    }

    /**
     * Compares this entity ID with another to determine equality.
     *
     * @param other - The other EntityId to compare with.
     * @returns `true` if both EntityIds have the same value, otherwise `false`.
     */
    equals(other: EntityId): boolean {
        return this.value === other.value;
    }

    /**
     * Returns the string representation of the entity ID.
     *
     * @returns The UUID string value of the entity ID.
     */
    toString(): string {
        return this.value;
    }

    /**
     * Retrieves the UUID string value of the entity ID.
     *
     * @returns The UUID string value.
     */
    get value(): string {
        return this._id.value;
    }
}
