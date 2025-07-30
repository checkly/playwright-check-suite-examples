//checkly.config.ts
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
 projectName: 'Demo Playwright Check Suites',
 logicalId: 'demo-pwCheckSuites',
 repoUrl: 'https://github.com/checkly/playwright-check-suite-examples',
 checks: {
     playwrightConfigPath: './playwright.config.ts',
	 locations:['us-west-1','eu-west-2','ap-northeast-1'],

     playwrightChecks: [
     {
	    //Run the Chromium project with checkly configuration
	    name: 'Chromium Suite',
	    logicalId: 'chromium-e2e-suite',
	    pwProjects: 'chromium', // get complete set of tests run in chromium
	    frequency: Frequency.EVERY_10M,      },
	  {
	    name: 'Critical tagged tests in all devices',
	    logicalId:'critical-suite',
	    pwTags: 'critical',  // get all tests tagged critical
	    frequency:  5,
	  },
	  {
	    name: 'Sanity tagged tests in Chromium, only in Ireland',
	    logicalId:'sanity-suite',
	    pwProjects: 'chromium', // use chromium
	    pwTags: 'sanity',  // get all tests tagged sanity
	    frequency:  Frequency.EVERY_2M,
		locations:['eu-west-1'],

	  },
     ],
 },
 //also include:
 cli: {
   runLocation: 'eu-west-1',
   retries: 0,
 },
})
