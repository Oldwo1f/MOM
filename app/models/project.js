module.exports = function (db, DataTypes) {

	var project = db.define('project', {
		
			
				name: DataTypes.STRING,
			
				description: DataTypes.TEXT,
			
		
	});
	return project;
}