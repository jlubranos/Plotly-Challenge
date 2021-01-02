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

}

function buildCharts(newSample) {

// Read json file and filter based on parameter newSample.
// Collect all neccessary data to perform and process dashboard.

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

//restyle bar chart

        Plotly.restyle("bar","x",[Value10]);
        Plotly.restyle("bar","y",[Otu10]); 
        Plotly.restyle("bar","text",[Labels10]);

//restyle bubble chart

        Plotly.restyle("bubble","x",[Otus]);
        Plotly.restyle("bubble","y",[Values]);
        Plotly.restyle("bubble","text",[Labels]);
        Plotly.restyle("bubble","color",[Otus]);
        Plotly.restyle("bubble","size",[Values]);

//update gauge chart

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
}

function init() {

// Read json data and create id option list
    console.log("in init()");
    var samplelist=d3.select("#selDataset");
    d3.json("samples.json").then(function(dataset) {
        dataset.names.forEach((name) => {
            var row=samplelist.append("option");
            row.text(name);
        });
    console.log("read json");
// Initailize demographic info

        var initId=dataset.names[0];
        var initLabels=dataset.samples[0].otu_labels;
        var initOtu=dataset.samples[0].otu_ids;
        var initValues=dataset.samples[0].sample_values;

// Display demograpic info based on argument passed

        buildMetadata(initId);

        var initOtu10=initOtu.slice(0,10);
        var initValues10=initValues.slice(0,10);
        var initOtus10=initOtu10.map(otu=> "Otu "+otu);
        var initLabels10=initLabels.slice(0,10);

        initOtus10=initOtus10.reverse();
        initValues10=initValues10.sort(function(a,b){return a-b});
        initLabels10=initLabels10.reverse();

// Initailize Bar chart

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

// Initialize Bubble chart

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


// Gauge created by dividing graph into 9 equal sections for the top part of the pie.
// and one section for the bottom half of the pie which is not shown according the the
// colors designated for each section in the pie.

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

// Each number on the chart represents 20 degrees... 180 divided 9 sections of graph.
// Frequency then is calculated  with wfreq provided in dataset times 20 degress.
// Radians are calculated and then the sine and cosine values are calculated from that.
// These values are the end points of the needle to be drawn on the graph.

        var wfreq=dataset.metadata[0].wfreq;
        var degrees=wfreq*20;
        var radius=.3;
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
}

function optionChanged(newSample){

// if new option entered then run buildMetadata and buildCharts routines.

    buildMetadata(newSample);
    buildCharts(newSample);
}

// Initialize dashboard on page load
init();
