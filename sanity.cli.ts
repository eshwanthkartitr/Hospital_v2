/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import dotenv from 'dotenv'
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset }, 
                                autoUpdates: true })