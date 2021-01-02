# Plotly-Challenge

![gauge](images/gauge.gif)

## How many times do you wash your bellybutton?
# Belly Button Biodiversity Dashboard

## Introduction

> An interactive dashboard utilizing Plotly library to explore the Belly Button Biodiversity
dataset, which catalogs the microbes that colonize human navels.

## Code Samples

> This challenge is run by four routines:
* init() - first routine run when program is run. Initializes all metadata options available in the .json file supplied and intializes all graphs to the value of the first metadata option.

* optionChanged(newSample) - this function is called as soon as the user selects a new metadata..(i.e. newSample) which then calls buildMetadata(newSample) and buildCharts(newSample) and updates the dashboard using the information contained for newSample.

* buildMetadata(newSample) - updates the metadata information according the the newSample supplied.

* buildCharts(newSample) - updates all charts on the dashboard based on the newSample supplied. (barchart, bubblechart, and gauge)




## Installation

> Goto Plotly-Challenge folder and run index.html.