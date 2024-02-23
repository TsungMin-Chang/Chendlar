# Run the project

0. Create a next app, and select `Yes` on all prompts

```bash
yarn create next-app
```

1. Install dependencies

```bash
yarn
```

2. Start the database

```bash
docker compose up -d
```

3. Run migrations

```bash
yarn migrate
```

4. Start the development server

```bash
yarn dev
```

5. Open http://localhost:3000 in your browser

# Setup Guide

## Prettier and ESLint

1. Install prettier and prettier plugins

```bash
yarn add -D prettier prettier-plugin-tailwindcss @trivago/prettier-plugin-sort-imports
```

2. Install eslint and eslint plugins

```bash
yarn add -D eslint typescript @typescript-eslint/parser eslint-config-prettier @typescript-eslint/eslint-plugin
```

3. Copy and paste the `.prettierrc.cjs` and `.eslintrc.json` from this repo to your project root.

4. Add `format` script to `package.json`

```json
{
    "scripts": {
    "format": "prettier --write ."
    }
}
```
5. Check if the scripts work

```bash
yarn format
yarn lint
```

## Drizzle Setup

1. Install drizzle

```bash
yarn add drizzle-orm pg
yarn add -D drizzle-kit @types/pg
```

2. Copy the `docker-compose.yml` from this repo to your project root.

3. Start the database

```bash
docker compose up -d
```

4. Add `POSTGRES_URL` to `.env`:

```text
...
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/chendlar
```

5. Create `db` folder
   
6. Create the `./src/db/index.ts` file

7. Create an empty `./src/db/schema.ts` file

8. Copy the `./drizzle.config.ts` from this repo to your project root.
   Remember to install `dotenv`:

```bash
yarn add dotenv
```

9. Change the `target` option in `tsconfig.json` to `es2017`:

```json
{
    "compilerOptions": {
    "target": "es2017",
    ...
    }
}
```

10. Add scripts
    Add the following scripts to the `./package.json` file:

```json
{
    "scripts": {
    // This script will update the database schema
    "migrate": "drizzle-kit push:pg",
    // This script opens a GUI to manage the database
    "studio": "drizzle-kit studio"
    }
}
```

    Remember to run `yarn migrate` after you make changes to the database schema, namely the `./src/db/schema.ts` file.

11. Add `pg-data` and `.env` to `.gitignore`

```text
...
.env
...
/pg-data
```
