export function stringToDate(dateString: string) {
    const parts: string[] = dateString.split('-');
    // Note: Months are zero-indexed in JavaScript Date, so we need to subtract 1 from the month value
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
}