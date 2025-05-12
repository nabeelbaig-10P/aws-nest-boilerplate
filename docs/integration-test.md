# Getting Started with Testing in Nest Boilerplate

Welcome to Nest Boilerplate! This guide will help you quickly start writing and running tests for our project.

## 1. **What You Need to Know**

- We use **Jest** for testing.
- Our tests include **integration tests** (API and database interactions).
- Tests live in the `src/modules/*/test/` directories.

## 2. **Setting Up Your Environment**

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd aws-nest-api
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Copy the test environment file:
   ```sh
   cp .env.example .env.test
   ```

## 3. **Running Tests**

To run integration tests:

```sh
pnpm run test:int
```

To run tests for a specific file:

```sh
pnpm exec jest path/to/testfile --runInBand
```

## 4. **Writing Your First Test**

Create a test file inside `src/modules/<module>/test/`.

## 5. **Debugging Issues**

- If a test fails, check the error message and logs.
- Ensure the database is running (`docker ps`).
- Run tests in verbose mode: `pnpm exec jest --verbose`.
