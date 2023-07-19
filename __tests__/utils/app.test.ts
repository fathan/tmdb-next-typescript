import {
  arrayStringToTextString,
  formatDate,
  getYearFromDate,
  getYearOptions,
  isValidDate, 
  numberToDollar,
  roundingNumberAverage
} from '@/utils/app';

describe('Utils App', () => {
  it('should be showing number to dollar', () => {
    const nominal = 6000;
    const process = numberToDollar(nominal);

    expect(process).toBe('$6,000.00');
  });

  it('should be showing array to text string with {name} key', () => {
    const data: any[] = [
      { id: 1, name: 'React.js' },
      { id: 2, name: 'Next.js' },
      { id: 3, name: 'TailwindCSS' },
    ];

    const process = arrayStringToTextString(data, 'name');

    expect(process).toBe('React.js, Next.js, TailwindCSS');
  });

  it('should be showing array to text string with {label} key', () => {
    const data: any[] = [
      { id: 1, label: 'DKI Jakarta' },
      { id: 2, label: 'Jawa Barat' },
      { id: 3, label: 'Jawa Tengah' },
      { id: 4, label: 'Jawa Timur' },
      { id: 5, label: 'Bali' },
    ];

    const expected: string = 'DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur, Bali';
    const process = arrayStringToTextString(data, 'label');

    expect(process).toBe(expected);
  });

  it('should be showing Year text "2023" from datetime string', () => {
    const datetime: string = '2023-05-10';
    const expected: string = '2023';

    const process = getYearFromDate(datetime);

    expect(process).toBe(expected);
  })

  it('should be showing Year text "1965" from datetime string', () => {
    const datetime: string = '1965-10-09';
    const expected: string = '1965';

    const process = getYearFromDate(datetime);

    expect(process).toBe(expected);
  });

  it('should be truthy check valid datetime', () => {
    const datetime: string = '2023-10-10';
    const process = isValidDate(datetime);

    expect(process).toBeTruthy()
  });

  it('should be falsy check valid datetime', () => {
    const datetime: string | null = '';
    const process = isValidDate(datetime);

    expect(process).toBeFalsy();
  });

  it('should be truthy showing Format Date "10/06/2023"', () => {
    const datetime: string = '2023-06-10';
    const process = formatDate(datetime);

    expect(process).toBe('10/06/2023');
  });

  it('should be wrong format date "NaN/NaN/NaN"', () => {
    const datetime: string = '';
    const process = formatDate(datetime);

    expect(process).toBe('NaN/NaN/NaN');
  });

  it('should be show year options array data from "2015" to "2023"', () => {
    const expected: number[] = [
      2015, 2016, 2017, 
      2018, 2019, 2020, 
      2021, 2022, 2023
    ];
    const process = getYearOptions(2015, 2023);

    expect(process).toStrictEqual(expected);
  });

  it('should be rounding number 7.987 to 2 digits after Comma #1', () => {
    const rating: number = 7.987;

    const process = roundingNumberAverage(rating);

    expect(process).toEqual(8.0)
  });

  it('should be rounding number 5.476 to 2 digits after Comma #2', () => {
    const rating: number = 5.476;

    const process = roundingNumberAverage(rating);

    expect(process).toBe(5.5)
  });
});