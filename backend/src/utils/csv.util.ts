export class CsvUtil {
  /**
   * Converts an array of objects to a CSV string.
   * Handles escaping commas, quotes, newlines, and null values.
   */
  static generateCsv(data: Record<string, any>[]): string {
    if (!data || data.length === 0) return '';
    
    // Extract headers from the first object
    const headers = Object.keys(data[0]);
    
    // Create the header row
    const headerRow = headers.map(header => this.escapeField(header)).join(',');
    
    // Create the data rows
    const dataRows = data.map(row => {
      return headers.map(header => this.escapeField(row[header])).join(',');
    });
    
    return [headerRow, ...dataRows].join('\n');
  }

  /**
   * Escapes a single field according to CSV rules.
   */
  private static escapeField(field: any): string {
    if (field === null || field === undefined) {
      return '';
    }
    
    // Convert everything to string
    let str = String(field);
    
    // If the field contains a double quote, comma, or newline, it must be enclosed in double quotes
    // And double quotes inside the field must be escaped as two double quotes ("")
    if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
      str = str.replace(/"/g, '""');
      return `"${str}"`;
    }
    
    return str;
  }
}
