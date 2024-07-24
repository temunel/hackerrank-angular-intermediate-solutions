import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {WeatherFinder} from './weatherFinder.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy, Type} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('WeatherFinder', () => {
  let component: WeatherFinder;
  let fixture: ComponentFixture<WeatherFinder>;
  let input;
  let searchBtn;
  let compiled;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const pushValue = async (value) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
    searchBtn.click();
    await fixture.whenStable();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [WeatherFinder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(WeatherFinder, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFinder);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    input = getByTestId('app-input');
    searchBtn = getByTestId('submit-button');
    injector = getTestBed();
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should render the Initial UI correctly', async () => {
    expect(input.value.trim()).toBeFalsy();
    expect(searchBtn.innerHTML).toBe('Search');
    expect(getByTestId('weather-details')).toBeFalsy();
    expect(getByTestId('result')).toBeFalsy();
  });

  it('Should show No Results Found when there are no results from API', async () => {
    const url = 'https://jsonmock.hackerrank.com/api/weather?name=Seattle';
    await pushValue('Seattle');
    const req = httpMock.expectOne(url)
    req.flush({"page": 1, "per_page": 10, "total": 0, "total_pages": 0, "data": []})
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(getByTestId('weather-details')).toBeFalsy();
    expect(getByTestId('no-result')).toBeTruthy();
    expect(getByTestId('no-result').innerHTML.trim()).toEqual('No Results Found');
  });

  it('Should search and render the data - 1', async () => {
    const url = 'https://jsonmock.hackerrank.com/api/weather?name=Dallas';
    await pushValue('Dallas');
    const req = httpMock.expectOne(url)
    req.flush({
      "page": 1,
      "per_page": 10,
      "total": 1,
      "total_pages": 1,
      "data": [
        {
          "name": "Dallas",
          "weather": "12 degree",
          "status": [
            "Wind: 2Kmph",
            "Humidity: 5%"
          ]
        }
      ]
    })
    await fixture.whenStable();
    fixture.detectChanges();
    expect(req.request.url).toBe(url);
    expect(getByTestId('weather-details')).toBeTruthy();
    expect(getByTestId('icon-sunny')).toBeFalsy();
    expect(getByTestId('icon-cold')).toBeTruthy();
    expect(getByTestId('result-temperature').innerHTML.trim()).toBe('12 degree');
    expect(getByTestId('result-wind').innerHTML.trim()).toBe(`Wind: 2Kmph`);
    expect(getByTestId('result-humidity').innerHTML.trim()).toBe(`Humidity: 5%`);
    expect(getByTestId('no-result')).toBeFalsy();
  });

  it('Should search and render the data - 2', async () => {
    const url = 'https://jsonmock.hackerrank.com/api/weather?name=Oakland';
    await pushValue('Oakland');
    const req = httpMock.expectOne(url)
    req.flush({
      "page": 1,
      "per_page": 10,
      "total": 1,
      "total_pages": 1,
      "data": [
        {
          "name": "Oakland",
          "weather": "34 degree",
          "status": [
            "Wind: 21Kmph",
            "Humidity: 59%"
          ]
        }
      ]
    })
    await fixture.whenStable();
    fixture.detectChanges();
    expect(req.request.url).toBe(url);
    expect(getByTestId('weather-details')).toBeTruthy();
    expect(getByTestId('icon-sunny')).toBeTruthy();
    expect(getByTestId('icon-cold')).toBeFalsy();
    expect(getByTestId('result-temperature').innerHTML.trim()).toBe('34 degree');
    expect(getByTestId('result-wind').innerHTML.trim()).toBe(`Wind: 21Kmph`);
    expect(getByTestId('result-humidity').innerHTML.trim()).toBe(`Humidity: 59%`);
    expect(getByTestId('no-result')).toBeFalsy();
  });

  it('Perform series of actions', async () => {
    let url = 'https://jsonmock.hackerrank.com/api/weather?name=Oakland';
    await pushValue('Oakland');
    let req = httpMock.expectOne(url);
    req.flush({
      "page": 1,
      "per_page": 10,
      "total": 1,
      "total_pages": 1,
      "data": [
        {
          "name": "Oakland",
          "weather": "34 degree",
          "status": [
            "Wind: 21Kmph",
            "Humidity: 59%"
          ]
        }
      ]
    })
    await fixture.whenStable();
    fixture.detectChanges();
    expect(req.request.url).toBe(url);
    expect(getByTestId('weather-details')).toBeTruthy();
    expect(getByTestId('icon-sunny')).toBeTruthy();
    expect(getByTestId('icon-cold')).toBeFalsy();
    expect(getByTestId('result-temperature').innerHTML.trim()).toBe('34 degree');
    expect(getByTestId('result-wind').innerHTML.trim()).toBe(`Wind: 21Kmph`);
    expect(getByTestId('result-humidity').innerHTML.trim()).toBe(`Humidity: 59%`);
    expect(getByTestId('no-result')).toBeFalsy();

    url = 'https://jsonmock.hackerrank.com/api/weather?name=Seattle';
    await pushValue('Seattle');
    req = httpMock.expectOne(url)
    req.flush({"page": 1, "per_page": 10, "total": 0, "total_pages": 0, "data": []})
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(getByTestId('weather-details')).toBeFalsy();
    expect(getByTestId('no-result')).toBeTruthy();
    expect(getByTestId('no-result').innerHTML.trim()).toEqual('No Results Found');
  });
});
