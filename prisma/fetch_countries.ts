import { writeFileSync } from 'fs';
import { join } from 'path';

async function fetchCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
  const data = await res.json();
  const countries = data.map((c: any) => {
    let phoneCode = null;
    if (c.idd && c.idd.root) {
      phoneCode = c.idd.root + (c.idd.suffixes && c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : '');
    }
    return {
      name: c.name.common,
      code: c.cca2, // ISO 3166-1 alpha-2
      phoneCode: phoneCode
    };
  }).filter((c: any) => c.name && c.code);
  
  countries.sort((a: any, b: any) => a.name.localeCompare(b.name));
  
  // ensure Taiwan is explicitly correctly named if needed
  const tw = countries.find((c: any) => c.code === 'TW');
  if (tw) {
    tw.name = "Taiwan";
  }

  const outputPath = join(__dirname, 'countries.json');
  writeFileSync(outputPath, JSON.stringify(countries, null, 2));
  console.log(`Saved ${countries.length} countries to ${outputPath}`);
}
fetchCountries().catch(console.error);
