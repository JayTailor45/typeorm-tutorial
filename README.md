# Awesome Project Build with TypeORM

### Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
4. Run `npm run dev` to start server in developement mode
5. Run `npm run build` to build project into js files 

### Migration commands:
- Run `npm run typeorm schema:drop` to clear database
- Run `npm run typeorm migration:generate -- -n name_of_migration` to create migrations
- Run `npm run typeorm migration:run` to run migrations 
- Run `npm run typeorm migration:revert` to revert migrations
- Run `npm run typeorm migration:show` to show migration status
