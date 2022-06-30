async function init() {

for (let i = 0; i < 100; i++){

fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${i}/JSON/`)
  .then(response => response.json())
  .then(data => console.log(data))
  await sleep(1000);
}

}

function sleep(ms) {
    return new Promise((resolve)=> {
        setTimeout(resolve, ms);
    })
}

init();