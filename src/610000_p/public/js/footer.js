document.writeln("<style>");
document.writeln(
  ".footer{height: 262px; background: #d5dfe1;text-align: center;padding-top: 0px!important;}"
);
document.writeln(".footer .foot-item{height: 230px;padding-top: 25px; }");
document.writeln(
  ".footer .foot-item img{margin-top: 40px; margin-right: 15px}"
);
document.writeln(".web-link {color: #3988cb}");
document.writeln(".form-group{margin: 15px -15px}");
document.writeln(
  ".form-btn{position: absolute;right: 25px;top: 0;width: 10px;height: 35px;}"
);
document.writeln(".form-click{background: #fff;border: 0;border-radius: 20px}");
document.writeln(".foot-item p{line-height: 30px;color: #000}");
document.writeln("");
document.writeln(".web-info{font-size: 16px }");
document.writeln(".web-info img{margin-top: -4px}");
document.writeln("");
document.writeln(
  ".foot-item-left a:first-child{display: inline-block;width: 50%;text-align: right;}"
);
document.writeln(
  ".foot-item-left a:last-child{display: inline-block;width: 30%;text-align: center;}"
);
document.writeln(".foot-item-right{margin-left: -6%}");
document.writeln("</style>");

document.writeln("	<div class='footer' style='padding-top:20px;'> ");
document.writeln("					<div class='wrapper row'>");
document.writeln(
  "							<div class='col-sm-4 foot-item foot-item foot-item-left' style='margin-left:-80px'>"
);
document.writeln(
  "									<a href='http://121.43.68.40/exposure/jiucuo.html?site_code=1200000052&url=file%3A%2F%2F%2FC%3A%2FUsers%2Fzhangdan%2FDesktop%2Ftj_twfw%2Findex%2Findex.html'><img src='./resources/images/tianjing/footer-1.png'/></a>"
);
// document.writeln("									 <a><script id=\'_jiucuo_\' sitecode=\'1200000052\' src=\'../js/jiucuo.js\'></script></a>");
document.writeln(
  "									 <a  href='http://bszs.conac.cn/sitename?method=show&id=07CED2186D834F87E053012819AC2D23'><img style='margin-top:20px'  src='./resources/images/tianjing/foot-img.png' width='60px'/></a>"
);
document.writeln("							</div>");
document.writeln("							<div class='col-sm-8 foot-item foot-item foot-item-right'>");
document.writeln("									<div class='web-link '>");
document.writeln(
  "											<a onclick='setHome(this, window.location)'>把本站设成首页</a>"
);
document.writeln("											|");
document.writeln("											<a href='../page/introduce.html'>关于天津网上办事大厅</a>");
document.writeln("											|");
document.writeln("											<a href='../page/statement.html'>本站声明</a>");
document.writeln("											|");
document.writeln("											<a href='../page/guide.html'>新人指南</a>");
document.writeln("											|");
document.writeln("											<a href='../page/contact.html'>联系我们</a>");
document.writeln("									</div>");
document.writeln("									<div class='form-group clearfix'>");
document.writeln("											<div class='col-sm-4'>");
document.writeln(
  "												<select id='se1' name='select' class='form-control form-click' onchange='funtothree1(this.options[this.options.selectedIndex].value)'>"
);
document.writeln(
  "													<option value ='中央驻津单位链接' disabled='disabled' selected='selected'>中央驻津单位链接</option>"
);
document.writeln(
  "														<option value='http://www.tjqx.gov.cn'>天津市气象局</option>"
);
document.writeln(
  "														<option value='http://www.eq-tj.ac.cn/'>天津市地震局</option>"
);
document.writeln(
  "														<option value='http://tj.spb.gov.cn/'>天津市邮政管理局</option>"
);
document.writeln(
  "														<option value='http://www.tjsat.gov.cn'>天津市国税局</option>"
);
document.writeln(
  "														<option value='http://tianjin.customs.gov.cn/'>天津海关</option>"
);
document.writeln(
  "														<option value='http://tianjin.pbc.gov.cn/'>中国人民银行天津分行</option>"
);
document.writeln(
  "														<option value='http://www.safe.gov.cn/'>天津外汇管理局</option>"
);
document.writeln(
  "														<option value='http://www.cbrc.gov.cn/sj/tianjin/index.html'>中国银行业监督管理委员会天津监管局</option>"
);
document.writeln(
  "														<option value='http://www.circ.gov.cn/web/site35/tab2028/'>中国保险监督管理委员会天津监管局</option>"
);
document.writeln(
  "														<option value='http://www.csrc.gov.cn/pub/tianjin/'>中国证券监督管理委员会天津监管局</option>"
);
document.writeln(
  "														<option value='http://www.tjmsa.gov.cn/'>天津海事局</option>"
);
document.writeln(
  "														<option value='http://www.tjtobacco.cn/serviceweb/'>天津市烟草专卖局</option>"
);
document.writeln(
  "														<option value='http://www.tjca.gov.cn/'>天津市通信管理局</option>"
);
document.writeln("											 </select>");
document.writeln("											</div>");
document.writeln("											<div class='col-sm-4'>");
document.writeln(
  "													 <select id='se' name='select' class='form-control form-click' onchange='funtothree(this.options[this.options.selectedIndex].value)'>"
);
document.writeln(
  "						 		            	<option  value ='省级政务服务中心' disabled='disabled' selected='selected'>省级政务服务中心</option>"
);
document.writeln(
  "															<option  value='http://banshi.beijing.gov.cn/'>北京市</option>"
);
document.writeln(
  "															<option  value='http://www.shanghai.gov.cn/'>上海市</option>"
);
document.writeln("															<option  value='http://www.hbzwfw.gov.cn/'>河北省</option>");
document.writeln("															<option  value='http://www.sxzwfw.gov.cn/'>山西省</option>");
document.writeln("															<option  value='http://zwfw.nmg.gov.cn/'>内蒙古</option>");
document.writeln("															<option  value='http://www.lnzwfw.gov.cn/'>辽宁省</option>");
document.writeln("															<option  value='http://www.jlzwfw.gov.cn'>吉林省</option>");
document.writeln(
  "															<option  value='http://www.hljzwzx.gov.cn/'>黑龙江</option>                                        "
);
document.writeln(
  "															<option  value='http://www.jszwfw.gov.cn/'>江苏省</option>                                        "
);
document.writeln(
  "															<option  value='http://www.zjzwfw.gov.cn/'>浙江省</option>                                        "
);
document.writeln(
  "															<option  value='https://www.ahzwfw.gov.cn/'>安徽省</option>                                       "
);
document.writeln(
  "															<option  value='http://www.fjbs.gov.cn/'>福建省</option>                                        "
);
document.writeln(
  "															<option  value='http://www.jxzwfww.gov.cn/'>江西省</option>                                        "
);
document.writeln(
  "															<option  value='http://zwfw.shandong.gov.cn/'>山东省</option>                                        "
);
document.writeln(
  "															<option  value='http://www.hnzwfw.gov.cn/'>河南省</option>                                         "
);
document.writeln(
  "															<option  value='http://zwfw.hubei.gov.cn/ '>湖北省</option>                                        "
);
document.writeln(
  "															<option  value='http://wsbs.hunan.gov.cn/virtualhall/index.jsp'>湖南省</option>                                        "
);
document.writeln(
  "															<option  value='http://www.gdbs.gov.cn/portal/home;jsessionid=qqTdYWNDPXsY1xP0TGlRP60d4QRxTdvjGQg2Mr5Y2YGp9trQ6Q10!1'>广东省</option>                                       "
);
document.writeln(
  "															<option  value='http://221.7.197.46/'>广西省</option>                                        "
);
document.writeln(
  "															<option  value='http://www.hizw.gov.cn/'>海南省</option>                                        "
);
document.writeln(
  "															<option  value='http://zwfw.cq.gov.cn/icity/public/index'>重庆市</option>                                        "
);
document.writeln(
  "															<option  value='http://www.spprec.com/sczwweb/'>四川省</option>"
);
document.writeln("															<option  value='http://www.gzegn.gov.cn/'>贵州省</option>");
document.writeln("															<option  value=' http://ynzwfw.yn.gov.cn/'>云南省</option>");
document.writeln(
  "															<option  value='http://www.xizang.gov.cn/zwfw/'>西藏</option>"
);
document.writeln(
  "															<option  value='http://zwfw.shaanxi.gov.cn/'>陕西省</option>"
);
document.writeln("															<option  value='http://www.gszwfw.gov.cn/'>甘肃省</option>");
document.writeln("															<option  value='http://www.qhzwfw.gov.cn/'>青海省</option>");
document.writeln("															<option  value='http://zwfw.nx.gov.cn/'>宁夏</option>");
document.writeln("															<option  value='http://zwfw.xinjiang.gov.cn/'>新疆</option>");
document.writeln(
  "															<option  value='https://www.gov.hk/tc/residents/onlineservices/'>香港</option>"
);
document.writeln(
  "															<option  value='http://portal.gov.mo/web/guest/welcomepage'>澳门</option>"
);
document.writeln(
  "															<option  value='http://www.xjbt.gov.cn/bs/xzspdt/'>新疆建设兵团</option>"
);
document.writeln("												 </select>");
document.writeln("											</div>");
document.writeln("											<div class='col-sm-4'>");
document.writeln(
  "											 <select id='se2' name='select' class='form-control form-click' onchange='funtothree2(this.options[this.options.selectedIndex].value)'>"
);
document.writeln(
  "													<option value ='行政审批基本信息共享' disabled='disabled' selected='selected'>行政审批基本信息共享</option>"
);
document.writeln(
  "														<option value='http://www.gsxt.gov.cn/'>国家企业信用信息公示系统</option>"
);
document.writeln("														<option value='http://gjsy.gov.cn/'>事业单位在线网</option>");
document.writeln(
  "														<option value='http://www.chinanpo.gov.cn/index.html'>中国社会组织网</option>"
);
document.writeln("											 </select>");
document.writeln("											</div>");
document.writeln("									</div>");
document.writeln(
  "									<p>主办单位：天津市人民政府办公厅 承办单位：天津市人民政府政务服务办公室</p>"
);
document.writeln(
  "									<p>政府网站标识码：1200000052 津ICP备05010518号  津公网安备 ：12010302000991号</p>"
);
document.writeln(
  "									<p>技术支持电话：022-24538244 政务投诉电话：022-88908890</p>"
);
document.writeln("									<p>地址：天津市河东区红星路79号 邮政编码：300161</p>");
document.write('		<p  href="http://zwfw.tj.gov.cn/tj_twfw/page/index.htm">');
// document.write("网站访问次数:");
// document.write("			<img style='margin-top:-10px' border=\"0\" src=\"http:\/\/cc.amazingcounters.com\/counter.php?i=3243081&c=9729556\"");
// document.write("				alt=\"AmazingCounters.com\"><\/p>");
document.writeln("							</div>");
document.writeln("					</div>");
document.writeln("			</div>");

document.writeln("<script>");
document.writeln("function funtothree(v){");
document.writeln("$('#se').val('省级政务服务中心')");
document.writeln("	window.open(v)");
document.writeln("}");
document.writeln("function funtothree1(v){");
document.writeln("$('#se1').val('中央驻津单位链接')");
document.writeln("	window.open(v)");
document.writeln("}");
document.writeln("function funtothree2(v){");
document.writeln("$('#se2').val('行政审批基本信息共享')");
document.writeln("	window.open(v)");
document.writeln("}");
document.writeln("</script>");

function setHome(obj, url) {
  try {
    obj.style.behavior = "url(#default#homepage)";
    obj.setHomePage(url);
  } catch (e) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege(
          "UniversalXPConnect"
        );
      } catch (e) {
        alert(
          "抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'"
        );
      }
    } else {
      alert(
        "抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" +
          url +
          "】设置为首页。"
      );
    }
  }
}
