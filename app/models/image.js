module.exports = function (db, DataTypes) {

	var image = db.define('image', {
		
			
				name: DataTypes.STRING,
			
				nom: DataTypes.STRING,
			
				url: DataTypes.STRING,

				title: DataTypes.STRING,

				mainSlider: DataTypes.BOOLEAN,
			
		
	});
	return image;
}