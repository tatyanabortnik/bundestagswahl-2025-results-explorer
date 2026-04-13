# Bundestagswahl 2025 Results Explorer

A small React + TypeScript SPA for exploring the official results of the 2025 German federal election. Pick an electoral area (Bundesgebiet, Land, or Wahlkreis), see its results, then pick a second area to compare side-by-side or in a combined diagram.

## Run locally

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run lint`, `npm test`.

## Deployed version

```
  [bundestagswahl-2025-results-explore.vercel.app](https://bundestagswahl-2025-results-explore.vercel.app/)
```

## Tech stack

- **Vite** over Next.js — this is a fully client-side application.
- **shadcn + TailwindCSS** for styling — a combo I've used before.
- **Recharts** for charts — lightweight, made for the web, and has built-in accessibility (bars are tabbable and tooltip results are read by VoiceOver).

## App structure design

I used Excalidraw to visualize the states of the future app:

![App structure](docs/app-structure.png)

## Data

Source: [Bundeswahlleiterin Open Data, BTW 2025](https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/opendata.html).

I only used `kerg2.csv` and not `Gebietsnummern-und-namen.csv`, since the names can be derived from `kerg2.csv`. I kept the data file in `public/data/` as a fixture and fetch it at runtime — faster to implement and avoids CORS. Parsing happens in the browser with PapaParse.

The trickiest part was deciding how to transform the data. First I thought to group the rows by Land name:

```ts
const electionData = {
  Hamburg: {
    Gebietsart: "Land",
    Name: "Hamburg",
    Gruppen: [{ Gruppenname: "SPD", Anzahl: "123123" }],
    // ...
  },
  "Nordrhein-Westfalen": {
    /* ... */
  },
  // ...
};
```

But this would drop areas with identical names but different `Gebietsart` (e.g. _Hamburg_ the Land vs. _Hamburg-Mitte_ the Wahlkreis).

So I identify each area by `[areaType]-[areaName]` (`Land-Hamburg`, `Wahlkreis-Hamburg-Mitte`), which is also handy for storing these keys directly as URL search params.

## What I built

- **Search with autocomplete** for any of the 316 areas.
- **Single-area view** with turnout and per-party results (absolute + percentage).
- **Two-column comparison** once a second area is selected.
- **Combined diagram** that combines the party results of both selected areas over the 5% threshold.
- **Shareable URLs** — the current selection state lives in the URL.
- **Light/dark theme toggle** — a quick solution to switch between themes.

## Architecture

Three layers:

- **`src/domain/`** — types (`ElectionCsvRow`, `AreaResults`, `PartyResult`), constants, and the pure `mapParsedResults` transform that turns raw CSV rows into a keyed `Map<string, AreaResults>`.
- **`src/data/`** — `loadElectionData()` fetches the CSV and runs it through a generic `parseCsv<T>()` helper.
- **`src/presentation/`** — React. An `ElectionDataContext` holds and shares the election data state `{status, data, error}`; `useElectionData()` consumes it. Components live under `components/`, with shadcn primitives in `components/ui/`.

Data flow: `main.tsx` → `BrowserRouter` + `ElectionDataProvider` → routed views read from the context and the URL.

### Small decisions

- **`Map` keyed by `"AreaType-AreaName"`** — names alone aren't unique across area types, and a map gives fast key lookup for the autocomplete.
- **React Router for URL state** — the `useSearchParams()` hook sets the URL params.

## Tests

A couple of tests cover the most important functionality:

- CSV parsing
- Domain mapping — that `mapParsedResults()` correctly groups rows by a unique `areaType-areaName` key, extracts turnout data, and only considers second-vote data
- Autocomplete filtering behaviour

## Left out

- Previous-election (2021) deltas, column swap button, and session persistence — left out for lack of time.
