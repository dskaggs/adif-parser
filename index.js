var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('log.adi'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    if( line.length > 0 ){
    	parseLine( line );
    } 
});

var parseLine = function( line ){
	var record = {};

	var fields = line.split('<');

	for( var i=0; i<fields.length; i++ ){
		var field = fields[i], 
		    fieldName = field.split(':')[0],
		    fieldValue = field.split('>')[1];

		if( fieldName.length && fieldName != 'EOR>' && fieldValue && fieldValue.length){
			fieldName = fieldName.trim().toLowerCase();
			fieldValue = fieldValue.trim();
			record[ fieldName ] = fieldValue;
		}
		
	}
	if( record.qso_date ){
		var qso_date = new Date( Date.UTC( record.qso_date.slice(0,4),
											   (record.qso_date.slice(4,6) - 1),
											   record.qso_date.slice(6,8),
											   record.time_on.slice(0,2),
											   record.time_on.slice(2,4),
											   record.time_on.slice(4)) );
		record.qso_date = qso_date;
		delete record[ 'time_on' ]
		delete record[ 'time_off' ]	
	}
		
	console.log( record );

}