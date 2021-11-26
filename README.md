## Origo Tech Radar

Forked from https://github.com/thoughtworks/build-your-own-radar

### Deployment

1. Logg inn på aws-konto _noaws-uke-origo-dev_
2. `npm run build`
3. `aws s3 sync ./dist s3://ok-origo-dataplatform-public-dev/tech-radar/ --region eu-west-1 --delete`

OBS 1. Dette sletter filer som finnes i s3-bøtta fra før, men ikke i ny dist-mappe.
