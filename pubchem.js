async function init() {

  const localcompounds = [];

for (let i = 1; i < 10; i++){

fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${i}/JSON/`)
  .then(response => response.json())
  .then(data => localcompounds.push(data))
  await sleep(1000);
}
return localcompounds;
}

function sleep(ms) {
    return new Promise((resolve)=> {
        setTimeout(resolve, ms);
    })
}

async function process() {
  const mastercompounds = await init()
  const newcompounds = []
  mastercompounds.forEach(x => {
    
  const sectionIndex = x.Record.Section.findIndex(section => section["TOCHeading"] == "Names and Identifiers");
  const nextSectionIndex = x.Record.Section[sectionIndex]["Section"].findIndex(section => section["TOCHeading"] == "Record Description");
  const computedDescriptorsIndex = x.Record.Section[sectionIndex]["Section"].findIndex(section => section["TOCHeading"] == "Computed Descriptors");
  const iupacIndex = x.Record.Section[sectionIndex]["Section"][computedDescriptorsIndex]["Section"].findIndex(section => section["TOCHeading"] == "IUPAC Name");
  const inchiIndex = x.Record.Section[sectionIndex]["Section"][computedDescriptorsIndex]["Section"].findIndex(section => section["TOCHeading"] == "InChI");
  const inchiKeyIndex = x.Record.Section[sectionIndex]["Section"][computedDescriptorsIndex]["Section"].findIndex(section => section["TOCHeading"] == "InChI Key");
  const smilesIndex = x.Record.Section[sectionIndex]["Section"][computedDescriptorsIndex]["Section"].findIndex(section => section["TOCHeading"] == "Canonical SMILES");

  newcompounds.push({
    'number' : x.Record.RecordNumber,
    'name' : x.Record.RecordTitle,
    'description' : null,
    'iupac' : null,
    'inchi' : null,
    'inchikey' : null,
    'smiles' : null
  });

  console.log(newcompounds.length);

  if (sectionIndex != -1 && nextSectionIndex != -1) {
    newcompounds[newcompounds.length - 1]['description'] = (x.Record.Section[sectionIndex].Section[nextSectionIndex].Information[0].Value.StringWithMarkup[0].String)
  };

  if (computedDescriptorsIndex != -1 && iupacIndex != -1) {
    newcompounds[newcompounds.length - 1]['iupac'] = (x.Record.Section[sectionIndex].Section[computedDescriptorsIndex]["Section"][iupacIndex].Information[0].Value.StringWithMarkup[0].String)
  };

  if (computedDescriptorsIndex != -1 && inchiIndex != -1) {
    newcompounds[newcompounds.length - 1]['inchi'] = (x.Record.Section[sectionIndex].Section[computedDescriptorsIndex]["Section"][inchiIndex].Information[0].Value.StringWithMarkup[0].String)
  };

  if (computedDescriptorsIndex != -1 && inchiKeyIndex != -1) {
    newcompounds[newcompounds.length - 1]['inchikey'] = (x.Record.Section[sectionIndex].Section[computedDescriptorsIndex]["Section"][inchiKeyIndex].Information[0].Value.StringWithMarkup[0].String)
  };

  if (computedDescriptorsIndex != -1 && inchiKeyIndex != -1) {
    newcompounds[newcompounds.length - 1]['smiles'] = (x.Record.Section[sectionIndex].Section[computedDescriptorsIndex]["Section"][smilesIndex].Information[0].Value.StringWithMarkup[0].String)
  };

})

  console.log(newcompounds);
  console.log(newcompounds.length);

};

process();