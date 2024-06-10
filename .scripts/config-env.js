
const fs = require('node:fs');
const path = require('node:path');
const colors = require('colors');
require('dotenv').config()

const run = () => {
  const rootPath = path.join(__dirname, '..');
  const envFile = path.join(rootPath, '.env');
  const envExampleFile = path.join(rootPath, '.env.example');
  if (
    !process.env.GEMINI_API_KEY ||
    !process.env.OPENAI_API_KEY ||
    !process.env.PRODUCTION
  ) {
    if (fs.existsSync(envExampleFile)) {
      if (!fs.existsSync(envFile)) {
        fs.copyFileSync(envExampleFile, envFile);
      }
    }
  }

  const envConfigFile = `
    export const environment = {
        production: ${process.env.PRODUCTION},
        gemini: {
          api: {
            key: '${process.env.GEMINI_API_KEY}'
          }
        },
        openai: {
          api: {
            key: '${process.env.OPENAI_API_KEY}'
          }
        }
    };`;

  console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  console.log(colors.grey(envConfigFile));

  const targetPath = './src/environments';

  fs.mkdirSync(path.join(process.cwd(), targetPath), { recursive: true })
  fs.writeFileSync(`${targetPath}/environment.ts`, envConfigFile);
  fs.writeFileSync(`${targetPath}/environment.prod.ts`, envConfigFile);

  console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
}

run();
