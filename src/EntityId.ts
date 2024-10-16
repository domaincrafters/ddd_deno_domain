/*
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * Represents a unique identifier for an entity within the context of Domain Driven Development.
 *
 * The `EntityId` interface defines the contract for entity identifiers, ensuring that each
 * entity can be uniquely identified, compared, and represented as a string.
 */
export interface EntityId {
    /**
     * Determines whether this EntityId is equal to another EntityId.
     *
     * @param other - The other EntityId to compare with.
     * @returns `true` if both EntityIds have the same value, otherwise `false`.
     */
    equals(other: EntityId): boolean;

    /**
     * Returns the string representation of the EntityId.
     *
     * @returns The UUID string value of the EntityId.
     */
    toString(): string;

    /**
     * Retrieves the underlying string value of the EntityId.
     *
     * @returns The UUID string value.
     */
    get value(): string;
}
