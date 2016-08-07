// The function gets called when the window is fully loaded
window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
 
    // Define the image dimensions
    var width = canvas.width;
    var height = canvas.height;
 
    // Create an ImageData object
    var imagedata = context.createImageData(width, height);
    
    //----Data-----------------------------------
    var MaxRadius = 30;
    var MinRadius = 10;
    
    var seeds = [];
    //-------------------------------------------
    function setPixel(pixelindex, r,g,b,a){
        imagedata.data[pixelindex] = r; // Red
        imagedata.data[pixelindex+1] = g;  // Green
        imagedata.data[pixelindex+2] = b;  // Blue
        imagedata.data[pixelindex+3] = 255;   // Alpha
    }
    // Create the image
    function createImage() {
         var r = 255;
         var g = 255;
         var b = 255;
        
        // Loop over all of the pixels
        for (var x=0; x<width; x++) {
            for (var y=0; y<height; y++) {
                // Get the pixel index
                var pixelindex = (y * width + x) * 4;         
                    
                for (var w = 0; w <seeds.length; w++){
                    var seed = seeds[w];
                    var dist = Math.sqrt((x-seed.posx)*(x-seed.posx) + (y-seed.posy)*(y-seed.posy));                       
                    
                    if (dist <= seed.r){
                        var factor = dist/seed.r;
                        r = 255*factor;
                        g = 255*factor;
                        b = 255*factor;
                        
                        // Set the pixel data
                        setPixel(pixelindex, r,g,b,255);                        
                    }                  
                }
            }
        }
    }
    
    function clearImage() {        
        // Loop over all of the pixels
        for (var x=0; x<width; x++) {
            for (var y=0; y<height; y++) {
                // Get the pixel index
                var pixelindex = (y * width + x) * 4;         
                // Set the pixel data
                 setPixel(pixelindex, 255,255,255,255);                 
            }
        }
    }
    
    
    function generateSamples(amount, type){
        seeds.length = 0;
        //Random
        if (type == 'RANDOM'){
            for( var i=0; i<amount; i++){
               var x =  Math.floor(Math.random()*width);
               var y =  Math.floor(Math.random()*height);   

               // Get the pixel index
                var pixelindex = (y * width + x) * 4;
                var radius = MinRadius + Math.floor(Math.random()*(MaxRadius - MinRadius));

                var seed = {
                    posx:x,
                    posy:y,
                    r:radius
                }            
                seeds.push(seed);            
            }
        }
        
        //Grid
        if (type == 'GRID'){
            var sqrAmount = Math.floor(Math.sqrt(amount));
             for( var i=0; i<sqrAmount; i++){
                 for(var j = 0; j < sqrAmount; j++){
                    var x =  i*width/sqrAmount; //Math.floor(Math.random()*width);
                    var y =  j*height/sqrAmount; //Math.floor(Math.random()*height);   

                    // Get the pixel index
                    var pixelindex = (y * width + x) * 4;
                    var radius = MinRadius + Math.floor(Math.random()*(MaxRadius - MinRadius));

                    var seed = {
                        posx:x,
                        posy:y,
                        r:radius
                    }            
                    seeds.push(seed);    
                 }
            }
        }
    }
 
    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);
        context.clearRect(0, 0, canvas.width, canvas.height);       
        
        clearImage();
        generateSamples(100, 'RANDOM');       
        
        // Create the image
        createImage();
 
        // Draw the image data to the canvas
        context.putImageData(imagedata, 0, 0);
    }
 
    // Call the main loop
    main(0);
};