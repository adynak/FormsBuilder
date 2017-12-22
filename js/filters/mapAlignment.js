formsBuilder.filter('mapAlignment', function() {
  var alignmentHash = {
        Left: 'Left',
        Right: 'Right',
        Overlay: 'Overlay'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return alignmentHash[input];
    }
  };
  
});