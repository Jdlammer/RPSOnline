	function displayGraphExample(id, width, height, interpolation, animate, updateDelay, transitionDelay) {
		// create an SVG element inside the #graph div that fills 100% of the div
		var graph = d3.select(id).append("svg:svg").attr("width", "100%").attr("height", "100%");
 
		// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
		//var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];
                 var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,6,8,11,13,19,26,41,52,68,72,76,78,79,81,110,161,210,289,429,424,416,356,349,270,270,447,437,665,645,471,339,287,319,390,369,335,322,321,284,292,288,349,384,403,490,590,1071,1503,1002,820,894,784,774,765,651,690,785,742,780,738,951,829,610,579,495,467,556,698,801,779,1061,1050,715,982,1016,952,919,744,602,482,368,389,437,455,426,355,350,327,274,279,289,373,383,326,226,147,89,53,46,31,12,6,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
 
		// X scale will fit values from 0-10 within pixels 0-100
		var x = d3.scale.linear().domain([0, 1500]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
		// Y scale will fit values from 0-10 within pixels 0-100
		//var y = d3.scale.linear().domain([0, 10]).range([0, height]);
		var y = d3.scale.linear().domain([0,1250]).range([5, height]);
 
		// create a line object that represents the SVN line we're creating
		var line = d3.svg.line()
			// assign the X function to plot our line as we wish
			.x(function(d,i) { 
				// verbose logging to show what's actually being done
				//console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
				// return the X coordinate where we want to plot this datapoint
				return x(i); 
			})
			.y(function(d) { 
				// verbose logging to show what's actually being done
				//console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
				// return the Y coordinate where we want to plot this datapoint
				return y(d); 
			})
			.interpolate(interpolation)
	
			// display the line by appending an svg:path element with the data line we created above
			graph.append("svg:path").attr("d", line(data));
			// or it can be done like this
			//graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);
			
			
			function redrawWithAnimation() {
				// update with animation
				graph.selectAll("path")
					.data([data]) // set the new data
					.attr("transform", "translate(" + x(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
					.attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
					.transition() // start a transition to bring the new value into view
					.ease("linear")
					.duration(transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
					.attr("transform", "translate(" + x(0) + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value
					
			}
			
			function redrawWithoutAnimation() {
				// static update without animation
				graph.selectAll("path")
					.data([data]) // set the new data
					.attr("d", line); // apply the new data values
			}
			
			setInterval(function() {
			   var v = data.shift(); // remove the first element of the array
			   data.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
			   if(animate) {
				   redrawWithAnimation();
			   } else {
			   	   redrawWithoutAnimation();
			   }
			}, updateDelay);
		}
		
		displayGraphExample("#graph6", 300, 30, "basis", false, 10000, 10000);		
