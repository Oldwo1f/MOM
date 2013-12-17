module.exports = function (db, DataTypes) {

	var setting = db.define('setting', {
		
			
				option: DataTypes.STRING,
			
				value: DataTypes.STRING,
			
		
	});
	return setting;
}