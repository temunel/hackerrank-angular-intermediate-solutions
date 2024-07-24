# WeatherFinder

*JSON API URL :*
`https://jsonmock.hackerrank.com/api/weather?name=<name>`

## Environment 

- Angular CLI Version: 10.0.9
- Angular Core Version: 10.0.9
- Node Version: 12.18.3
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/I8LW4foLtjrt6jvB0RIv4w/weather-finder.gif)

## Functionality Requirements

The component must have the following functionalities:

- The input should initially be empty. The user can type a city name into this input box to search for weather details for this city.

- Clicking on the `Search` button should make an API GET call to the URL `https://jsonmock.hackerrank.com/api/weather?name=<name>` using the Angular HttpClient module. Here, `<name>` is the city name entered into the text box. For example, for the value `Dallas`, the API hit has to be `https://jsonmock.hackerrank.com/api/weather?name=Dallas`. You will always get data for cities `Dallas` and `Oakland`.

- The response contains a data field, where data is an array of objects, and each object is a weather record. We only need to use the first record from the array for rendering in this challenge. The sample format of the data field is given below:

```
  "data": [
    {
      "name": "Dallas",
      "weather": "12 degree", // Format is always "<value> degree"
      "status": [
        "Wind: 2Kmph", // String
        "Humidity: 5%" // String
      ]
    }
  ]
```

- The weather details should be rendered inside `<div data-test-id="weather-details"></div>`. This div should not be rendered initially since no API has been hit yet.

- Each weather record contains a weather field. Retrieve the value and display in the following element - `<span data-test-id="result-temperature"></span>`.

- If value in weather field is less than 20, render cold weather icon by rendering `<i data-test-id="icon-cold"></i>`. If the value is greater than or equal to 20, render sunny weather icon by rendering `<i data-test-id="icon-sunny"></i>`.

- Each weather record contains a status field which is an array of strings.

- The first string denotes the wind value and the second string denotes the humidity value.
    1. Render wind value in <div data-test-id="result-wind"></div> 
    2. Render humidity value in <div data-test-id="result-humidity"></div> 

- If no records are returned for any city by the API, you must render `<div data-test-id="no-result">No Results Found</div>` instead, and this element must be visible only when the data field is an empty array. This div should not be rendered initially since no API has been hit yet.

- Please note that the input field accepts only text. Test cases take care of calling the API with valid input, so writing input validation is not required.

- For testing purposes, please use the following cities and their corresponding weather conditions:

```
  Dallas - Cold
  Oakland - Sunny
```

## Testing Requirements

- The input should have the data-test-id attribute `app-input`.
- The `Search` button should have the data-test-id attribute `submit-button`.
- The weather details should have the data-test-id attribute `weather-details`.
- The sunny icon should have the data-test-id attribute `icon-sunny`.
- The cold icon should have the data-test-id attribute `icon-cold`.
- The span showing temperature should have the data-test-id attribute `result-temperature`.
- The div showing wind information should have the data-test-id attribute `result-wind`.
- The div showing wind information should have the data-test-id attribute `result-humidity`.
- The `No Results Found` div should have the data-test-id attribute `no-result`.

## Project Specifications

**Read Only Files**
- src/tsconfig.spec.json
- src/app/app.component.css
- src/app/app.module.ts
- src/app/app.component.spec.ts
- src/app/weatherFinder/weatherFinder.component.spec.ts

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
