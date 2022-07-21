const requestCompounds = async (n, delay) => {
  try {
    const compounds = [];
    for (let i = 1; i <= n; i++) {
      const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${i}/JSON/`;
      const res = (await fetch(url));
      console.log(res);
      compounds.push(res.data);
      await new Promise(r => setTimeout(r, delay));
    }
    return compounds;
  } catch(e) {
    console.log(`An error occurred while fetching compound ${n}`);
    console.log(e);
  }
}

const parseCompounds = compounds => {
  return compounds.map(({Record}) => {
    const {Section, RecordNumber, RecordTitle} = Record;

    const getSubsectionInfo = (baseObj, propertyName) => baseObj?.find(({TOCHeading}) => TOCHeading == propertyName)?.Information;
    const getDeepValue = obj => obj?.[0]?.Value?.StringWithMarkup?.[0]?.String;

    const namesAndIds = Section?.find(({TOCHeading}) => TOCHeading == "Names and Identifiers")?.Section;
    const computedDescriptors = namesAndIds?.find(({TOCHeading}) => TOCHeading == "Computed Descriptors")?.Section;

    const recordDescription = namesAndIds?.find(({TOCHeading}) => TOCHeading == "Record Description")?.Information?.find(({Name}) => Name == "Record Description")?.Value?.StringWithMarkup?.[0]?.String;

    return {
      'number' : RecordNumber,
      'name' : RecordTitle,
      'description' : recordDescription,
      'iupac' : getDeepValue(getSubsectionInfo(computedDescriptors, "IUPAC Name")),
      'inchi' : getDeepValue(getSubsectionInfo(computedDescriptors, "InChI")),
      'inchikey' : getDeepValue(getSubsectionInfo(computedDescriptors, "InChI Key")),
      'smiles' : getDeepValue(getSubsectionInfo(computedDescriptors, "Canonical SMILES")),
    };
  })
}

const main = async () => {
  const delay = 1000;
  const numCompounds = 5;
  const compounds = await requestCompounds(numCompounds, delay);
  console.log(compounds);
  // const parsed = parseCompounds(compounds);
  // console.log(parsed);
  return;
};

main();