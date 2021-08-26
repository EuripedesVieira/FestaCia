import path from 'path';
import dev from './sql-dev';

const sqlite = {
	client: 'sqlite3',
	connection:{
		filename: path.resolve(__dirname, 'src','database','database.sqlite')
	},
	migrations:{
		directory:path.resolve(__dirname,'src','database','migrations')
	},
	seeds:{
		directory:path.resolve(__dirname,'src','database','seeds')
	},
	useNullAsDefault:true
}



module.exports={
	development:{
		client:'pg',
		debug:true,
		connection:dev,
		migrations:{
			directory:path.resolve(__dirname,'src','database','migrations')
		},
		seeds:{
			directory:path.resolve(__dirname,'src','database','seeds')
		},
		useNullAsDefault:true
	},
	production:{
		client:'pg',
		debug:true,
		connection:{
			connectionString:process.env.DATABASE_URL,
			ssl:{ rejectUnauthorized: false }
		},
		migrations:{
			directory:path.resolve(__dirname,'src','database','migrations')
		},
		seeds:{
			directory:path.resolve(__dirname,'src','database','seeds')
		},
		useNullAsDefault:true
	}
};