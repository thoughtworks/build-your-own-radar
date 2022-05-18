## Origo Teknologiradar

Laget som kopi av:\
https://github.com/thoughtworks/build-your-own-radar

### URL for radaren

https://teknologiradar.oslo.systems/

### Oppdatering av innhold

Kildedata for radaren finnes i Google Sheet med navn "teknologiradar".

1. Gjør endringer i fanen med navn "arbeidsflate".
2. Data som fjernes fra radaren kan med fordel legges i bunnen på arbeidsflaten.
3. Eksporter CSV-fil fra fanen "til eksportering".
4. Legg CSV-fila i `data`-mappa i dette prosjektet.
5. Oppdater fil som skal benyttes i `src/config.js`.

### Bygging av prosjekt

1. `npm install`
2. `npm run build` - bygge prosjektet til `./dist`
3. `npm run dev` - kjøre prosjektet lokalt

### Deployment av ny versjon

1. `aws sso login` og logg inn på AWS-konto _origo-dev_
2. Husk `export AWS_PROFILE=` med din lokale SSO-konto
3. `npm run deploy`

Prosjektet bygger i `./dist` og kopierer denne til s3-bøtte `teknologiradar.oslo.systems`.

OBS 1: Krever [aws-cli](https://aws.amazon.com/cli/) \
OBS 2: Opplasting skjer med sync-operasjon og sletter derfor filer som finnes i s3-bøtta fra før, men ikke i ny dist-mappe.
