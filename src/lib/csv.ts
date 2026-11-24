/**
 * Serialise rows to CSV. Cells that a spreadsheet would treat as a formula
 * (=, +, -, @, tab, CR) are prefixed with an apostrophe to prevent CSV injection.
 */
export function toCsv<T extends object>(rows: T[], columns: (keyof T & string)[]): string {
  const cell = (value: unknown) => {
    let s = value === null || value === undefined ? "" : String(value);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [columns.join(",")];
  for (const row of rows) lines.push(columns.map((c) => cell(row[c])).join(","));
  return lines.join("\r\n") + "\r\n";
}
