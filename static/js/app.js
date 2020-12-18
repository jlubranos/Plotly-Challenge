/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */
var metadata=[];
var names=[];
var samples=[];
// Define a function that will create metadata for given sample
function buildMetadata(sample) {

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
        dataset.samples.forEach((sample) => {
            var row=samplelist.append("option");
            row.text(sample.id);
            samples.push(sample);
        });
        dataset.metadata.forEach((meta) => {
            metadata.push(meta);
            console.log("Length: ",metadata.length);
        });
        dataset.names.forEach((name) => {
            names.push(name);
        });
    });
    console.log("Metadata:",metadata);
    var demoinfo=d3.select("#sample-metadata");
    Object.entries(metadata).forEach(([key,value]) => {
        var row=demoinfo.append("h4");
        row.text(key," ",string(value));
    });
        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots
}

function optionChanged(newSample){

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();
