const convertDateFormat = (input: string, type?: string): string => {
  // Splitting the string by space to separate date and time
  if (input && input !== null) {
    const parts = input.split(' ');
    const datePart = parts[0];
    const timePart = parts.length > 1 ? ` ${parts[1]}` : '';

    // Splitting the date into [month, day, year]
    const separator = datePart.includes('-') ? '-' : '/';

    const dateComponents = datePart.split(separator);

    if (dateComponents.length !== 3) {
      // Invalid date format
      return input;
    }
    let day, month, year;
    if (dateComponents.length === 3) {
      if (dateComponents[0].length === 4) {
        // Format: yyyy/mm/dd
        [year, month, day] = dateComponents;
      } else {
        // Format: mm/dd/yyyy
        [month, day, year] = dateComponents;
      }
    } else {
      return input; // Invalid date format
    }

    // Rearranging to day/month/year format
    return type === 'dateTime' ? `${day}-${month}-${year} ${timePart}` : `${day}-${month}-${year}`;
  } else {
    return '';
  }
};

export const handleCellFormat = (data: any, type: string) => {
  switch (type) {
    case 'date':
    case 'dateTime':
      return convertDateFormat(data, type);
    default:
      return data;
  }
};
