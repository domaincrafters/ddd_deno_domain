/*
 * Unit Tests for Entity
 *
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { UUIDEntityId } from '@domaincrafters/domain/mod.ts';
import { assertEquals, assertNotEquals } from '@std/assert';
import { UUID } from '@domaincrafters/std';



// Define a concrete subclass for testing
export class UserId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);

    }

    static create(id?: string): UserId {
        return new UserId(id);
    }


}

export class ProductId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
    }

    static create(id?: string): ProductId {
        return new ProductId(id);
    }
}

Deno.test("UserId.create() should create a new UserId instance with a valid UUID", () => {
    // Arrange
    const userId = UserId.create();

    // Act
    const idValue = userId.value;
    
    // Assert
    assertNotEquals(idValue, null);
    assertNotEquals(idValue, undefined);
    assertEquals(UUID.parse(idValue).value, idValue);
});

Deno.test("UserId.create(id) should create a new UserId instance with the provided UUID", () => {
    // Arrange
    const uuid = UUID.create().value;
    const userId = UserId.create(uuid);

    // Act
    const idValue = userId.value;

    // Assert
    assertEquals(idValue, uuid);
});

Deno.test("UserId.equals() should return true for instances with the same UUID", () => {
    // Arrange
    const uuid = UUID.create().value;

    const userId1 = UserId.create(uuid);
    const userId2 = UserId.create(uuid);

    // Act
    const isEqual = userId1.equals(userId2);
    const isEqual2 = userId2.equals(userId1);

    // Assert
    assertEquals(isEqual, true);
    assertEquals(isEqual2, true);
});

Deno.test("UserId.equals() should return false for instances with different UUIDs", () => {
    // Arrange
    const userId1 = UserId.create();
    const userId2 = UserId.create();

    // Act
    const isEqual = userId1.equals(userId2);
    const isEqual2 = userId2.equals(userId1);

    // Assert
    assertEquals(isEqual, false);
    assertEquals(isEqual2, false);
});

Deno.test("UserId.equals() should return false for an ProductId instance", () => {
    // Arrange
    const userId = UserId.create();
    const productId = ProductId.create();

    // Act
    const isEqual = userId.equals(productId);
    const isEqual2 = productId.equals(userId);

    // Assert
    assertEquals(isEqual, false);
    assertEquals(isEqual2, false);
});

Deno.test("UserId.toString() should return the UUID as a string", () => {
    // Arrange
    const userId = UserId.create();

    // Act
    const idString = userId.toString();

    // Assert
    assertEquals(idString, userId.value);
});