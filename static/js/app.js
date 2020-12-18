/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */
// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    console.log("In Meta: ",sample);
    var pbody=d3.select("#sample-metadata");
    var panelRows=pbody.selectAll("h4");
    panelRows.remove();
    d3.json("samples.json").then(function(dataset) {
        var metadata=dataset.metadata.filter(meta=>String(meta.id)===String(sample));
        var demoinfo=d3.select("#sample-metadata");
        Object.entries(metadata[0]).forEach(([key,value]) => {
            var row=demoinfo.append("h4");
            row.text(key+": "+String(value));
        });
    });
    // Read the json data

        // Parse and filter the data to get the sample's metadata

        // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location

        // Create bubble chart in correct location
    
}

// Define function that will run on page load
function init() {

    // Read json data
    var samplelist=d3.select("#selDataset");
    d3.json("samples.json").then(function(dataset) {
        dataset.names.forEach((name) => {
            var row=samplelist.append("option");
            row.text(name);
        });
        buildMetadata(dataset.names[0]);
    });
        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots
}

function optionChanged(newSample){

    console.log("newSample:",newSample);
    buildMetadata(newSample);
    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();
