import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import renderer from "react-test-renderer";
import { getSongs } from "./api";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("App component", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("getSongs function", () => {
  it("returns the expected results", async () => {
    const songs = await getSongs();
    expect(songs).toEqual([
      {
        name: "The Beatles",
        artist: "John Lennon",
        album: "Abbey Road",
        year: 1969,
      },
      {
        name: "Michael Jackson",
        artist: "Michael Jackson",
        album: "Thriller",
        year: 1982,
      },
      {
        name: "Queen",
        artist: "Queen",
        album: "Bohemian Rhapsody",
        year: 1975,
      },
    ]);
  });
});
