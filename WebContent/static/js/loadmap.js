 require([
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/widgets/Sketch/SketchViewModel",
      	"esri/layers/GraphicsLayer",
        "dojo/domReady!"
        ], function(Map,MapView,Graphic,Point,SketchViewModel,GraphicsLayer){
        	var tempGraphicsLayer = new GraphicsLayer();
      		var updateGraphic;
         var map = new Map({
            basemap:"osm",
            layers: [tempGraphicsLayer]
          });
          var view=new MapView({
            map:map,
            container:"map",
            zoom:15,
            center:[121.1773281357, 31.8902227586],
            ui:{
            	components:["attribution"]
            }
          });
          //**********************************************//
          var pointSymbol = { // symbol used for points
			        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
			        style: "cricle",
			        color: "#8A2BE2",
			        size: "16px",
			        outline: { // autocasts as new SimpleLineSymbol()
			          color: [255, 255, 255],
			          width: 1 // points
			        }
			      }
           var polygonSymbol = { // symbol used for polygons
		        type: "simple-fill", // autocasts as new SimpleFillSymbol()
		        color: "rgba(138,43,226, 0.8)",
		        style: "solid",
		        outline: {
		          color: "white",
		          width: 1
		        }
		      }
          //**********************************************//
          var sketchViewModel = new SketchViewModel({
          view: view,
          layer: tempGraphicsLayer,
          polygonSymbol: polygonSymbol
        });
          setUpClickHandler();
         sketchViewModel.on("draw-complete", addGraphic);
        sketchViewModel.on("update-complete", addGraphic);
        sketchViewModel.on("update-cancel", addGraphic);

        function addGraphic(evt) {
          var geometry = evt.geometry;
          var symbol;
          switch (geometry.type) {
            case "point":
              symbol = pointSymbol;
              break;
            default:
              symbol = polygonSymbol;
              break;
          }
          // Create a new graphic; add it to the GraphicsLayer
          var graphic = new Graphic({
            geometry: geometry,
            symbol: symbol
          });
          tempGraphicsLayer.add(graphic);
          // Remove stored reference to the updated graphic
          // Required in 'update-complete' callback specifically
          updateGraphic = null;
        }

          //*************************************************//
          //点击添加事件
           var tianjia=document.getElementById("dian");
           tianjia.onclick=function(){
           	sketchViewModel.create("point");
           }
           var mian=document.getElementById("mian");
           mian.onclick=function(){
           sketchViewModel.create("polygon");
           }
           //***********************************************//
          
           function setUpClickHandler() {
          view.on("click", function(evt) {
            view.hitTest(evt).then(function(response) {
              var results = response.results;
              // Found a valid graphic
              if (results.length && results[results.length - 1].graphic) {
                // Check if we're already editing a graphic
                if (!updateGraphic) {
                  // Save a reference to the graphic we intend to update
                  updateGraphic = results[results.length - 1].graphic;
                  // Remove the graphic from the GraphicsLayer
                  // Sketch will handle displaying the graphic while being updated
                  tempGraphicsLayer.remove(updateGraphic);
                  sketchViewModel.update(updateGraphic.geometry);
                }
              }
            });
          });
        }
           //**********************轨迹显示函数*************************//
           var trackVisual=document.getElementById("trackvisual");
           trackVisual.onclick=trackvisual;
           function trackDraw(data){
               var point;
               var markerSymbol={
                 type:"simple-marker",
                 color:[226,119,40],
                 outline:{
                   color:[225,225,225],
                   width:1
                 }
               };
               var pointGraphic;
               for(var i=0;i<data.length;i++){
                 point={
                   type:"point",
                   longitude:data[i].lon,
                   latitude:data[i].lat
                 };
                 pointGraphic=new Graphic({
                   geometry:point,
                   symbol:markerSymbol
                 });
                 view.graphics.add(pointGraphic);
               }
             }
           function trackvisual(){
           	var start_data=document.getElementById("start").value;
           	var end_data=document.getElementById("end").value;
           	$.ajax({
           		url:"info.do",
           		data:{"start_data":start_data},
           		type:"GET",
           		//datatype表示的是返回的数据格式
           		dataType:"json",
           		success:function(data){
           			//arcgis显示图形函数
           			trackDraw(data);
           		}
           	})
           };
           
           //***********************************************//
        
});