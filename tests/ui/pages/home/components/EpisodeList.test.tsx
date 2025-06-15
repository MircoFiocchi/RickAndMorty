import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { episodesMock1and2 } from "../../../../mocks/episodesMock";
import Episode from "@/src/domain/entities/Episode";
import EpisodeList from "@/src/ui/pages/home/components/EpisodeList";

jest.mock("@/src/ui/components/item/Item", () => (props: any) => (
  <div data-testid="item-mock">
    <span>{props.episode}</span>
    <span>{props.name}</span>
    <span>{props.airDate}</span>
  </div>
));

const mockEpisodes: Episode[] = episodesMock1and2;

describe("EpisodeList", () => {
  it("renders the title", () => {
    render(
      <EpisodeList
        title="Episodes"
        subtitle="No episodes"
        episodes={mockEpisodes}
      />
    );
    expect(screen.getByText("Episodes")).toBeInTheDocument();
  });

  it("renders all episodes using Item component", () => {
    render(
      <EpisodeList
        title="Episodes"
        subtitle="No episodes"
        episodes={mockEpisodes}
      />
    );
    expect(screen.getAllByTestId("item-mock")).toHaveLength(2);
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("S01E02")).toBeInTheDocument();
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
    expect(screen.getByText("December 9, 2013")).toBeInTheDocument();
  });

  it("renders subtitle when episodes is empty", () => {
    render(
      <EpisodeList
        title="Episodes"
        subtitle="No episodes found"
        episodes={[]}
      />
    );
    expect(screen.getByText("No episodes found")).toBeInTheDocument();
  });
});