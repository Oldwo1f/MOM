module.exports = function (db, DataTypes) {

	var article = db.define('article', {
		
			
				title: DataTypes.TEXT,
			
				content: DataTypes.TEXT,
				urlFB: DataTypes.STRING,
			
		
	});
	return article;
}