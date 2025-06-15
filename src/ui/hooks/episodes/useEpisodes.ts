import { useEffect, useReducer } from "react";
import { State } from "./types";
import { reducer } from "./reducer";
import { fetchEpisodes } from "./helpers/fetchEpisodes";

interface UseEpisodesProps {
  characterOneEpisodesIds: string[] | [];
  characterTwoEpisodesIds: string[] | [];
}

const initialState: State = {
  characterOneEpisodes: [],
  characterTwoEpisodes: [],
  sharedEpisodes: [],
};

export function useEpisodes({
  characterOneEpisodesIds,
  characterTwoEpisodesIds,
}: UseEpisodesProps) {
  const [stateEpisodes, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCharacterOneEpisodes = async () => {
      if (characterOneEpisodesIds.length > 0) {
        const episodes = await fetchEpisodes(characterOneEpisodesIds);
        dispatch({
          type: "SET_CHARACTER_ONE_EPISODES",
          characterOneEpisodes: episodes,
        });
      }
    };
    fetchCharacterOneEpisodes();
  }, [characterOneEpisodesIds]);

  useEffect(() => {
    const fetchCharacterTwoEpisodes = async () => {
      if (characterTwoEpisodesIds.length > 0) {
        const episodes = await fetchEpisodes(characterTwoEpisodesIds);
        dispatch({
          type: "SET_CHARACTER_TWO_EPISODES",
          characterTwoEpisodes: episodes,
        });
      }
    };
    fetchCharacterTwoEpisodes();
  }, [characterTwoEpisodesIds]);

  useEffect(() => {
    if (characterOneEpisodesIds.length > 0 && characterTwoEpisodesIds.length > 0) {
      const fetchSharedEpisodes = async () => {
        const allIds = Array.from(
          new Set([...characterOneEpisodesIds, ...characterTwoEpisodesIds])
        );
        if (allIds.length > 0) {
          const episodes = await fetchEpisodes(allIds);
          dispatch({
            type: "SET_SHARED_EPISODES",
            sharedEpisodes: episodes,
          });
        }
      };
      fetchSharedEpisodes();
    }
  }, [characterOneEpisodesIds, characterTwoEpisodesIds]);

  return {
    stateEpisodes,
    dispatch,
  };
}