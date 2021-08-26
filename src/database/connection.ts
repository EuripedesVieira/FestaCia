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
import dev from '../../sql-dev';

const connection = knex({
	client:'pg',
	debug:true,
	connection:dev,
	useNullAsDefault:true
});
export default connection;
