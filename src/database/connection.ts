/*
import knex from 'knex';

const connection = knex({
	client:'pg',
	debug:true,
	connection:{
		connectionString:process.env.DATABASE_URL,
		ssl:{ rejectUnauthorized: false }
	},
	useNullAsDefault:true
	}
);

export default connection;
*/


import knex from 'knex';
import path from 'path';

const connection = knex({
	client: 'sqlite3',
	connection:{
		filename: path.resolve(__dirname, 'database.sqlite')
	},
	useNullAsDefault:true
});
export default connection;
