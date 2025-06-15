import assert from "assert";

import Character from "@/src/domain/entities/Character";

import { charactersMock } from "../../mocks/charactersMock";

describe("Character Entity", () => {
    it("should assign all properties correctly from the input object", () => {
        const character = new Character(charactersMock.results[0]);

        assert.strictEqual(character.id, charactersMock.results[0].id);
        assert.strictEqual(character.name, charactersMock.results[0].name);
        assert.strictEqual(character.status, charactersMock.results[0].status);
        assert.strictEqual(character.species, charactersMock.results[0].species);
        assert.strictEqual(character.type, charactersMock.results[0].type);
        assert.strictEqual(character.gender, charactersMock.results[0].gender);
        assert.deepStrictEqual(character.origin, charactersMock.results[0].origin);
        assert.deepStrictEqual(character.location, charactersMock.results[0].location);
        assert.strictEqual(character.image, charactersMock.results[0].image);
        assert.deepStrictEqual(character.episode, charactersMock.results[0].episode);
        assert.strictEqual(character.url, charactersMock.results[0].url);
        assert.strictEqual(character.created, charactersMock.results[0].created);
    });

    it("should allow missing optional fields (type, image, episode)", () => {
        const characterData = {
            id: 2,
            name: "Summer",
            status: "Alive",
            species: "Human",
            gender: "Female",
            origin: { name: "Earth", url: "" },
            location: { name: "Earth", url: "" },
            url: "",
            created: "",
        };
        const character = new Character(characterData as any);

        assert.strictEqual(character.type, undefined);
        assert.strictEqual(character.image, undefined);
        assert.strictEqual(character.episode, undefined);
    });
});
