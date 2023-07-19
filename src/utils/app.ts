const numberToDollar = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const arrayStringToTextString = (items: any[], key: string): string => {
  let result: string = '-';
  const arrTemp: string[] = [];

  if (items?.length > 0) {
    items.map(item => arrTemp.push(item[key]));
    result = arrTemp.join(', ');
  }

  return result;
}

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const getYearFromDate = (dateString: string | null): string => {
  let result = '-';
  
  if (dateString !== null) {
    const date = dateString;
    result = date.substring(0, 4);
  }

  return result;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  
  return `${day}/${month}/${year}`;
};

const getYearOptions = (startYear: number, endYear: number): number[] => {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};

const roundingNumberAverage = (param: number | string | undefined): number | number => {
  const num = Number(param)
  const roundedString = num.toFixed(1);
  const rounded = Number(roundedString);

  return rounded;
}

export {
  numberToDollar,
  arrayStringToTextString,
  isValidDate,
  getYearFromDate,
  formatDate,
  getYearOptions,
  roundingNumberAverage
};
