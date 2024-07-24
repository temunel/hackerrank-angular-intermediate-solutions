import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {FootballCompetitions} from './footballCompetitions.component';
import {ChangeDetectionStrategy, Type} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('FootballCompetitions', () => {
  let component: FootballCompetitions;
  let fixture: ComponentFixture<FootballCompetitions>;
  let compiled;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FootballCompetitions],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(FootballCompetitions, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  const mockFirstApiCall = () => {
    const url = 'https://jsonmock.hackerrank.com/api/football_competitions?page=1';
    const req = httpMock.expectOne(url);
    req.flush({
      "page": "1",
      "per_page": 10,
      "total": 35,
      "total_pages": 4,
      "data": [
        {
          "name": "UEFA Champions League",
          "country": "",
          "year": 2011,
          "winner": "Chelsea",
          "runnerup": "Bayern Munich"
        },
        {
          "name": "UEFA Champions League",
          "country": "",
          "year": 2012,
          "winner": "Bayern Munich",
          "runnerup": "Borussia Dortmund"
        },
        {
          "name": "UEFA Champions League",
          "country": "",
          "year": 2013,
          "winner": "Real Madrid",
          "runnerup": "Atletico Madrid"
        },
        {
          "name": "UEFA Champions League",
          "country": "",
          "year": 2014,
          "winner": "Barcelona",
          "runnerup": "Juventus"
        },
        {
          "name": "UEFA Champions League",
          "country": "",
          "year": 2015,
          "winner": "Real Madrid",
          "runnerup": "Atletico Madrid"
        },
        {
          "name": "English Premier League",
          "country": "England",
          "year": 2011,
          "winner": "Manchester City",
          "runnerup": "Manchester United"
        },
        {
          "name": "English Premier League",
          "country": "England",
          "year": 2012,
          "winner": "Manchester United",
          "runnerup": "Manchester City"
        },
        {
          "name": "English Premier League",
          "country": "England",
          "year": 2013,
          "winner": "Manchester City",
          "runnerup": "Liverpool"
        },
        {
          "name": "English Premier League",
          "country": "England",
          "year": 2014,
          "winner": "Chelsea",
          "runnerup": "Manchester City"
        },
        {
          "name": "English Premier League",
          "country": "England",
          "year": 2015,
          "winner": "Leicester City",
          "runnerup": "Arsenal"
        }
      ]
    });
    return req;
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCompetitions);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    injector = getTestBed();
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should render the Initial UI as expected', async () => {
    const req = mockFirstApiCall();
    const url = 'https://jsonmock.hackerrank.com/api/football_competitions?page=1';
    expect(req.request.url).toBe(url);
    await fixture.whenStable();
    fixture.detectChanges();
    const pageNumberButtons = getByTestId('page-number-buttons');
    expect(pageNumberButtons.children.length).toEqual(4);
    expect(pageNumberButtons.children[0].innerHTML.trim()).toEqual('1');
    expect(pageNumberButtons.children[1].innerHTML.trim()).toEqual('2');
    expect(pageNumberButtons.children[2].innerHTML.trim()).toEqual('3');
    expect(pageNumberButtons.children[3].innerHTML.trim()).toEqual('4');
    const competitions = getByTestId('football-competitions');
    expect(competitions.children.length).toEqual(10);
    expect(competitions.children[0].innerHTML.trim()).toEqual('Competition UEFA Champions League won by Chelsea in year 2011');
    expect(competitions.children[1].innerHTML.trim()).toEqual('Competition UEFA Champions League won by Bayern Munich in year 2012');
    expect(competitions.children[2].innerHTML.trim()).toEqual('Competition UEFA Champions League won by Real Madrid in year 2013');
    expect(competitions.children[3].innerHTML.trim()).toEqual('Competition UEFA Champions League won by Barcelona in year 2014');
    expect(competitions.children[4].innerHTML.trim()).toEqual('Competition UEFA Champions League won by Real Madrid in year 2015');
    expect(competitions.children[5].innerHTML.trim()).toEqual('Competition English Premier League won by Manchester City in year 2011');
    expect(competitions.children[6].innerHTML.trim()).toEqual('Competition English Premier League won by Manchester United in year 2012');
    expect(competitions.children[7].innerHTML.trim()).toEqual('Competition English Premier League won by Manchester City in year 2013');
    expect(competitions.children[8].innerHTML.trim()).toEqual('Competition English Premier League won by Chelsea in year 2014');
    expect(competitions.children[9].innerHTML.trim()).toEqual('Competition English Premier League won by Leicester City in year 2015');
  });

  it('Should show correct results when page 2 is clicked', async (done) => {
    let req = mockFirstApiCall();
    await fixture.whenStable();
    fixture.detectChanges();
    const pageNumberButtons = getByTestId('page-number-buttons');
    pageNumberButtons.children[1].click();
    fixture.detectChanges();
    const url = 'https://jsonmock.hackerrank.com/api/football_competitions?page=2';
    req = httpMock.expectOne(url)
    req.flush({
      "page": "2",
      "per_page": 10,
      "total": 35,
      "total_pages": 4,
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
        },
        {
          "name": "La Liga",
          "country": "Spain",
          "year": 2012,
          "winner": "FC Barcelona",
          "runnerup": "Real Madrid"
        },
        {
          "name": "La Liga",
          "country": "Spain",
          "year": 2013,
          "winner": "Atletico Madrid",
          "runnerup": "FC Barcelona"
        },
        {
          "name": "La Liga",
          "country": "Spain",
          "year": 2014,
          "winner": "FC Barcelona",
          "runnerup": "Real Madrid"
        },
        {
          "name": "La Liga",
          "country": "Spain",
          "year": 2015,
          "winner": "FC Barcelona",
          "runnerup": "Real Madrid"
        },
        {
          "name": "La Liga",
          "country": "Spain",
          "year": 2016,
          "winner": "Real Madrid",
          "runnerup": "FC Barcelona"
        },
        {
          "name": "League 1",
          "country": "France",
          "year": 2011,
          "winner": "Montpellier HSC",
          "runnerup": "Paris Saint-Germain"
        },
        {
          "name": "League 1",
          "country": "France",
          "year": 2012,
          "winner": "Paris Saint-Germain",
          "runnerup": "Olympique Marseille"
        },
        {
          "name": "League 1",
          "country": "France",
          "year": 2013,
          "winner": "Paris Saint-Germain",
          "runnerup": "AS Monaco"
        }
      ]
    })
    expect(req.request.url).toBe(url)
    fixture.detectChanges();
    await fixture.whenStable();
    const competitions = getByTestId('football-competitions');
    expect(competitions.children.length).toEqual(10);
    expect(competitions.children[0].innerHTML.trim()).toEqual('Competition English Premier League won by Chelsea in year 2016');
    expect(competitions.children[1].innerHTML.trim()).toEqual('Competition La Liga won by Real Madrid in year 2011');
    expect(competitions.children[2].innerHTML.trim()).toEqual('Competition La Liga won by FC Barcelona in year 2012');
    expect(competitions.children[3].innerHTML.trim()).toEqual('Competition La Liga won by Atletico Madrid in year 2013');
    expect(competitions.children[4].innerHTML.trim()).toEqual('Competition La Liga won by FC Barcelona in year 2014');
    expect(competitions.children[5].innerHTML.trim()).toEqual('Competition La Liga won by FC Barcelona in year 2015');
    expect(competitions.children[6].innerHTML.trim()).toEqual('Competition La Liga won by Real Madrid in year 2016');
    expect(competitions.children[7].innerHTML.trim()).toEqual('Competition League 1 won by Montpellier HSC in year 2011');
    expect(competitions.children[8].innerHTML.trim()).toEqual('Competition League 1 won by Paris Saint-Germain in year 2012');
    expect(competitions.children[9].innerHTML.trim()).toEqual('Competition League 1 won by Paris Saint-Germain in year 2013');
    done();
  });

  it('Should show correct results when page 3 is clicked', async (done) => {
    let req = mockFirstApiCall();
    await fixture.whenStable();
    fixture.detectChanges();
    const pageNumberButtons = getByTestId('page-number-buttons');

    pageNumberButtons.children[2].click();
    fixture.detectChanges();
    const url = 'https://jsonmock.hackerrank.com/api/football_competitions?page=3';
    req = httpMock.expectOne(url);

    req.flush({
      "page": "3",
      "per_page": 10,
      "total": 35,
      "total_pages": 4,
      "data": [
        {
          "name": "League 1",
          "country": "France",
          "year": 2014,
          "winner": "Paris Saint-Germain",
          "runnerup": "Olympique Lyon"
        },
        {
          "name": "League 1",
          "country": "France",
          "year": 2015,
          "winner": "Paris Saint-Germain",
          "runnerup": "Olympique Lyon"
        },
        {
          "name": "League 1",
          "country": "France",
          "year": 2016,
          "winner": "AS Monaco",
          "runnerup": "Paris Saint-Germain"
        },
        {
          "name": "Serie A",
          "country": "Italy",
          "year": 2011,
          "winner": "Juventus",
          "runnerup": "AC Milan"
        },
        {
          "name": "Serie A",
          "country": "Italy",
          "year": 2012,
          "winner": "Juventus",
          "runnerup": "SSC Napoli"
        },
        {
          "name": "Serie A",
          "country": "Italy",
          "year": 2013,
          "winner": "Juventus",
          "runnerup": "AS Roma"
        },
        {
          "name": "Serie A",
          "country": "Italy",
          "year": 2014,
          "winner": "Juventus",
          "runnerup": "AS Roma"
        },
        {
          "name": "Serie A",
          "country": "Italy",
          "year": 2015,
          "winner": "Juventus",
          "runnerup": "SSC Napoli"
        },
        {
          "name": "Serie A",
          "country": "Italy",
          "year": 2016,
          "winner": "Juventus",
          "runnerup": "AS Roma"
        },
        {
          "name": "Bundesliga",
          "country": "Germany",
          "year": 2011,
          "winner": "Borussia Dortmund",
          "runnerup": "Bayern Munchen"
        }
      ]
    });

    expect(req.request.url).toBe(url)
    fixture.detectChanges();
    await fixture.whenStable();

    const competitions = getByTestId('football-competitions');
    expect(competitions.children.length).toEqual(10);
    expect(competitions.children[0].innerHTML.trim()).toEqual('Competition League 1 won by Paris Saint-Germain in year 2014');
    expect(competitions.children[1].innerHTML.trim()).toEqual('Competition League 1 won by Paris Saint-Germain in year 2015');
    expect(competitions.children[2].innerHTML.trim()).toEqual('Competition League 1 won by AS Monaco in year 2016');
    expect(competitions.children[3].innerHTML.trim()).toEqual('Competition Serie A won by Juventus in year 2011');
    expect(competitions.children[4].innerHTML.trim()).toEqual('Competition Serie A won by Juventus in year 2012');
    expect(competitions.children[5].innerHTML.trim()).toEqual('Competition Serie A won by Juventus in year 2013');
    expect(competitions.children[6].innerHTML.trim()).toEqual('Competition Serie A won by Juventus in year 2014');
    expect(competitions.children[7].innerHTML.trim()).toEqual('Competition Serie A won by Juventus in year 2015');
    expect(competitions.children[8].innerHTML.trim()).toEqual('Competition Serie A won by Juventus in year 2016');
    expect(competitions.children[9].innerHTML.trim()).toEqual('Competition Bundesliga won by Borussia Dortmund in year 2011');

    done();
  });

  it('Should show correct results when page 4 is clicked', async (done) => {
    let req = mockFirstApiCall();
    await fixture.whenStable();
    fixture.detectChanges();
    const pageNumberButtons = getByTestId('page-number-buttons');

    pageNumberButtons.children[3].click();
    fixture.detectChanges();
    const url = 'https://jsonmock.hackerrank.com/api/football_competitions?page=4';
    req = httpMock.expectOne(url);

    req.flush({
      "page": "4",
      "per_page": 10,
      "total": 35,
      "total_pages": 4,
      "data": [
        {
          "name": "Bundesliga",
          "country": "Germany",
          "year": 2012,
          "winner": "Bayern Munchen",
          "runnerup": "Borussia Dortmund"
        },
        {
          "name": "Bundesliga",
          "country": "Germany",
          "year": 2013,
          "winner": "Bayern Munchen",
          "runnerup": "Borussia Dortmund"
        },
        {
          "name": "Bundesliga",
          "country": "Germany",
          "year": 2014,
          "winner": "Bayern Munchen",
          "runnerup": "VfL Wolfsburg"
        },
        {
          "name": "Bundesliga",
          "country": "Germany",
          "year": 2015,
          "winner": "Bayern Munchen",
          "runnerup": "Borussia Dortmund"
        },
        {
          "name": "Bundesliga",
          "country": "Germany",
          "year": 2016,
          "winner": "Bayern Munchen",
          "runnerup": "RasenBallsport Leipzig"
        }
      ]
    });

    expect(req.request.url).toBe(url)
    fixture.detectChanges();
    await fixture.whenStable();

    const competitions = getByTestId('football-competitions');
    expect(competitions.children.length).toEqual(5);
    expect(competitions.children[0].innerHTML.trim()).toEqual('Competition Bundesliga won by Bayern Munchen in year 2012');
    expect(competitions.children[1].innerHTML.trim()).toEqual('Competition Bundesliga won by Bayern Munchen in year 2013');
    expect(competitions.children[2].innerHTML.trim()).toEqual('Competition Bundesliga won by Bayern Munchen in year 2014');
    expect(competitions.children[3].innerHTML.trim()).toEqual('Competition Bundesliga won by Bayern Munchen in year 2015');
    expect(competitions.children[4].innerHTML.trim()).toEqual('Competition Bundesliga won by Bayern Munchen in year 2016');

    done();
  });
});
