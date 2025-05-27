//checkly.config.ts
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
 projectName: 'pwExamples-maria',
 logicalId: 'pwExamples-Maria',
 repoUrl: 'https://github.com/MariadeAnton/playwright-examples',
 checks: {
 playwrightConfigPath: './playwright.config.ts',
 include: ['.npmrc'],
 playwrightChecks: [
	  {
	    //Run the Chromium project with checkly configuration
	    name: 'Chromium Suite',
	    logicalId: 'chromium-e2e-suite',
	    pwProjects: 'chromium', // Reference a project in your playwright.config.ts
	    frequency: Frequency.EVERY_10M,
		locations:['us-west-1','eu-west-2','ap-northeast-1'],
          },
	  {
	    name: 'Critical suite in all device projects',
	    logicalId:'critical-suite',
	    pwTags: 'critical',  // Reference a tag in your tests
	    frequency:  5,
	    locations:['us-west-1','eu-west-2','ap-northeast-1'],
	  },
	  {
	    name: 'Sanity suite in Chromium',
	    logicalId:'sanity-suite',
	    pwProjects: 'chromium', // Reference a project in your playwright.config.ts
	    pwTags: 'sanity',  // Reference a tag in your tests
	    frequency:  Frequency.EVERY_2M,
	  },
	 ],
 },
 //also include:
 cli: {
   runLocation: 'eu-west-1',
   retries: 0,
 },
})
