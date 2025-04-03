//checkly.config.ts
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
 projectName: 'pwExamples-maria',
 logicalId: 'pwExamples-Maria',
 repoUrl: 'https://github.com/MariadeAnton/playwright-examples',
 checks: {
 playwrightConfigPath: './playwright.config.ts',
 playwrightChecks: [
	  {
	    //Run the essential project with checkly configuration
	    name: 'Essential',
	    pwProjects: 'essential', // Reference the project in playwright.config.ts
	    frequency: Frequency.EVERY_24H,
      },
	  {
	    name: 'Critical-tagged',
	    pwTags: 'critical',  // Reference a tag in the tests
	    frequency:  60,
	  },
	  {
	    name: 'Fast-tagged',
	    pwTags: 'fast',  // Reference a tag in the tests
	    frequency:  Frequency.EVERY_24H,
	  },
	 ],
 },
 //also include:
 cli: {
   runLocation: 'eu-west-1',
   retries: 0,
 },
})