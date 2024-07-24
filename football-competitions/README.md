# Football Competitions

*JSON API URL :*
`https://jsonmock.hackerrank.com/api/football_competitions?page=<pageNumber>`

## Expected Output for list

`<li>Competition {name} won by {winner} in year {year}</li>`

## Environment 

- Angular CLI Version: 10.0.9
- Angular Core Version: 10.0.9
- Node Version: 12.18.3
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/1WAxxf03EtrUdnq3heRX2g/football.gif)

## Functionality Requirements

The main aim is to get a paginated list of football competitions and render their details in a list. The component must have the following functionalities:

- The component must get competitions by making an API GET call to URL `https://jsonmock.hackerrank.com/api/football_competitions?page=<pageNumber>` using the Angular HttpClient module. Here, `<pageNumber>` is the page number we want to get the data for.

- The response of the GET call will contain a ``total_pages`` field that denotes the number of pages of results available and a `data` field that is an array of competition records for the requested page. The sample format of the response is:

```
  {
      "page": "1",
      "per_page": 2,
      "total": 2,
      "`total_pages`": 1,
      "data": [
        {
          "name": "English Premier League",
          "country": "England",
          "year": 2016,
          "winner": "Chelsea",
          "runnerup": "Tottenham Hotspur"
        },
        {
          "name": "La Liga",
          "country": "Spain",
          "year": 2011,
          "winner": "Real Madrid",
          "runnerup": "FC Barcelona"
        }
    ]
  }
```

- On component mount, make a GET call to get the data for page 1 (i.e., API GET call to URL `https://jsonmock.hackerrank.com/api/football_competitions?page=1`.

- Retrieve `total_pages` from the response and render pagination buttons corresponding to each page starting from 1 to `total_pages`. Each button must be rendered as `<button>{k}</button>`, where `{k}` is the page number the button corresponds to, for example `<button>1</button>`, `<button>2</button>`, and so on until `<button>{total_pages}</button>`.

- All the buttons must be rendered in the section `<section data-test-id="page-number-buttons"></section>`.

- Clicking on a page button must get records for the corresponding page number and render them. For example, clicking on button 3 must make an API GET call to URL `https://jsonmock.hackerrank.com/api/football_competitions?page=3`, get the data, and render it.

- For the competitions returned by the API, you need to render the list `<ul data-test-id="football-competitions"></ul>`. This list should have a single `<li>` list item for each object in the array. The value of each `<li>` element should be `<li>Competition {name} won by {winner} in year {year}</li>` where {name}, {winner} and {year} are values retrieved from the corresponding competition object.

- For example, in the above data example, there are 2 competition objects in the array, so there will be 2 `<li>` elements inside the `<ul>` element:
    1. `<li>Competition English Premier League won by Chelsea in year 2016</li>`
    2. `<li>Competition La Liga won by Real Madrid in year 2011</li>`

## Testing Requirements

- The `<section>` containing all the buttons should have the data-test-id attribute `page-number-buttons`.

- The `<ul>` should have data-test-id attribute `football-competitions`.

## Project Specifications

**Read Only Files**
- src/tsconfig.spec.json
- src/app/app.component.css
- src/app/app.module.ts
- src/app/app.component.spec.ts
- src/app/footballCompetitions/footballCompetitions.component.spec.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
