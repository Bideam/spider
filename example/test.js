var app=require('./index');


	
app.tudou(function(err,result){
	if (err) {
		console.log(err);
	}
	for (var i = 0; i < result.length; i++) {
		console.log("第"+(i+1)+"条土豆视频名称："+result[i].title);
		console.log("第"+(i+1)+"条土豆视频链接："+result[i].url);
		console.log("第"+(i+1)+"条土豆视频封面图片地址："+result[i].cover);
	}

});

app.youku(function(err,result){
	if (err) {
		console.log(err);
	}
	for (var i = 0; i < result.length; i++) {
		console.log("第"+(i+1)+"条优酷视频名称："+result[i].title);
		console.log("第"+(i+1)+"条优酷视频链接："+result[i].url);
		console.log("第"+(i+1)+"条优酷视频封面图片地址："+result[i].cover);
	}

});

app.acfun(function(err,result){
	if (err) {
		console.log(err);
	}
	
	for (var i = 0; i < result.length; i++) {
		console.log("第"+(i+1)+"种AcFun分类："+result[i].kind);
		console.log("第"+(i+1)+"种AcFun分类链接："+result[i].url);
		for (var j = 0; j < result[i].video.length; j++) {
			console.log("第"+(i+1)+"种AcFun第"+(j+1)+"条视频名称："+result[i].video[j].title);
			console.log("第"+(i+1)+"种AcFun第"+(j+1)+"条视频链接地址："+result[i].video[j].title_url);
		}		
	}

});