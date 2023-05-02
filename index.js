(async () => {
  const response = await fetch(
    'https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1'
  );
  console.log(response)
  const body = JSON.parse(await response.text());
  receiptScanner(body);
})();

const receiptScanner = (body) => {
  const domestic = body
    .filter((item) => item.domestic)
    .sort((first, second) => first.name.toLowerCase() > second.name.toLowerCase() ? 1 : -1);

  const imported = body
    .filter((item) => !item.domestic)
    .sort((first, second) => first.name.toLowerCase() > second.name.toLowerCase() ? 1 : -1);

  const domesticCost = domestic.reduce((sum, item) => {
    return (parseFloat(sum) + parseFloat(item.price)).toFixed(1);
  }, 0).replace('.', ',');

  const importedCost = imported.reduce((sum, item) => {
    return (parseFloat(sum) + parseFloat(item.price)).toFixed(1);
  }, 0).replace('.', ',');

  console.log('. Domestic');
  domestic.map((item) => {
    consoleLogItem(item.name, item.price, item.description, item.weight);
  })

  console.log('. Imported');
  imported.map((item) => {
    consoleLogItem(item.name, item.price, item.description, item.weight);
  })

  console.log('Domestic cost: $' + domesticCost);
  console.log('Imported cost: $' + importedCost);
  console.log('Domestic count: ' + domestic.length);
  console.log('Imported count: ' + imported.length);
}

const consoleLogItem = (name, price, description, weight) => {
  console.log("... " + name);
  console.log("    " + "Price: $" + parseFloat(price).toFixed(1).replace('.', ','));
  console.log("    " + description.slice(0, 10) + "...")
  console.log(weight ? "    " + "Weight: " + weight + "g" : "    " + "Weight: N/A")
}