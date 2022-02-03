## Origo Tech Radar

Forked from https://github.com/thoughtworks/build-your-own-radar

### Deployment

1. Logg inn på aws-konto _noaws-uke-origo-dev_
2. `npm run deploy`

Dette bygger prosjektet i .dist, og kopierer denne til s3-bøtte og mappe: ok-origo-dataplatform-public-dev/tech-radar/

OBS 1: Krever [aws-cli](https://aws.amazon.com/cli/)  
OBS 2: Opplasting skjer med sync-operasjon og sletter derfor filer som finnes i s3-bøtta fra før, men ikke i ny dist-mappe.

http://ok-origo-dataplatform-public-dev.s3-website-eu-west-1.amazonaws.com/tech-radar/?sheetId=https://raw.githubusercontent.com/oslokommune/origo-tech-radar/master/data/radar-2021-11-17.csv
