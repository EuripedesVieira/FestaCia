import path from 'path';

module.exports={
	development:{
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