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
//**********************轨迹显示函数*********************************************************************************//
           var trackVisual=document.getElementById("trackvisual");
           trackVisual.onclick=trackvisual;
           var Datatable=document.getElementById("DataTable");
           Datatable.onclick=DataTable;
           var kongshilv=document.getElementById("kongshilv");
           
           Data=null;
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
           	Data=null;
           	$.ajax({
           		url:"info.do",
           		data:{"start_data":start_data},
           		type:"GET",
           		//datatype表示的是返回的数据格式
           		dataType:"json",
           		success:function(data){
           			//arcgis显示图形函数
           			trackDraw(data);
           			Data=data;
           		}
           	})
           };
           function DataTable(){
        	   var dom = document.getElementById("container");
        	   var myChart = echarts.init(dom);
        	   var app = {};
        	   option = null;
        	   time=[] ;
        	   Speed=[];
        	   status_taxi=[];
        	   var n=0;
        	   for(var j=0;j<Data.length;j++){
        	       Speed[j]=Data[j].speed;
        	   }
        	   for( var i=0;i<Data.length;i++){
        	       time[i] = Data[i].time;
        	   }
        	   for(var i=0;i<Data.length;i++){
        		   if(Data[i].status=="空车"){
        			   status_taxi[i]= -20 ;
        			   n++;
        		   }
        		   else{
        			   status_taxi[i]= -10 ;
        		   }
        	   }
        	   kongshilv.value=(n/Data.length*100).toFixed(0) + '%';
        	   option = {
        	       tooltip: {
        	           trigger: 'axis'
        	       },
        	       title: {
        	           left: 'center',
        	           text: '出租车行驶数据',
        	       },
        	       toolbox: {
        	           feature: {
        	               dataZoom: {
        	                   yAxisIndex: 'none'
        	               },
        	               restore: {},
        	               saveAsImage: {}
        	           }
        	       },
        	       xAxis: {
        	           type: 'category',
        	           boundaryGap: false,
        	           data: time
        	       },
        	       yAxis: {
        	           type: 'value',
        	           boundaryGap: [0, '100%'],
        	           axisLabel: {
        	           	            formatter: '{value} Km/h'
        	           	        }
        	       },
        	       dataZoom: [
        	    	   {
	        	           type: 'inside',
	        	           xAxisIndex:[0],
	        	           start: 0,
	        	           end: 10
        	    	   				},
		   				{
		   		            type: 'slider',
		   		            show: true,
		   		            xAxisIndex: [0],
		   		            start: 0,
		   		            end: 10
		   		        },
        	    	 {
        	           start: 0,
        	           end: 10,
        	           handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        	           handleSize: '80%',
        	           handleStyle: {
        	               color: '#fff',
        	               shadowBlur: 3,
        	               shadowColor: 'rgba(0, 0, 0, 0.2)',
        	               shadowOffsetX: 2,
        	               shadowOffsetY: 2
        	           	}
        	    	 }
        	    	   				],
        	       series: [
        	           {
        	               name:'车速',
        	               type:'line',
        	               smooth:true,
        	               symbol: 'none',
        	               sampling: 'average',
        	               itemStyle: {
        	                   normal: {
        	                       color: 'rgb(255, 70, 131)'
        	                   }
        	               },
        	               areaStyle: {
        	                   normal: {
        	                       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        	                           offset: 0,
        	                           color: 'rgb(255, 158, 68)'
        	                       }, {
        	                           offset: 1,
        	                           color: 'rgb(255, 70, 131)'
        	                       }])
        	                   }
        	               },
        	               data: Speed
        	           },
        	           {
        	        	   name:'载客状态',
        	        	   type:'line',
        	        	   smooth:false,
        	        	   symbol:'none',
        	        	   sampling:'average',
        	        	   itemStyle:{
        	        		   normal: {
        	                       color: 'rgb(0, 0, 255)'
        	                   }
        	        	   },areaStyle: {
        	                   normal: {
        	                       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        	                           offset: 0,
        	                           color: 'rgb(0, 191, 255)'
        	                       }, {
        	                           offset: 1,
        	                           color: 'rgb(65, 105, 255)'
        	                       }])
        	                   }
        	               },
        	               data:status_taxi
        	           }
        	       ]
        	   };
        	   ;
        	   if (option && typeof option === "object") {
        	       myChart.setOption(option, true);
        	   }
           }
//**************************************************************************************************//
        
});