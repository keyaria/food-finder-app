//@vitest-environment jsdom
import {
  initialize,
  Map,
  Marker,
  mockInstances,
} from "google-maps-vitest-mocks";
import { beforeEach, test, expect } from "vitest";

beforeEach(() => {
  initialize();
});

test("Testin Google Maps Library", () => {
  const map = new Map(null);
  const markerOne = new Marker();
  const markerTwo = new Marker();

  map.setHeading(8);
  markerOne.setMap(map);
  markerTwo.setLabel("My marker");

  const mapMocks = mockInstances.get(Map);
  const markerMocks = mockInstances.get(Marker);

  expect(mapMocks).toHaveLength(1);
  expect(markerMocks).toHaveLength(2);
  expect(mapMocks[0].setHeading).toHaveBeenCalledWith(8);
  expect(markerMocks[0].setMap).toHaveBeenCalledTimes(1);
  expect(markerMocks[1].setLabel).toHaveBeenCalledWith("My marker");
});
