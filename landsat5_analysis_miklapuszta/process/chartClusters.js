// To plot mean backscatter values for each cluster to identify water classes

/* Args:
    image: original backscatter data (the input used for clustering)
    clusters: the resulting clusters from classification
    studyArea: the study area (an instance of ee.FeatureCollection class!)
 */
exports.plotClustersByReflectance = function (image, clusters, studyArea) {
  
  // Add the cluster band to the image
  var stats = image.addBands(clusters.select('cluster'));
  print(stats);

  // Calculate area of clusters
  var areaChart = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().addBands(clusters.select('cluster')),
    classBand: 'cluster', 
    region: studyArea,
    scale: 30,
    reducer: ee.Reducer.sum()
  });
  
  print(areaChart);
  
  // Make the chart, set the options.
  var chart = ui.Chart.image.byClass({
    image: stats,
    classBand: 'cluster',
    region: studyArea,
    scale: 30,
    reducer: ee.Reducer.mean()
  });

  // Print the chart.
  print(chart);
  
  return;
};
