async function init() {

  const localcompounds = [];
const n = 10;
for (let i = 1; i < n; i++){
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
  mastercompounds.forEach(compound => {
    const firstSection = compound.Record.Section;
    const sectionIndex = firstSection.findIndex(({TOCHeading}) => TOCHeading == "Names and Identifiers");

    const secondSection = firstSection[sectionIndex]["Section"];

    const nextSectionIndex = secondSection.findIndex(section => section["TOCHeading"] == "Record Description");
    
    const computedDescriptorsIndex = secondSection.findIndex(section => section["TOCHeading"] == "Computed Descriptors");
    const descriptionSection = secondSection[computedDescriptorsIndex]["Section"];

    const iupacIndex = descriptionSection.find(section => section["TOCHeading"] == "IUPAC Name");
    const inchiIndex = descriptionSection.find(section => section["TOCHeading"] == "InChI");
    const inchiKeyIndex = descriptionSection.find(section => section["TOCHeading"] == "InChI Key");
    const smilesIndex = descriptionSection.find(section => section["TOCHeading"] == "Canonical SMILES");

    const root = compound.Record.Section[sectionIndex];
    const getStringWithMarkup = obj => obj?.Information?.[0]?.Value?.StringWithMarkup?.[0]?.String;
    const getDescriptor = obj => obj?.root?.[computedDescriptorsIndex]?.["Section"];
    newcompounds.push({
      'number' : compound.Record.RecordNumber,
      'name' : compound.Record.RecordTitle,
      'description' : getStringWithMarkup(root[nextSectionIndex]),
      'iupac' : getStringWithMarkup(getDescriptor(iupacIndex)),
      'inchi' : getStringWithMarkup(getDescriptor(inchiIndex)),
      'inchikey' : getStringWithMarkup(getDescriptor(inchiKeyIndex)),
      'smiles' : getStringWithMarkup((smilesIndex))
    });

    // console.log(newcompounds.length);
  })
  
  console.log(newcompounds);
  console.log(newcompounds.length);

};

process();