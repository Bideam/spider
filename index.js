var request=require('request'),
	cheerio=require('cheerio'),
	debug=require('debug')('app:main'),
	async=require('async');
exports.acfun=function(callback){
	debug('开始爬取AcFun视频');
	request('http://www.acfun.tv/rank/',function (err,res) {
		if (err) {
			return callback(err,null);
		}
		var $=cheerio.load(res.body.toString());
		var classlist=[];
		$('#mainer #block').each(function(){
			var $this=$(this);
			for (var i = 0; i <=11; i++) {
				var temclass='#unit-rank-'+i;
				var kind =$this.find(temclass+' .banner p').text().trim();
				var urlh=$this.find(temclass+' .banner a').attr('href');
				var kind_url=[kind,urlh];

				var videos=[];
				for (var j = 0; j <=9 ; j++) {
				var name=[],name_url=[];
					var temlist='.item-rank-'+j
					if (j<=2) {
						name[j]=j+""+$this.find(temclass+' .mainer '+temlist+' .d a').text().trim();
						name_url[j]=$this.find(temclass+' .mainer '+temlist+' .d a').attr('href');
					}else{
						name[j]=$this.find(temclass+' .mainer '+temlist+' a').text().trim();
						name_url[j]=$this.find(temclass+' .mainer '+temlist+' a').attr('href');
					}
					
					var subitem={
						title:name[j],
						title_url:name_url[j]
					}
					videos.push(subitem);
				}

					
				var item={
					kind: kind_url[0],
					url: kind_url[1],
					video:videos
				}
				classlist.push(item);
			}
			
		});
		callback(null,classlist)

	});

}

exports.youku=function(callback){
	debug('开始爬取优酷视频');
	request('http://list.youku.com/category/video/',function(err,res){
		if (err) {
			return callback(err,null);
		}

		var classlist=[];
		var $=cheerio.load(res.body.toString());
		var j=1;
		$('.s-body .yk-content .yk-col4').each(function(){
			var $this=$(this);
			var title=j+"."+$this.find('.yk-pack ul li a').text().trim();
			var urlb=$this.find('.yk-pack ul li a').attr('href');
			var pic=$this.find('.yk-pack .p-thumb img').attr('src');
			var item={
				title:title,
				url:urlb,
				cover:pic
			}

			classlist.push(item);
			j++;
		});

		callback(null,classlist);
	});
}

exports.tudou=function(callback){
	debug('开始爬取土豆视频');
	request('http://www.tudou.com/list/ixch0a-2b-2c-2d-2e-2f-2g-2h-2i-2j-2k-2l-2m-2n-2sort1.html',function(err,res){
		if (err) {
			return callback(err,null);
		}
		var $=cheerio.load(res.body.toString());
		var classlist=[];
		var j=1;
		$('#dataList .pack').each(function(){
			var $this=$(this);
			var title=$this.find('.txt a').text().trim();
			var urlb=$this.find('.txt a').attr('href');
			var pic=$this.find('.pic img').attr('src');
			var item={
				title:j+"."+title,
				url:urlb,
				cover:pic
			}
			j++;
			classlist.push(item);
		});
		callback(null,classlist);

	});
}



