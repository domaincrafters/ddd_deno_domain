/*
 * Unit Tests for Entity
 *
 * Copyright (c) 2024 Matthias Blomme and Dimitri Casier
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Entity, UUIDEntityId } from '@domaincrafters/domain/mod.ts';
import { assertEquals, assertThrows } from '@std/assert';

  
  // Define a concrete subclass for testing
  class User extends Entity {
    private readonly _name: string;
  
    constructor(id: UserId, name: string) {
      super(id);
      this._name = name;
      this.validateState();
    }
  
    get name(): string {
      return this._name;
    }
  
    protected validateState(): void {
      if (!this._name || this._name.trim().length === 0) {
        throw new Error("User name cannot be empty.");
      }
    }
  }

  class UserId extends UUIDEntityId {
    private constructor(uuid: string) {
      super(uuid);
    }
  
    static create(uuid: string = UUIDEntityId.generate()): UserId {
      return new UserId(uuid);
    }
  }
  
  // Test Suite for Entity
  Deno.test("Entity Constructor initializes correctly", () => {
    // Arrange
    const userId = UserId.create();
    const userName = "Alice";
  
    // Act
    const user = new User(userId, userName);
  
    // Assert
    assertEquals(user.id, userId);
    assertEquals(user.name, userName);
  });
  
  Deno.test("Entity.id getter returns the correct EntityId", () => {
    // Arrange
    const userId = UserId.create();
    const userName = "Bob";
  
    // Act
    const user = new User(userId, userName);
    const retrievedId = user.id;
  
    // Assert
    assertEquals(retrievedId, userId);
  });
  
  Deno.test("Entity.equals() returns true for entities with the same ID", () => {
    // Arrange
    const userId = UserId.create();
    const user1 = new User(userId, "Charlie");
    const user2 = new User(userId, "Charlie");
  
    // Act
    const isEqual = user1.equals(user2);
  
    // Assert
    assertEquals(isEqual, true);
  });
  
  Deno.test("Entity.equals() returns false for entities with different IDs", () => {
    // Arrange
    const userId1 = UserId.create();
    const userId2 = UserId.create();
    const user1 = new User(userId1, "Dave");
    const user2 = new User(userId2, "Eve");
  
    // Act
    const isEqual = user1.equals(user2);
  
    // Assert
    assertEquals(isEqual, false);
  });
  
  Deno.test("Entity.equals() returns false when comparing with null", () => {
    // Arrange
    const userId = UserId.create();
    const user = new User(userId, "Frank");
  
    // Act
    // @ts-ignore: Intentional comparison with null for testing
    const isEqual = user.equals(null);
  
    // Assert
    assertEquals(isEqual, false);
  });
  
  Deno.test("Entity.equals() returns false when comparing with undefined", () => {
    // Arrange
    const userId = UserId.create();
    const user = new User(userId, "Grace");
  
    // Act
    // @ts-ignore: Intentional comparison with undefined for testing
    const isEqual = user.equals(undefined);
  
    // Assert
    assertEquals(isEqual, false);
  });
  
  Deno.test("Entity constructor succeeds with valid state", () => {
    // Arrange
    const userId = UserId.create();
    const userName = "Heidi";
  
    // Act
    const user = new User(userId, userName);
  
    // Assert
    assertEquals(user.id.value, userId.value);
    assertEquals(user.name, userName);
  });
  
  Deno.test("Entity constructor throws an error with invalid state (empty name)", () => {
    // Arrange
    const userId = UserId.create();
    const invalidName = "   "; // Invalid name (only whitespace)
  
    // Act & Assert
    assertThrows(
      () => {
        const user: User = new User(userId, invalidName);
        console.log(user.id);
      },
      Error,
      "User name cannot be empty.",
    );
  });
  
  Deno.test("Entity constructor throws an error with invalid state (null name)", () => {
    // Arrange
    const userId = UserId.create();
    const invalidName: any = null; // Invalid name (null)
  
    // Act & Assert
    assertThrows(
      () => {
        const user: User = new User(userId, invalidName);
        console.log(user.id);
      },
      Error,
      "User name cannot be empty.",
    );
  });
  