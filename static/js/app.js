/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */
// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    var pbody=d3.select("#sample-metadata");
    var panelRows=pbody.selectAll("h5");
    panelRows.remove();
    d3.json("samples.json").then(function(dataset) {
        var metadata=dataset.metadata.filter(meta=>String(meta.id)===String(sample));
        var demoinfo=d3.select("#sample-metadata");
        Object.entries(metadata[0]).forEach(([key,value]) => {
            var row=demoinfo.append("h5");
            row.text(key+": "+String(value));
        });
    });
    // Read the json data

        // Parse and filter the data to get the sample's metadata

        // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(newSample) {
    // Read the json data
    d3.json("samples.json").then(function(dataset) {
        var chartData=dataset.samples.filter(sample=>String(sample.id)===String(newSample));
        var metaData=dataset.metadata.filter(sample=>String(sample.id)===String(newSample));
 
        var Otus=chartData[0].otu_ids;
        var Values=chartData[0].sample_values;
        var Labels=chartData[0].otu_labels;
        var wfreq=metaData[0].wfreq;

        var Otu10=Otus.slice(0,10);
        var Value10=Values.slice(0,10);
        var Labels10=Labels.slice(0,10);
        var Labels10=Labels10.reverse();  
        var Otu10=Otu10.map(otu=> "Otu "+otu);
        Value10=Value10.sort(function(a,b){return a-b});

        Plotly.restyle("bar","x",[Value10]);
        Plotly.restyle("bar","y",[Otu10]); 
        Plotly.restyle("bar","text",[Labels10]);
        
        Plotly.restyle("bubble","x",[Otus]);
        Plotly.restyle("bubble","y",[Values]);
        Plotly.restyle("bubble","text",[Labels]);
        Plotly.restyle("bubble","color",[Otus]);
        Plotly.restyle("bubble","size",[Values]);

        var degrees=wfreq*20;
        var radius=.3;
        var radians=degrees * (Math.PI/180);
        var x=-1*Math.cos(radians)*radius;
        var y=Math.sin(radians)*radius;
 
        var gaugeTrace = [{
            type:'pie',
            showlegend:false,
            hole:0.7,
            rotation:90,
            values:[81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81],
            text:['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            direction:'clockwise',
            textinfo:'text',
            textposition:'inside',
            marker: {
                colors:['DarkRed','DarkGoldenRod','GoldenRod','Gold','Yellow','GreenYellow','YellowGreen','ForestGreen','DarkGreen','white'],
                labels:['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                hoverinfo:'label'
            }
        }];
 
        var gaugeLayout = {
            shapes: [{
                type:'line',
                x0:.5,
                y0:.5,
                x1:x+.5,
                y1:y+.5,
                line: {
                    color:'black',
                    width:3
                }
            }],
        }        
        Plotly.update("gauge",gaugeTrace,gaugeLayout);
    });
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

        var initId=dataset.names[0];
        var initLabels=dataset.samples[0].otu_labels;
        var initOtu=dataset.samples[0].otu_ids;
        var initValues=dataset.samples[0].sample_values;

        buildMetadata(initId);

        var initOtu10=initOtu.slice(0,10);
        var initValues10=initValues.slice(0,10);
        var initOtus10=initOtu10.map(otu=> "Otu "+otu);
        var initLabels10=initLabels.slice(0,10);

        initOtus10=initOtus10.reverse();
        initValues10=initValues10.sort(function(a,b){return a-b});
        initLabels10=initLabels10.reverse();

        var trace = [{
            x:initValues10,
            y:initOtus10,
            text:initLabels10,
            type:"bar",
            orientation:'h'
        }];

        var layout = {
            xaxis:{
                showticklabels:true,
                showgrid:true
            },
            yaxis:{
                showticklabels:true,
                showgrid:true
            }
        };
        Plotly.newPlot("bar",trace,layout);

        var bubbleTrace = [{
            x:initOtu,
            y:initValues,
            text:initLabels,
            mode: 'markers',
            marker:{
                color:initOtu,
                size:initValues,
            }
        }];
        Plotly.newPlot('bubble',bubbleTrace);

        var gaugeTrace = [{
            type:'pie',
            showlegend:false,
            hole:0.7,
            rotation:90,
            values:[81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81],
            text:['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            direction:'clockwise',
            textinfo:'text',
            textposition:'inside',
            marker: {
                colors:['DarkRed','DarkGoldenRod','GoldenRod','Gold','Yellow','GreenYellow','YellowGreen','ForestGreen','DarkGreen','white'],
                labels:['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                hoverinfo:'label'
            }
        }];

//        var wfreq=dataset.metadata[0].wfreq;
        wfreq=2;
        var degrees=wfreq*20;
        var radius=.3;
//        var offset=(90-Math.abs(90-degrees))/90 * radius;
        var radians=degrees * (Math.PI/180);
        var x=-1*Math.cos(radians)*radius;
        var y=Math.sin(radians)*radius;
        var gaugeLayout = {
            shapes: [{
                type:'line',
                x0:.5,
                y0:.5,
                x1:x+.5,
                y1:y+.5,
                line: {
                    color:'black',
                    width:3
                }
            }],
        }
    
    Plotly.plot('gauge',gaugeTrace,gaugeLayout,{staticPlot:true});
    
    });


        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots
}

function optionChanged(newSample){

    buildMetadata(newSample);
    buildCharts(newSample);
    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();
