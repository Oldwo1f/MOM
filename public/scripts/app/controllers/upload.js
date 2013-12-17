 app.controller('uploadCtrl',[ '$scope', '$http', '$timeout', '$upload',
                       function($scope, $http, $timeout, $upload) {
      $scope.uploadRightAway = true;
      
      $scope.hasUploader = function(index) {
        return $scope.upload[index] != null;
      };
      $scope.abort = function(index) {
        $scope.upload[index].abort(); 
        $scope.upload[index] = null;
      };
      $scope.onFileSelect = function($files) {
        $scope.selectedFiles = [];
        $scope.progress = [];
        if ($scope.upload && $scope.upload.length > 0) {
          for (var i = 0; i < $scope.upload.length; i++) {
            if ($scope.upload[i] != null) {
              $scope.upload[i].abort();
            }
          }
        }
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];
        for ( var i = 0; i < $files.length; i++) {
          var $file = $files[i];
          if (window.FileReader && $file.type.indexOf('image') > -1) {
              var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                function setPreview(fileReader, index) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                          $scope.dataUrls[index] = e.target.result;
                        });
                    }
                }
                setPreview(fileReader, i);
          }
          $scope.progress[i] = -1;
          if ($scope.uploadRightAway) {
            $scope.start(i);
          }
        }
      }
      
      $scope.start = function(index) {
        console.log('start'); 
        $scope.progress[index] = 0;
        $scope.upload[index] = $upload.upload({
          url : 'upload/image',
          index:  index,
          file: $scope.selectedFiles[index],
          fileFormDataName: 'myFile'
        }).then(function(response) {
            //FIN dupload
            console.log($scope.selectedFiles[index]);
            $timeout(function(){
                $scope.selectedFiles[index].hide = true;
            }, 5000);
            
            console.log('Fin dupload');
            console.log(response); 
            if(response.data=="notImg")
            {
              $scope.selectedFiles[index]['error']='Ce fichier n\'est pas une image';
            }else if(response.data=="exist")
            {
              $scope.selectedFiles[index]['error']='Impossible d\'ajouter deux images de même nom.';
            }else
            if(typeof(response.data)=='object')
            {
              console.log('cool');

              $scope.images.unshift(response.data);
            }
            

        }, null, function(evt) {
          $scope.progress[index] = parseInt(100.0 * evt.loaded / evt.total);
        });
      }
    } ]);
























  // ['$scope','projectsApi','filterFilter','$timeout','$upload',
// function uploadCtrl($scope, projectsApi, filterFilter, $timeout,$upload) {
//   $scope.sendingFiles = [];
//   $scope.dataUrls = [];
//   $scope.upload = [];
//   $scope.uploadResult = [];
//  //  $scope.sendingFiles[0]={name:"yodaaaa"};
// 	// $scope.sendingFiles[1]={name:"top"};
//   $scope.$watch('sendingFiles',function  () {
  


//   },true);


//   $scope.hasUploader = function(index) {
//     return $scope.upload[index] != null;
//   };
//   $scope.abort = function(index) {
//     $scope.upload[index].abort(); 
//     $scope.upload[index] = null;
//   };

// 	$scope.onFileSelect = function($files) {
//     //$files: an array of files selected, each file has name, size, and type.
//     for (var i = 0; i < $files.length; i++) {
//       $scope.sendingFiles.push($files[i])
//       var $file = $files[i];
//       $scope.upload = $upload.upload({
//         url: 'upload/image', //upload.php script, node.js route, or servlet url
//         // method: 'POST' ,
//         // headers: {'headerKey': 'headerValue'}, withCredential: true,
//         data: {myObj: 'cool'},
//         file: $file,
//         /* set file formData name for 'Content-Desposition' header. Default: 'file' */
//         //fileFormDataName: myFile,
//         /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
//         //formDataAppender: function(formData, key, val){} 
//       }).progress(function(evt) {
//       	console.log('progress'); 
//         console.log(evt); 
//         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//       }).success(function(data, status, headers, config) {
//         // file is uploaded successfully
//         console.log('uploaded'); 
//         // console.log(data);
//       });
//       //.error(...)
//       //.then(success, error, progress); 
//     }
//     console.log($scope.sendingFiles); 
//   };

// }]);