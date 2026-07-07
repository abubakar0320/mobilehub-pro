export function downloadCsv(data: any[], filename: string) {
  if (!data || !data.length) {
    alert("No data available to export.");
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]).filter(key => typeof data[0][key] !== 'object');
  
  // Create CSV rows
  const csvRows = [];
  csvRows.push(headers.join(",")); // Header row
  
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      const escaped = ('' + (val ?? '')).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
