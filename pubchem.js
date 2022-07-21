const requestCompounds = async ({start=1, end=5, delay=1000}) => {
  try {
    const compounds = [];
    for (let i = start; i <= end; i++) {
      const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${i}/JSON/`;
      const res = await fetch(url);
      const data = await res.json();
      compounds.push(data);
      await new Promise(r => setTimeout(r, delay));
    }
    return compounds;
  } catch(e) {
    console.log(`An error occurred while fetching compound`);
    console.log(e);
  }
}

const parseCompounds = compounds => {
  try {
    return compounds.map(({Record}) => {
      const {Section, RecordNumber, RecordTitle} = Record;
  
      const getDeepValue = obj => obj?.[0]?.Value?.StringWithMarkup?.[0]?.String;
      const getSubsectionInfo = (baseObj, propertyName) => baseObj?.find(({TOCHeading}) => TOCHeading == propertyName)?.Information;
  
      const namesAndIds = Section?.find(({TOCHeading}) => TOCHeading == "Names and Identifiers")?.Section;
      const computedDescriptors = namesAndIds?.find(({TOCHeading}) => TOCHeading == "Computed Descriptors")?.Section;
  
      const recordDescription = namesAndIds
        ?.find(({TOCHeading}) => TOCHeading == "Record Description")?.Information
        ?.find(({Name}) => Name == "Record Description")?.Value?.StringWithMarkup?.[0]?.String;
  
      return {
        'number' : RecordNumber || "",
        'name' : RecordTitle || "",
        'description' : recordDescription || "",
        'iupac' : getDeepValue(getSubsectionInfo(computedDescriptors, "IUPAC Name")) || "",
        'inchi' : getDeepValue(getSubsectionInfo(computedDescriptors, "InChI")) || "",
        'inchikey' : getDeepValue(getSubsectionInfo(computedDescriptors, "InChI Key")) || "",
        'smiles' : getDeepValue(getSubsectionInfo(computedDescriptors, "Canonical SMILES")) || "",
      };
    })
  } catch(e) {
    console.log(`An error occurred while parsing compound`);
    console.log(e);
  }
}

const main = async () => {
  const compounds = await requestCompounds({ start: 1, end: 10, delay: 200 });
  const parsed = parseCompounds(compounds);
  console.log(parsed);
  return;
};

main();