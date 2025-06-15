import assert from "assert";

import Episode from "@/src/domain/entities/Episode";

import { episodesMock1and2 } from "../../mocks/episodesMock";

describe('Episode Entity', () => {
    it('should assign all properties from the input object', () => {
        const episode = new Episode(episodesMock1and2[0]);

        assert.strictEqual(episode.id, episodesMock1and2[0].id);
        assert.strictEqual(episode.name, episodesMock1and2[0].name);
        assert.strictEqual(episode.air_date, episodesMock1and2[0].air_date);
        assert.strictEqual(episode.episode, episodesMock1and2[0].episode);
        assert.deepStrictEqual(episode.characters, episodesMock1and2[0].characters);
        assert.strictEqual(episode.url, episodesMock1and2[0].url);
        assert.strictEqual(episode.created, episodesMock1and2[0].created);
    });

    it('should allow missing optional properties', () => {
        const episodeFail = {
            id: 1,
            name: 'Pilot',
            air_date: '2013-12-02',
            episode: 'S01E01',
            characters: []
        };
        
        const episode = new Episode(episodeFail);

        assert.strictEqual(episode.id, episodeFail.id);
        assert.strictEqual(episode.name, episodeFail.name);
        assert.strictEqual(episode.air_date, episodeFail.air_date);
        assert.strictEqual(episode.episode, episodeFail.episode);
        assert.deepStrictEqual(episode.characters, episodeFail.characters);
        assert.strictEqual(episode.url, undefined);
        assert.strictEqual(episode.created, undefined);
    });
});

