function saveData() {
  let data = getDataFromForm();
  if (!data) {
    alert("No data to save");
    return;
  }
  processData(data);
  alert("Data saved successfully");
}
