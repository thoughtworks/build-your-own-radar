
## Building and testing the project

Pull requests are welcome; please write tests whenever possible. Make sure you have nodejs installed.

* npm install
* npm test - to run your tests
* npm run dev - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes

To run End to End tests in headless mode

* add a new environment variable 'TEST_URL' and set it to 'http://localhost:8080/'
* npm run end_to_end_test

To run End to End tests in debug mode

* add a new environment variable 'TEST_URL' and set it to 'http://localhost:8080/'
* npm run start
* Click on 'Run all specs' in cypress window


## Setting up the data

The current format of the CSV can be found in one of the csv files found in the radars folder (e.g. WNE_2020_2021.csv). 

It's a simple format looks similar to the following:

| name          | quadrant   | ring               | icon | description                                             |
|---------------|--------|------------------------|-------|---------------------------------------------------------|
| React      | Frontend  | Adopt                  | lock  | Although the idea web ...          |
| gRPC | Infrastructure  | Trial             | budding | Interservice communication ...       |
| Spark  | Data | Adopt              | lock  | Spark is great ...   |
| NodeJS           | Backend   | Hold | lock | Node ... |

You an simply add rows following the same pattern as other rows and the radar will adjust accordingly.

## Building the radar

When the user first comes to the page they will be prompted for which radar they will read. You can populate future radars in the factory.js file where the variable `years` is declared. This of course can be made better to be more dynamic but works in the interim. 

## Docker Image
See the Dockerfile in the repo if you want to build your own container.

## Contribute

The descriptions folder contains a series of markdown files that have descriptions for the items that exist in the CSV file. So, if you add a row in the CSV file for a particular technology you will want to create a `<name_of_tech.md>` file in the `radar/descriptions` directory. 
***This name of this tech from the csv must match the filename exactly***

If you want to link to another description from inside a markdown file you can simply put an empty href like `[Angular]()`. When that empty reference is clicked the site will navigate to the description for you. 
***The name must match exactly***

Once you've added your descriptions and items to the csv you can parse the markdown files so that their html is placed into the description column in the csv. 

Run `npm run parse_markdown` before you create a PR with new items.

To see the results locally run `npm run dev` and that will start a server at  `localhost:8080`.

## Futures
* Handle more csv files automatically instead of a static list
* Include all data about the technology (ring, quadrant, etc) in the markdown files and generate a csv from that rather than double entering data

