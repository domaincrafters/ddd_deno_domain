/*
 * Unit Tests for Entity
 *
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { UUIDEntityId } from '@domaincrafters/domain/mod.ts';
import { assertEquals, assertNotEquals, assertThrows } from '@std/assert';

// Define a concrete subclass for testing
export class UserId extends UUIDEntityId {
    private constructor(uuid: string) {
        super(uuid);
    }

    static create(uuid: string = UUIDEntityId.generate()): UserId {
        return new UserId(uuid);
    }
}

// Mock UUID class if necessary
// Uncomment the following if you need to mock UUID for testing purposes
/*
class MockUUID {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    static create(): MockUUID {
        return new MockUUID("7771af57-7ccd-47cc-9641-1f64a5839488");
    }

    static parse(id: string): MockUUID {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id)) {
            throw new Error("Invalid UUID format");
        }
        return new MockUUID(id);
    }
}

// Replace the real UUID with the mock
const OriginalUUID = UUID;
UUID = MockUUID as any;
*/

// Test Suite for UUIDEntityId
Deno.test("UUIDEntityId Constructor initializes correctly", () => {
    // Arrange
    const uuidString: string = "7771af57-7ccd-47cc-9641-1f64a5839488";

    // Act
    const userId = UserId.create(uuidString);

    // Assert
    assertEquals(userId.value, uuidString);
});

Deno.test("UUIDEntityId.generate() returns a valid UUID string", () => {
    // Arrange & Act
    const generatedUuid = UserId.generate();

    // Assert
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assert(uuidRegex.test(generatedUuid), "Generated UUID does not match the UUID format");
});

Deno.test("UUIDEntityId.equals() returns true for equal UUIDs", () => {
    // Arrange
    const uuidString = "7771af57-7ccd-47cc-9641-1f64a5839488";
    const userId1 = UserId.create(uuidString);
    const userId2 = UserId.create(uuidString);

    // Act
    const isEqual = userId1.equals(userId2);

    // Assert
    assertEquals(isEqual, true);
});

Deno.test("UUIDEntityId.equals() returns false for different UUIDs", () => {
    // Arrange
    const userId1 = UserId.create("7771af57-7ccd-47cc-9641-1f64a5839488");
    const userId2 = UserId.create("cb2d0fbb-97a6-4f32-adc7-4d4c7892d303");

    // Act
    const isEqual = userId1.equals(userId2);

    // Assert
    assertEquals(isEqual, false);
});

Deno.test("UUIDEntityId.toString() returns the UUID string", () => {
    // Arrange
    const uuidString = "7771af57-7ccd-47cc-9641-1f64a5839488";
    const userId: UserId = UserId.create(uuidString);

    // Act
    // NOSONAR: userId will take the toString() method from the UUIDEntityId class
    const stringValue = userId.toString();

    // Assert
    assertEquals(stringValue, uuidString);
});

Deno.test("UUIDEntityId.value getter returns the UUID string", () => {
    // Arrange
    const uuidString = "7771af57-7ccd-47cc-9641-1f64a5839488";
    const userId = UserId.create(uuidString);

    // Act
    const value = userId.value;

    // Assert
    assertEquals(value, uuidString);
});

Deno.test("UUIDEntityId constructor throws an error for invalid UUID", () => {
    // Arrange
    const invalidUuid = "invalid-uuid-string";

    // Act & Assert
    assertThrows(() => {
        UserId.create(invalidUuid);
    }, Error, "Invalid UUID");
});

Deno.test("UUIDEntityId.generate() produces unique UUIDs", () => {
    // Arrange & Act
    const generatedUuid1 = UserId.generate();
    const generatedUuid2 = UserId.generate();

    // Assert
    assertNotEquals(generatedUuid1, generatedUuid2, "Generated UUIDs should be unique");
});

// Helper function for assertions without messages
function assert(condition: boolean, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg || "Assertion failed");
    }
}
