module.exports = function (db, DataTypes) {

	var livredor = db.define('livredor', {
		
			
				content: DataTypes.TEXT,
			
				author: DataTypes.STRING,
			
				published: DataTypes.BOOLEAN,
			
		
	});
	return livredor;
}