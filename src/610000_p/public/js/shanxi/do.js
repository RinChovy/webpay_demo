var exBtn;
var exBtn1;
function getName(cName)  {
               if(document.getElementsByClassName) {
                      return document.getElementsByClassName(cName); 
              }
              else  {
                    var arr = [];
                     var all = document.getElementsByTagName('*');
                     for(var i=0;i<all.length;i++) {
                         var allName = all[i].className.split(' '); 
                         for(var j=0;j<allName.length;j++) {
                         if(allName[j] == cName) {
                               arr.push(all[i]);
                               break;
                         }
                    }                                                       
            }
          return arr;
      }  
 }

function clearban(){
	clearTimeout(exBtn);
	clearTimeout(exBtn1);
}
function banShow(i,j){
	clearTimeout(exBtn);
	clearTimeout(exBtn1);
	exBtn = setTimeout(function(){
		if((i == 9)||(i == 2)||(i == 5)||(i == 6)||(i == 15)||(i == 13)||(i == 14)||(i == 10)||(i == 1)||(i == 8)||(i == 7)||(i == 11)||(i == 16)||(i == 0)||(i == 4)||(i == 3)||(i == 12)){
			var oBan = document.getElementById("ban");
            var oBanA = document.getElementById("ban" +"_"+ i);
            
            if(oBanA==null||oBanA==""||oBanA==undefined){
            	oBan.style.display="none";
            }else{
            	var oBanc = document.getElementById("ban" +"_"+ i+"_"+ j);
            	if(oBanc==null||oBanc==""||oBanc==undefined){
	            	oBan.style.display="none";
	            }else{
	            	for(var k = 0; k < 17;k++){
		                var oBanB = document.getElementById("ban" +"_"+ k);
		                if(oBanB==null||oBanB==""||oBanB==undefined){
	            	
			            }else{
			            	oBanB.style.display="none";
			            }
		                
		            }
	            	oBan.style.display="block";
	            	oBanA.style.display="block";
	            }
            	
            }
            
		}
		var oBaner = getName("baner");
		for(var z = 0; z < oBaner.length;z++){
			oBaner[z].style.display="none";
		}
		var oJ = "ban_" + i + "_" + j;
		var oUl = document.getElementById(oJ);
		if(oUl==null||oUl==""||oUl==undefined){
        }else{
        	oUl.style.display = "block";
        }
	},0);
}
function banShow_xc(){
	var oXincheng=document.getElementById('zd_sx_xincheng');
	oXincheng.style.display='block';
}
function banHide(){
	clearTimeout(exBtn);
	clearTimeout(exBtn1);
	var oBan = document.getElementById("ban");
	oBan.style.display="none";
}
$(document).ready(function(){
	var oDs=document.getElementById('ds');
	var aBtn=oDs.getElementsByTagName('a');
	var oQx=document.getElementById('right_qx');
	var aDiv=oQx.getElementsByTagName('div');
	var oPc=document.getElementById('right_pc');
	var oXian=document.getElementById('zd_sx_xian');
	var oBan=document.getElementById('ban');
	var oShengpai=document.getElementById('zd_sx_shengpai');
	var oXincheng=document.getElementById('zd_sx_xincheng');
	var i=0;
	var oText1 = getName("text1");
	var oA = getName("baner");
	var oSheng = document.getElementById("sheng");
	var aBstn=document.getElementById("sheng_r_a");
	var title=$("#SxLink").attr('nameCode');
	if("sj"==title){
		aBstn.style.color='#6ac2ea';
	}
	
	for(i=0;i<aBtn.length;i++){
		if(aBtn[i].name==title){
			banShow(i,0);
			oShengpai.style.display='none';
			oXian.style.display='block';
			aBtn[i].style.color='#6ac2ea';
			document.getElementById(title).style.display='block';
		}
		
	}
	oSheng.onmouseover = function(){
		for(i=0;i<aBtn.length;i++){
			clearTimeout(aBtn[i].timer);
		}
		clearTimeout(exBtn);
		clearTimeout(exBtn1);
	}
	aBstn.onmouseover=function(){
		for(i=0;i<aBtn.length;i++){
			clearTimeout(aBtn[i].timer);
			aBtn[i].style.color='#333';
		}
		aBstn.style.color='#6ac2ea';
		clearTimeout(exBtn);
		clearTimeout(exBtn1);
		oShengpai.style.display='block';
		oXian.style.display='none';
		oBan.style.display='none';
	}
	for(var i = 0 ; i <oA.length;i++){
		oA[i].onmouseover= function(){
			clearTimeout(exBtn);
		}
	}
	for(i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onmouseover=function (){
			
		
			for(i=0;i<aBtn.length;i++){				
				clearTimeout(aBtn[i].timer);
			}
			for(var j=0;j<oText1.length;j++){
				oText1[j].onmouseover = function(){
					for(i=0;i<aBtn.length;i++){		
						clearTimeout(aBtn[i].timer);
						}
				}
			}
			var j = this.index;
		
				clearTimeout(exBtn);
				clearTimeout(exBtn1);
				exBtn1 = setTimeout(function(){
					banHide();
				},0);

			oShengpai.style.display='none';
			oXincheng.style.display='none';
			oXian.style.display='block';

			aBstn.style.color='#333';
			aBtn[j].timer = setTimeout(function(){
				for(i=0;i<aBtn.length;i++){
					aDiv[i].style.display='none';
					aBtn[i].style.color='';
					aBtn[j].style.color='#6ac2ea';
				}
				aDiv[j].style.display='block';
			},0);
			aBtn[j].onmouseout = function(){
				for(i=0;i<aBtn.length;i++){
			
				clearTimeout(aBtn[i].timer);
				}
				clearTimeout(exBtn);
				clearTimeout(exBtn1);
			}
			
		};
	
	}
});
var utype = $("#SxLink").attr("usertype");
var jstoken = $("#SxLink").attr("token");
function linkToThd(utype,singlelink,mainlink,jstoken,haspara){
		var togolink = '';
		var singlelink = singlelink && singlelink!=''?singlelink:mainlink;
		var tokenpara = haspara && haspara=='1'?'?accessToken=':'?accessToken=';		
		if(jstoken && jstoken !=''){
			togolink=singlelink+tokenpara+jstoken;
		}else{
			togolink = mainlink;
		}
		window.location.href = togolink;
	}

sj_singlelink = 'http://zwfw.shaanxi.gov.cn/icity/public/index';
sj_mainlink = 'http://zwfw.shaanxi.gov.cn';
		

xa_disp = "none"; xa_focus = "";xa_name='?????????';xa_singlelink = 'http://zwfw.xa.gov.cn/icity/public/index';
xa_mainlink = 'http://zwfw.xa.gov.cn/icity/public/index';
bj_disp = "none"; bj_focus = "";bj_name = "?????????";bj_singlelink = 'http://zwfwzx.baoji.gov.cn/icity/public/index';bj_mainlink = 'http://zwfwzx.baoji.gov.cn/icity/public/index';
xy_disp = "none"; xy_focus = "";xy_name = "?????????";xy_singlelink = '';xy_mainlink = 'http://zwfw.xys.gov.cn';
tc_disp = "none"; tc_focus = "";tc_name = "?????????";tc_singlelink = 'http://zwfw.tongchuan.gov.cn/icity/public/index';tc_mainlink = 'http://zwfw.tongchuan.gov.cn/icity/public/index';
wn_disp = "none"; wn_focus = "";wn_name = "?????????";wn_singlelink = 'http://zwfw.weinan.gov.cn/CMS/udcs/getToken.action';wn_mainlink = 'http://zwfw.weinan.gov.cn/CMS';
ya_disp = "none"; ya_focus = "";ya_name = "?????????";ya_singlelink = 'http://zwfw.yanan.gov.cn';ya_mainlink = 'http://zwfw.yanan.gov.cn';
yl_disp = "none"; yl_focus = "";yl_name = "?????????";yl_singlelink = 'http://zwzx.yl.gov.cn/CMS/udcs/getToken.action';yl_mainlink = 'http://zwzx.yl.gov.cn/CMS/index.action';
hz_disp = "none"; hz_focus = "";hz_name = "?????????";hz_singlelink = 'http://zwfw.hanzhong.gov.cn/icity/public/index'; hz_mainlink = 'http://zwfw.hanzhong.gov.cn/icity/public/index';
ak_disp = "none"; ak_focus = "";ak_name = "?????????";ak_singlelink = 'http://bsdt.ankang.gov.cn/authorizelogin.action'; ak_mainlink = 'http://bsdt.ankang.gov.cn'; 
sl_disp = "none"; sl_focus = "";sl_name = "?????????";sl_singlelink = 'http://zwfw.shangluo.gov.cn';sl_mainlink = 'http://zwfw.shangluo.gov.cn';
yls_disp = "none";yls_focus = "";yls_name = "???????????????";yls_singlelink = 'http://zwfw.yangling.gov.cn/icity/public/index';yls_mainlink = 'http://zwfw.yangling.gov.cn/icity/public/index';
pcjg_disp = "none"; pcjg_focus="";xx_name="????????????";xx_singlink = 'http://zw.xixianxinqu.gov.cn/icity/public/index';xx_mainlink = 'http://zw.xixianxinqu.gov.cn/icity/public/index';	
st_disp="none"


xaxc_disp = "none"; street_disp = "none";xaxc_focus = "";xaxc_name='?????????';xaxc_singlink='';xaxc_mainlink='http://zwfw.xa.gov.cn/xincheng/public/index';
xabl_disp = "none"; street_disp = "none";xabl_focus = "";xabl_name='?????????';xabl_singlink='';xabl_mainlink='http://zwfw.xa.gov.cn/beilin/public/index';
xalh_disp = "none"; street_disp = "none";xalh_focus = "";xalh_name='?????????';xalh_singlink='';xalh_mainlink='http://zwfw.xa.gov.cn/lianhu/public/index';
xabq_disp = "none"; street_disp = "none";xabq_focus = "";xabq_name='?????????';xabq_singlink='';xabq_mainlink='http://zwfw.xa.gov.cn/baqiao/public/index';
xawy_disp = "none";	street_disp = "none";xawy_focus = "";xawy_name='?????????';xawy_singlink='';xawy_mainlink='http://zwfw.xa.gov.cn/weiyang/public/index';
xayt_disp = "none";	street_disp = "none";xayt_focus = "";xayt_name='?????????';xayt_singlink='';xayt_mainlink='http://zwfw.xa.gov.cn/yanta/public/index';
xayl_disp = "none";	street_disp = "none";xayl_focus = "";xayl_name='?????????';xayl_singlink='';xayl_mainlink='http://zwfw.xa.gov.cn/yanliang/public/index';
xalt_disp = "none";	street_disp = "none";xalt_focus = "";xalt_name='?????????';xalt_singlink='';xalt_mainlink='http://zwfw.xa.gov.cn/lintong/public/index';
xaca_disp = "none";	street_disp = "none";xaca_focus = "";xaca_name='?????????';xaca_singlink='';xaca_mainlink='http://zwfw.xa.gov.cn/changan/public/index';
xahy_disp = "none"; street_disp = "none";xahy_focus = "";xahy_name='?????????';xahy_singlink='';xahy_mainlink='http://zwfw.xa.gov.cn/huyi/public/index';
xagl_disp = "none";	street_disp = "none";xagl_focus = "";xagl_name='?????????';xagl_singlink='';xagl_mainlink='http://zwfw.xa.gov.cn/gaoling/public/index';
xaltx_disp = "none";street_disp = "none";xaltx_focus = "";xaltx_name='?????????';xaltx_singlink='';xaltx_mainlink='http://zwfw.xa.gov.cn/lantian/public/index';
xazz_disp = "none";	street_disp = "none";xazz_focus = "";xazz_name='?????????';xazz_singlink='';xazz_mainlink='http://zwfw.xa.gov.cn/zhouzhi/public/index';
xajk_disp = "none"; street_disp = "none";xajk_focus = "";xajk_name='?????????'; xajk_singlink = '';xajk_mainlink = 'http://zwfw.xa.gov.cn/jingkai/public/index';
xagx_disp = "none"; street_disp = "none";xagx_focus = "";xagx_name='?????????'; xagx_singlink = '';xagx_mainlink = 'http://zwfw.xa.gov.cn/gaoxin/public/index';
xaqj_disp = "none"; street_disp = "none";xaqj_focus = "";xaqj_name='????????????'; xaqj_singlink = '';xaqj_mainlink = 'http://zwfw.xa.gov.cn/qujiang/public/index';
xacb_disp = "none"; street_disp = "none";xacb_focus = "";xacb_name='???????????????'; xacb_singlink = '';xacb_mainlink = 'http://zwfw.xa.gov.cn/chanba/public/index';
xagw_disp = "none"; street_disp = "none";xagw_focus = "";xagw_name='???????????????'; xagw_singlink = '';xagw_mainlink = 'http://zwfw.itl.gov.cn';
xaht_disp = "none"; street_disp = "none";xaht_focus = "";xaht_name='????????????'; xaht_singlink = '';xaht_mainlink = 'http://zwfw.xa.gov.cn/hangtian/public/index';
xahk_disp = "none"; street_disp = "none";xahk_focus = "";xahk_name='????????????'; xahk_singlink = '';xahk_mainlink = 'http://zwfw.xa.gov.cn/hangkong/public/index';

bjwb_disp = "none"; street_disp = "none";bjwb_focus = "";bjwb_name='?????????';bjwb_singlink='';bjwb_mainlink='http://www.weibin.gov.cn/home/fuwu';
bjjt_disp = "none"; street_disp = "none";bjjt_focus = "";bjjt_name = "?????????";bjjt_singlink = "";bjjt_mainlink = "http://www.jintai.gov.cn/services2.aspx";
bjcc_disp = "none"; street_disp = "none";bjcc_focus = "";bjcc_name = "?????????";bjcc_singlink = "";bjcc_mainlink = "http://www.chencang.gov.cn/bsdt.htm";
bjff_disp = "none"; street_disp = "none";bjff_focus = "";bjff_name = "?????????";bjff_singlink = "";bjff_mainlink = "http://www.fufeng.gov.cn/html/wsfw/index.html";
bjmx_disp = "none"; street_disp = "none";bjmx_focus = "";bjmx_name = "??????";bjmx_singlink = "";bjmx_mainlink = "http://www.sxmx.gov.cn/html/wsbs";
bjqs_disp = "none"; street_disp = "none";bjqs_focus = "";bjqs_name = "?????????";bjqs_singlink = "";bjqs_mainlink = "http://www.qishan.gov.cn";
bjfx_disp = "none"; street_disp = "none";bjfx_focus = "";bjfx_name = "?????????";bjfx_singlink = "";bjfx_mainlink = "http://zwfwzx.baoji.gov.cn/fengxiangxian/public/index";
bjtb_disp = "none"; street_disp = "none";bjtb_focus = "";bjtb_name = "?????????";bjtb_singlink = "";bjtb_mainlink = "http://www.sxtb.gov.cn/ggfw.htm";
bjly_disp = "none"; street_disp = "none";bjly_focus = "";bjly_name = "?????????";bjly_singlink = "";bjly_mainlink = "http://www.linyou.gov.cn/zxft.jsp?urltype=tree.TreeTempUrl&wbtreeid=1004";
bjqy_disp = "none"; street_disp = "none";bjqy_focus = "";bjqy_name = "?????????";bjqy_singlink = "";bjqy_mainlink = "http://www.qianyang.gov.cn/index.php?ie=1-422-1";
bjlx_disp = "none"; street_disp = "none";bjlx_focus = "";bjlx_name = "??????";bjlx_singlink = "";bjlx_mainlink = "http://www.longxian.gov.cn/wsbs1.htm";
bjfex_disp = "none";street_disp = "none";bjfex_focus = "";bjlx_name = "??????";bjlx_singlink = "";bjfex_mainlink = "http://www.sxfx.gov.cn/html/bsfw/index.html";

xyqd_disp = "none"; street_disp = "none";xyqd_focus = "";xyqd_name = "?????????";xyqd_singlelink = "http://zwfw.xys.gov.cn/qd";xyqd_mainlink = "http://zwfw.xys.gov.cn/qd";
xywc_disp = "none"; street_disp = "none";xywc_focus = "";xywc_name = "?????????";xywc_singlelink = "http://zwfw.xys.gov.cn/wc";xywc_mainlink = "http://zwfw.xys.gov.cn/wc";
xyxp_disp = "none"; street_disp = "none";xyxp_focus = "";xyxp_name = "?????????";xyxp_singlelink = "http://zwfw.xys.gov.cn/xp";xyxp_mainlink = "http://zwfw.xys.gov.cn/xp";
xywg_disp = "none"; street_disp = "none";xywg_focus = "";xywg_name = "?????????";xywg_singlelink = "http://zwfw.xys.gov.cn/wg";xywg_mainlink = "http://zwfw.xys.gov.cn/wg";
xysy_disp = "none"; street_disp = "none";xysy_focus = "";xysy_name = "?????????";xysy_singlelink = "http://zwfw.xys.gov.cn/sy";xysy_mainlink = "http://zwfw.xys.gov.cn/sy";
xyjy_disp = "none"; street_disp = "none";xyjy_focus = "";xyjy_name = "?????????";xyjy_singlelink = "http://zwfw.xys.gov.cn/jy";xyjy_mainlink = "http://zwfw.xys.gov.cn/jy";
xylq_disp = "none"; street_disp = "none";xylq_focus = "";xylq_name = "?????????";xylq_singlelink = "http://zwfw.xys.gov.cn/lq";xylq_mainlink = "http://zwfw.xys.gov.cn/lq";
xyqx_disp = "none"; street_disp = "none";xyqx_focus = "";xyqx_name = "??????";  xyqx_singlelink = "http://zwfw.xys.gov.cn/qx";xyqx_mainlink = "http://zwfw.xys.gov.cn/qx";
xyys_disp = "none"; street_disp = "none";xyys_focus = "";xyys_name = "?????????";xyys_singlelink = "http://zwfw.xys.gov.cn/ys";xyys_mainlink = "http://zwfw.xys.gov.cn/ys";
xybz_disp = "none"; street_disp = "none";xybz_focus = "";xybz_name = "?????????";xybz_singlelink = "http://zwfw.xys.gov.cn/bz";xybz_mainlink = "http://zwfw.xys.gov.cn/bz";
xych_disp = "none"; street_disp = "none";xych_focus = "";xych_name = "?????????";xych_singlelink = "http://zwfw.xys.gov.cn/ch";xych_mainlink = "http://zwfw.xys.gov.cn/ch";
xyxy_disp = "none"; street_disp = "none";xyxy_focus = "";xyxy_name = "?????????";xyxy_singlelink = "http://zwfw.xys.gov.cn/xy";xyxy_mainlink = "http://zwfw.xys.gov.cn/xy";
xycw_disp = "none"; street_disp = "none";xycw_focus = "";xycw_name = "?????????";xycw_singlelink = "http://zwfw.xys.gov.cn/cw";xycw_mainlink = "http://zwfw.xys.gov.cn/cw";

tcwy_disp = "none"; street_disp = "none";tcwy_focus = "";tcwy_name = "?????????";tcwy_singlink = "http://zwfw.tongchuan.gov.cn/wangyi/public/index";tcwy_mainlink = "http://zwfw.tongchuan.gov.cn/wangyi/public/index";
tcyt_disp = "none"; street_disp = "none";tcyt_focus = "";tcyt_name = "?????????";tcyt_singlink = "http://zwfw.tongchuan.gov.cn/yintai/public/index";tcyt_mainlink = "http://zwfw.tongchuan.gov.cn/yintai/public/index";
tcyt_disp = "none"; street_disp = "none";tcyz_focus = "";tcyz_name = "?????????";tcyz_singlink = "http://zwfw.tongchuan.gov.cn/yaozhou/public/index";tcyz_mainlink = "http://zwfw.tongchuan.gov.cn/yaozhou/public/index";
tcyj_disp = "none"; street_disp = "none";tcyj_focus = "";tcyj_name = "?????????";tcyj_singlink = "http://zwfw.tongchuan.gov.cn/yijun/public/index";tcyj_mainlink = "http://zwfw.tongchuan.gov.cn/yijun/public/index";
//tcxq_disp = "none"; street_disp = "none";tcxq_focus = "";tcxq_name = "???????????????";tcxq_singlink = "";tcxq_mainlink = "http://www.tcxq.gov.cn";

wnlw_disp = "none"; street_disp = "none";wnlw_focus = "";wnlw_name = "?????????";wnlw_singlink = "";wnlw_mainlink = "http://www.linwei.gov.cn/ggfw";
wnhc_disp = "none"; street_disp = "none";wnhc_focus = "";wnhc_name = "?????????";wnhc_singlink = "";wnhc_mainlink = "http://zw.hancheng.gov.cn";
wnhy_disp = "none"; street_disp = "none";wnhy_focus = "";wnhy_name = "?????????";wnhy_singlink = "";wnhy_mainlink = "http://www.huayin.gov.cn/html/gzfw/index.html";
wnhz_disp = "none"; street_disp = "none";wnhz_focus = "";wnhz_name = "?????????";wnhz_singlink = "";wnhz_mainlink = "http://www.huaxian.gov.cn/ggfw.htm";
wntg_disp = "none"; street_disp = "none";wntg_focus = "";wntg_name = "?????????";wntg_singlink = "";wntg_mainlink = "http://www.tongguan.gov.cn/ggfw.htm";
wndl_disp = "none"; street_disp = "none";wndl_focus = "";wndl_name = "?????????";wndl_singlink = "";wndl_mainlink = "http://www.dalisn.gov.cn/ggfw";
wncc_disp = "none"; street_disp = "none";wncc_focus = "";wncc_name = "?????????";wncc_singlink = "";wncc_mainlink = "http://www.chengcheng.gov.cn/ggfw"; 
wnhey_disp = "none";street_disp = "none";wnhey_focus = "";wnhey_name = "?????????";wnhey_singlink = "";wnhey_mainlink = "http://hyzwfwzx.heyang.gov.cn/portal/index/login.do";
wnpc_disp = "none"; street_disp = "none";wnpc_focus = "";wnpc_name = "?????????";wnpc_singlink = "";wnpc_mainlink = "http://www.pucheng.gov.cn/ggfw";
wnfp_disp = "none"; street_disp = "none";wnfp_focus = "";wnfp_name = "?????????";wnfp_singlink = "";wnfp_mainlink = "http://219.145.167.29:8080/sp/webnew/governmentHall/index.jsp";
wnbs_disp = "none"; street_disp = "none";wnbs_focus = "";wnbs_name = "?????????";wnbs_singlink = "";wnbs_mainlink = "http://www.baishui.gov.cn";

yabt_disp = "none"; street_disp = "none";yabt_focus = "";yabt_name = "?????????";yabt_singlink = "";yabt_mainlink = "http://www.baotaqu.gov.cn/html/ggf";
yaas_disp = "none"; street_disp = "none";yaas_focus = "";yaas_name = "?????????";yaas_singlink = "";yaas_mainlink = "http://www.ansai.gov.cn/channels/33.html";
yahl_disp = "none"; street_disp = "none";yahl_focus = "";yahl_name = "?????????";yahl_singlink = "";yahl_mainlink = "http://www.huangling.gov.cn/wsbs.htm";
yahlx_disp = "none";street_disp = "none";yahlx_focus = "";yahlx_name = "?????????";yahlx_singlink = "";yahlx_mainlink = "http://www.hlx.gov.cn/zxbs.htm";
yayic_disp = "none";street_disp = "none";yayic_focus = "";yayic_name = "?????????";yayic_singlink = "";yayic_mainlink = "http://www.ycx.gov.cn/wsbs.htm";
yalc_disp = "none"; street_disp = "none";yalc_focus = "";yalc_name = "?????????";yalc_singlink = "";yalc_mainlink = "http://www.lcx.gov.cn/ggfw.htm";
yzfx_disp = "none"; street_disp = "none";yafx_focus = "";yafx_name = "??????";yafx_singlink = "";yafx_mainlink = "http://www.fuxian.gov.cn/ggfw.htm";
yagq_disp = "none"; street_disp = "none";yagq_focus = "";yagq_name = "?????????";yagq_singlink = "";yagq_mainlink = "http://www.ganquanxian.gov.cn/publish/zxfw/zxfw";
yawq_disp = "none"; street_disp = "none";yawq_focus = "";yawq_name = "?????????";yawq_singlink = "";yawq_mainlink = "http://www.wqx.gov.cn/news/sports/index.html";
yazd_disp = "none"; street_disp = "none";yazd_focus = "";yazd_name = "?????????";yazd_singlink = "";yazd_mainlink = "http://www.zhidan.gov.cn/bsdt.htm";
yazc_disp = "none"; street_disp = "none";yazc_focus = "";yazc_name = "?????????";yazc_singlink = "";yazc_mainlink = "http://www.zichang.gov.cn/html/wsbs/index.html";
yayc_disp = "none"; street_disp = "none";yayc_focus = "";yayc_name = "?????????";yayc_singlink = "";yayc_mainlink = "http://www.yanchuan.gov.cn/list-1574.html";
yaycx_disp = "none";street_disp = "none";yaycx_focus = "";yaycx_name = "?????????";yaycx_singlink = "";yaycx_mainlink = "http://www.yanchangxian.gov.cn/a4.htm";

ylyy_disp = "none"; street_disp = "none";ylyy_focus = "";ylyy_name = "?????????";ylyy_singlink = "";ylyy_mainlink = "http://yuyang.gov.cn/gzfw";
ylhs_disp = "none"; street_disp = "none";ylhs_focus = "";ylhs_name = "?????????";ylhs_singlink = "";ylhs_mainlink = "http://www.hszf.gov.cn";
ylsm_disp = "none"; street_disp = "none";ylsm_focus = "";ylsm_name = "?????????";ylsm_singlink = "";ylsm_mainlink = "http://www.sxsm.gov.cn/ggfw";
ylfg_disp = "none"; street_disp = "none";ylfg_focus = "";ylfg_name = "?????????";ylfg_singlink = "";ylfg_mainlink = "http://www.fg.gov.cn/bs/z_fugu2/Single.aspx?id=202";
yldb_disp = "none"; street_disp = "none";yldb_focus = "";yldb_name = "?????????";yldb_singlink = "";yldb_mainlink = "http://www.dingbian.gov.cn/Html/banshizhinan";
yljb_disp = "none"; street_disp = "none";yljb_focus = "";yljb_name = "?????????";yljb_singlink = "";yljb_mainlink = "http://www.jingbian.gov.cn/gzfw.htm";
ylsd_disp = "none"; street_disp = "none";ylsd_focus = "";ylsd_name = "?????????";ylsd_singlink = "";ylsd_mainlink = "http://www.sxsd.gov.cn/html/wsbs/index.html";
ylmz_disp = "none"; street_disp = "none";ylmz_focus = "";ylmz_name = "?????????";ylmz_singlink = "";ylmz_mainlink = "http://www.mizhi.gov.cn/zxbs/x_zxbs_index.jsp?urltype=tree.TreeTempUrl&wbtreeid=1053";
yljx_disp = "none"; street_disp = "none";yljx_focus = "";ylmz_name = "??????";ylmz_singlink = "";yljx_mainlink = "http://www.sxjiaxian.gov.cn/gzfw.html";
ylwb_disp = "none"; street_disp = "none";ylwb_focus = "";ylwb_name = "?????????";ylwb_singlink = "";ylwb_mainlink = "http://www.wubu.gov.cn/ggfw.htm";
ylqj_disp = "none"; street_disp = "none";ylqj_focus = "";ylqj_name = "?????????";ylqj_singlink = "";ylqj_mainlink = "http://www.qjzhf.gov.cn/Category_13/Index.aspx";
ylzz_disp = "none"; street_disp = "none";ylzz_focus = "";ylqj_name = "?????????";ylqj_singlink = "";ylzz_mainlink = "http://www.zizhou.gov.cn/ggfw.htm";

hzht_disp = "none"; street_disp = "none";hzht_focus = "";hzht_name = "?????????";hzht_singlink = "http://zwfw.hanzhong.gov.cn/hantaiqu/public/index";hzht_mainlink = "http://zwfw.hanzhong.gov.cn/hantaiqu/public/index";
hznz_disp = "none"; street_disp = "none";hznz_focus = "";hznz_name = "?????????";hznz_singlink = "http://zwfw.hanzhong.gov.cn/nanzhengqu/public/index";hznz_mainlink = "http://zwfw.hanzhong.gov.cn/nanzhengqu/public/index";
hzcg_disp = "none"; street_disp = "none";hzcg_focus = "";hzcg_name = "?????????";hzcg_singlink = "http://zwfw.hanzhong.gov.cn/chengguxian/public/index";hzcg_mainlink = "http://zwfw.hanzhong.gov.cn/chengguxian/public/index";
hzyx_disp = "none"; street_disp = "none";hzyx_focus = "";hzyx_name = "??????";hzyx_singlink = "http://zwfw.hanzhong.gov.cn/yangxian/public/index";hzyx_mainlink = "http://zwfw.hanzhong.gov.cn/yangxian/public/index";
hzmx_disp = "none"; street_disp = "none";hzmx_focus = "";hzmx_name = "??????";hzmx_singlink = "http://zwfw.hanzhong.gov.cn/mianxian/public/index";hzmx_mainlink = "http://zwfw.hanzhong.gov.cn/mianxian/public/index";
hzxx_disp = "none"; street_disp = "none";hzxx_focus = "";hzxx_name = "?????????";hzxx_singlink = "http://zwfw.hanzhong.gov.cn/xixiangxian/public/index";hzxx_mainlink = "http://zwfw.hanzhong.gov.cn/xixiangxian/public/index";
hzly_disp = "none"; street_disp = "none";hzly_focus = "";hzly_name = "?????????";hzly_singlink = "http://zwfw.hanzhong.gov.cn/lueyang/public/index";hzly_mainlink = "http://zwfw.hanzhong.gov.cn/lueyang/public/index";
hzzb_disp = "none"; street_disp = "none";hzzb_focus = "";hzzb_name = "?????????";hzzb_singlink = "http://zwfw.hanzhong.gov.cn/zhenbaxian/public/index";hzzb_mainlink = "http://zwfw.hanzhong.gov.cn/zhenbaxian/public/index";
hznq_disp = "none"; street_disp = "none";hznq_focus = "";hznq_name = "?????????";hznq_singlink = "http://zwfw.hanzhong.gov.cn/ningqiangxian/public/index";hznq_mainlink = "http://zwfw.hanzhong.gov.cn/ningqiangxian/public/index";
hzlb_disp = "none"; street_disp = "none";hzlb_focus = "";hzlb_name = "?????????";hzlb_singlink = "http://zwfw.hanzhong.gov.cn/liubaxian/public/index";hzlb_mainlink = "http://zwfw.hanzhong.gov.cn/liubaxian/public/index";
hzfp_disp = "none"; street_disp = "none";hzfp_focus = "";hzfp_name = "?????????";hzfp_singlink = "http://zwfw.hanzhong.gov.cn/fopingxian/public/index";hzfp_mainlink = "http://zwfw.hanzhong.gov.cn/fopingxian/public/index";

akhb_disp = "none"; street_disp = "none";akhb_focus = "";akhb_name = "?????????";akhb_singlink = "";akhb_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a11903b9d0584";
akgx_disp = "none"; street_disp = "none";akgx_focus = "";akgx_name = "?????????";akgx_singlink = "";akgx_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=402880245a3b4816015a3bcf4bad0001";
akpl_disp = "none"; street_disp = "none";akpl_focus = "";akpl_name = "?????????";akpl_singlink = ""; akpl_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1193456b058a"; 
akxy_diap = "none"; street_disp = "none";akxy_focus = "";akxy_name = "?????????";akxy_singlink = ""; akxy_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1193bc4f058c"; 
aksq_disp = "none"; street_disp = "none";aksq_focus = "";aksq_name = "?????????";aksq_singlink = "";aksq_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1191c7960586";
akzy_disp = "none"; street_disp = "none";akzy_focus = "";akzy_name = "?????????";akzy_singlink = "";akzy_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1192c3be0588";
akbh_disp = "none"; street_disp = "none";akbh_focus = "";akbh_name = "?????????";akbh_singlink = "";akbh_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1193f9ea058d";
akhy_disp = "none"; street_disp = "none";akhy_focus = "";akhy_name = "?????????";akhy_singlink = "";akhy_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1190f8180585";
akzp_disp = "none"; street_disp = "none";akzp_focus = "";akzp_name = "?????????";akzp_singlink = "";akzp_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a11937ef2058b";
akns_disp = "none"; street_disp = "none";akns_focus = "";akns_name = "?????????";akns_singlink = "";akns_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a119285a60587";
akfa_disp = "none"; street_disp = "none";akfa_focus = "";akfa_name = "?????????";akfa_singlink = "";akfa_mainlink = "http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1192fbee0589";

slsz_disp = "none";street_disp = "none";slsz_focus = "";slsz_name = "?????????";slsz_singlink = "";slsz_mainlink = "http://zwfw.shangzhou.gov.cn";
slln_disp = "none";street_disp = "none";slln_focus = "";slln_name = "?????????";slln_singlink = "";slln_mainlink = "http://zwfw.luonan.gov.cn/web/index.html";
slsy_disp = "none";street_disp = "none";slsy_focus = "";slsy_name = "?????????";slsy_singlink = "";slsy_mainlink = "http://zwfw.shy.gov.cn/web/index.html";
slza_disp = "none";street_disp = "none";slza_focus = "";slza_name = "?????????";slza_singlink = "";slza_mainlink = " http://zwfw.zazf.gov.cn";
sldf_disp = "none";street_disp = "none";sldf_focus = "";sldf_name = "?????????";sldf_singlink = "";sldf_mainlink = " http://zwfw.danfeng.gov.cn";
slsn_disp = "none";street_disp = "none";slsn_focus = "";slsn_name = "?????????";slsn_singlink = "";slsn_mainlinks = "http://zwfw.shangnan.gov.cn/web/index.html";
slsz_disp = "none";street_disp = "none";slzs_focus = "";slzs_name = "?????????";slzs_singlink = "";slzs_mainlink = "http://s.snzs.gov.cn/web/index.html";

ylq_disp = "none"; street_disp = "none";ylq_focus = "";ylq_name = "?????????";ylq_singlink = "";ylq_mainlink = "http://zwfw.yangling.gov.cn/yangling/public/index";

kg_disp = "none";street_disp = "none";kg_focus = ""; kg_name = "????????????";kg_singlink = "http://zw.xixianxinqu.gov.cn/konggangxincheng/public/index";kg_mainlink = "http://zw.xixianxinqu.gov.cn/konggangxincheng/public/index";
fd_disp = "none";street_disp = "none";fd_focus = ""; fd_name = "????????????";fd_singlink = "http://zw.xixianxinqu.gov.cn/fengdongxincheng/public/index";fd_mainlink = "http://zw.xixianxinqu.gov.cn/fengdongxincheng/public/index";
qh_disp = "none";street_disp = "none";qh_focus = ""; qh_name = "????????????";qh_singlink = "http://zw.xixianxinqu.gov.cn/qinhanxincheng/public/index";qh_mainlink = "http://zw.xixianxinqu.gov.cn/qinhanxincheng/public/index";
fx_disp = "none";street_disp = "none";fx_focus = ""; fx_name = "????????????";fx_singlink = "http://zw.xixianxinqu.gov.cn/fengxixincheng/public/index";fx_mainlink = "http://zw.xixianxinqu.gov.cn/fengxixincheng/public/index";
jh_disp = "none";street_disp = "none";jh_focus = ""; jh_name = "????????????";jh_singlink = "http://zw.xixianxinqu.gov.cn/jinghexincheng/public/index";jh_mainlink = "http://zw.xixianxinqu.gov.cn/jinghexincheng/public/index";

document.writeln("<style type=\"text\/css\">");
document.writeln("#logosj{ position:relative; margin-left:200px; width:70px; height:34px;}");
document.writeln("#container_SX{font-family:\"Helvetica Neue\", Helvetica, Arial, Microsoft Yahei, sans-serif;margin-left:auto;margin-right:auto;margin-top:9px;background-color: transparent;overflow: hidden;}");
document.writeln("#mainbg_SX{width:100%;border-radius:5px;background-color:#fff;padding: 10px 0 20px;float:left;position:relative; font-size: 14px;}");
document.writeln("#mainbg_SX #sheng a:hover{color:#6ac2ea;}");
document.writeln("#right{float:right;padding:0px;width:89%;text-align:left;}");
document.writeln("#right_qx{float:right;padding:0px;width:89%;text-align:left;}");
document.writeln("#right_ds{float:right;padding:0px;width:89%;text-align:left;}");
document.writeln("#right_pc{float:right;padding:0px;width:89%;text-align:left;}");
document.writeln("#left{float:left;color:#0385c3;padding:0px;width:10%;text-align:center;}");
document.writeln(".text{margin:0px;padding:0px 10px 5px;}");
document.writeln(".text a{ display:inline-block;color:#333;margin-right:24px;margin-bottom: 12px;cursor:pointer;text-decoration:none; }");
document.writeln("\/*css????????????????????????*\/");
document.writeln("#right_qx a:hover{");
document.writeln("	color:#6ac2ea;");
document.writeln("}");
document.writeln("#right_pc a:hover{");
document.writeln("	color:#6ac2ea;");
document.writeln("}");
document.writeln("#ds a:hover{");
document.writeln("	color:#6ac2ea;");
document.writeln("}");
document.writeln("\/*css????????????????????????*\/");
document.writeln("");
document.writeln(".text a.unfinish{color:#ccc;cursor:text}");
document.writeln(".cont{overflow: hidden;}");
document.writeln("\/*--------------------ban--------------------*\/");
document.writeln("#ban{");
document.writeln("	overflow:hidden;");
document.writeln("}");
document.writeln("#ban .ban_inner{");
document.writeln("	overflow:hidden;");
document.writeln("	width:89%;");
document.writeln("	float:right;");
document.writeln("	min-height:36px;");
document.writeln("}");
document.writeln("#ban .ban_inner ul{");
document.writeln("	overflow:hidden;");
document.writeln("	margin:0;");
document.writeln("	    padding: 0px 10px 5px;");
document.writeln("}");
document.writeln("#ban .ban_inner ul li{");
document.writeln("	list-style:none;");
document.writeln("	float:left;");
document.writeln("	display:block;");
document.writeln("	line-height:30px;");
document.writeln("}");
document.writeln("#ban .ban_inner ul li a{");
document.writeln("	display:block;");
document.writeln("	line-height:20px;");
document.writeln("	font-size:14px;");
document.writeln("	cursor:pointer;margin-right: 24px;margin-bottom: 12px;");
document.writeln("}");
document.writeln("#ban .ban_inner ul li a:hover{");
document.writeln("	color:#6ac2ea;");
document.writeln("}")
document.writeln("<\/style>");


document.writeln("<div id=\"container_SX\">");
document.writeln("<div id=\"mainbg_SX\" >");
//document.writeln("<img style=\"position:absolute; left:225px; top:-19px;\" src=\"http:\/\/zwfw.sd.gov.cn\/images\/5\/src_0333.jpg\">");
document.writeln("<div class=\"cont\" id=\"sheng\"><div id=\"right\"><div class=\"text\"><a target=\"_top\" onclick=\"linkToThd('',\'"+sj_singlelink+"',\'"+sj_mainlink+"\',\'"+jstoken+"\');\" id=\"sheng_r_a\"> ??????<\/a><\/div><\/div><div id=\"left\"><div class=\"text\" style=\"padding:0;text-align: right;\">?????????<\/div><\/div><\/div>")

document.writeln("<div class=\"cont\" >");
document.writeln("<div id=\"right\" >");
document.writeln("<div class=\"text\" id=\"ds\">");
document.writeln("<a target=\"_top\" name=\"xa\" style=\"color:"+xa_focus+";\" onclick=\"linkToThd('',\'"+xa_singlelink+"\',\'"+xa_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"bj\" style=\"color:"+bj_focus+";\" onclick=\"linkToThd('',\'"+bj_singlelink+"',\'"+bj_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"xy\" style=\"color:"+xy_focus+";\" onclick=\"linkToThd('',\'"+xy_singlelink+"',\'"+xy_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"tc\" style=\"color:"+tc_focus+";\" onclick=\"linkToThd('',\'"+tc_singlelink+"',\'"+tc_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"wn\" style=\"color:"+wn_focus+";\" onclick=\"linkToThd('',\'"+wn_singlelink+"',\'"+wn_mainlink+"',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"ya\" style=\"color:"+ya_focus+";\" onclick=\"linkToThd('',\'"+ya_singlelink+"',\'"+ya_mainlink+"',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"yl\" style=\"color:"+yl_focus+";\" onclick=\"linkToThd('',\'"+yl_singlelink+"',\'"+yl_mainlink+"',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"hz\" style=\"color:"+hz_focus+";\" onclick=\"linkToThd('',\'"+hz_singlelink+"',\'"+hz_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"ak\" style=\"color:"+ak_focus+";\" onclick=\"linkToThd('',\'"+ak_singlelink+"',\'"+ak_mainlink+"',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"sl\" style=\"color:"+sl_focus+";\" onclick=\"linkToThd('',\'"+sl_singlelink+"',\'"+sl_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" name=\"yls\" style=\"color:"+yls_focus+";\" onclick=\"linkToThd('',\'"+yls_singlelink+"',\'"+yls_mainlink+"\',\'"+jstoken+"\');\">???????????????<\/a>");
document.writeln("<\/div><\/div><div id=\"left\"><div class=\"text\" style='padding:0;text-align: right;'>?????????<\/div><\/div><\/div>");


document.writeln("<div class=\"cont\" style=\"display:none;\" id=\"zd_sx_xian\"><div id=\"right_qx\">");
document.writeln("<!---??????---><div class=\"text text1\" id=\"xa\" style=\"display:"+xa_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+xaxc_focus+";\" onmouseover=\"banShow(0,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xincheng/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xabl_focus+";\" onmouseover=\"banShow(0,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/beilin/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xalh_focus+";\" onmouseover=\"banShow(0,2)\" onmouseout=\"clearban()\"  oonclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/lianhu/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xabq_focus+";\" onmouseover=\"banShow(0,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/baqiao/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xawy_focus+";\" onmouseover=\"banShow(0,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/weiyang/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xayt_focus+";\" onmouseover=\"banShow(0,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yanta/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xayl_focus+";\" onmouseover=\"banShow(0,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yanliang/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xalt_focus+";\" onmouseover=\"banShow(0,7)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/lintong/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xaca_focus+";\" onmouseover=\"banShow(0,8)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/changan/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xahy_focus+";\" onmouseover=\"banShow(0,9)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/huyi/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xagl_focus+";\" onmouseover=\"banShow(0,10)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/gaoling/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xaltx_focus+";\" onmouseover=\"banShow(0,11)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/lantian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xazz_focus+";\" onmouseover=\"banShow(0,12)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhouzhi/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xajk_focus+";\" onmouseover=\"banShow(0,13)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jingkai/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xagx_focus+";\" onmouseover=\"banShow(0,14)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/gaoxin/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xaqj_focus+";\" onmouseover=\"banShow(0,15)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/qujiang/public/index'\">????????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xacb_focus+";\" onmouseover=\"banShow(0,16)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/chanba/public/index'\">???????????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xagw_focus+";\" onmouseover=\"banShow(0,17)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.itl.gov.cn/'\">???????????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xaht_focus+";\" onmouseover=\"banShow(0,18)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hangtian/public/index'\">????????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xahk_focus+";\" onmouseover=\"banShow(0,19)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hangkong/public/index'\">????????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"bj\" style=\"display:"+bj_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+bjwb_focus+";\" onmouseover=\"banShow(1,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/weibinqu/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjjt_focus+";\" onmouseover=\"banShow(1,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/jintaiqu/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjcc_focus+";\" onmouseover=\"banShow(1,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/chencangqu/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjcc_focus+";\" onmouseover=\"banShow(1,12)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/gaoxinqu/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjff_focus+";\" onmouseover=\"banShow(1,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/fufengxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjmx_focus+";\" onmouseover=\"banShow(1,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/meixian/public/index'\">??????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjqs_focus+";\" onmouseover=\"banShow(1,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/qishanxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjfx_focus+";\" onmouseover=\"banShow(1,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/fengxiangxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjtb_focus+";\" onmouseover=\"banShow(1,7)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/taibaixian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjly_focus+";\" onmouseover=\"banShow(1,8)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/linyouxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjqy_focus+";\" onmouseover=\"banShow(1,9)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/qianyangxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjlx_focus+";\" onmouseover=\"banShow(1,10)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/longxian/public/index'\">??????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+bjfex_focus+";\" onmouseover=\"banShow(1,11)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfwzx.baoji.gov.cn/fengxian/public/index'\">??????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"xy\" style=\"display:"+xy_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+xyqd_focus+";\" onmouseover=\"banShow(2,0)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xyqd_singlelink+"',\'"+xyqd_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xywc_focus+";\" onmouseover=\"banShow(2,1)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xywc_singlelink+"',\'"+xywc_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xyxp_focus+";\" onmouseover=\"banShow(2,2)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xyxp_singlelink+"',\'"+xyxp_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xywg_focus+";\" onmouseover=\"banShow(2,3)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xywg_singlelink+"',\'"+xywg_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xysy_focus+";\" onmouseover=\"banShow(2,4)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xysy_singlelink+"',\'"+xysy_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xyjy_focus+";\" onmouseover=\"banShow(2,5)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xyjy_singlelink+"',\'"+xyjy_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xylq_focus+";\" onmouseover=\"banShow(2,6)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xylq_singlelink+"',\'"+xylq_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xyqx_focus+";\" onmouseover=\"banShow(2,7)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xyqx_singlelink+"',\'"+xyqx_mainlink+"\',\'"+jstoken+"\');\">??????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xyys_focus+";\" onmouseover=\"banShow(2,8)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xyys_singlelink+"',\'"+xyys_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xybz_focus+";\" onmouseover=\"banShow(2,9)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xybz_singlelink+"',\'"+xybz_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xych_focus+";\" onmouseover=\"banShow(2,10)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xych_singlelink+"',\'"+xych_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xyxy_focus+";\" onmouseover=\"banShow(2,11)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xyxy_singlelink+"',\'"+xyxy_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+xycw_focus+";\" onmouseover=\"banShow(2,12)\" onmouseout=\"clearban()\"  onclick=\"linkToThd('',\'"+xycw_singlelink+"',\'"+xycw_mainlink+"\',\'"+jstoken+"\');\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"tc\" style=\"display:"+tc_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+tcwy_focus+";\" onmouseover=\"banShow(3,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.tongchuan.gov.cn/wangyi/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+tcyt_focus+";\" onmouseover=\"banShow(3,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.tongchuan.gov.cn/yintai/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+tcyz_focus+";\" onmouseover=\"banShow(3,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.tongchuan.gov.cn/yaozhou/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+tcyj_focus+";\" onmouseover=\"banShow(3,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.tongchuan.gov.cn/yijun/public/index'\">?????????<\/a>");
//document.writeln("<a target=\"_top\" style=\"color:"+tcxq_focus+";\" onmouseover=\"banShow(3,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://www.tcxq.gov.cn/'\">???????????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"wn\" style=\"display:"+wn_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+wnlw_focus+";\" onmouseover=\"banShow(4,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=LW'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnlw_focus+";\" onmouseover=\"banShow(4,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=GX'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnlw_focus+";\" onmouseover=\"banShow(4,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=JK'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnhc_focus+";\" onmouseover=\"banShow(4,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zw.hancheng.gov.cn'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnhy_focus+";\" onmouseover=\"banShow(4,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=HYS'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnhz_focus+";\" onmouseover=\"banShow(4,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=HZ'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnhz_focus+";\" onmouseover=\"banShow(4,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=TG'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wndl_focus+";\" onmouseover=\"banShow(4,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=DL'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wncc_focus+";\" onmouseover=\"banShow(4,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=CC'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnhey_focus+";\" onmouseover=\"banShow(4,7)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=HYX'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnpc_focus+";\" onmouseover=\"banShow(4,8)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=PC'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnfp_focus+";\" onmouseover=\"banShow(4,9)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=FP'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+wnbs_focus+";\" onmouseover=\"banShow(4,10)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.weinan.gov.cn/CMS/index.action?county=BS'\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"ya\" style=\"display:"+ya_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+yabt_focus+";\" onmouseover=\"banShow(5,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610602000000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yaas_focus+";\" onmouseover=\"banShow(5,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610603000000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258C%25BA'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yahl_focus+";\" onmouseover=\"banShow(5,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610632000000&cityName=%25E9%25BB%2584%25E9%2599%25B5%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yahlx_focus+";\" onmouseover=\"banShow(5,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610631000000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yayic_focus+";\" onmouseover=\"banShow(5,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610630000000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yalc_focus+";\" onmouseover=\"banShow(5,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610629000000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yafx_focus+";\" onmouseover=\"banShow(5,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610628000000&cityName=%25E5%25AF%258C%25E5%258E%25BF'\">??????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yagq_focus+";\" onmouseover=\"banShow(5,7)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610627000000&cityName=%25E7%2594%2598%25E6%25B3%2589%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yawq_focus+";\" onmouseover=\"banShow(5,8)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610626000000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yazd_focus+";\" onmouseover=\"banShow(5,9)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610625000000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yazc_focus+";\" onmouseover=\"banShow(5,10)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610623000000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yayc_focus+";\" onmouseover=\"banShow(5,11)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610622000000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF'\"\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yaycx_focus+";\" onmouseover=\"banShow(5,12)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/?cityCode=610621000000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF'\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"yl\" style=\"display:"+yl_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+ylyy_focus+";\" onmouseover=\"banShow(6,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=YY'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylhs_focus+";\" onmouseover=\"banShow(6,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=HS'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylsm_focus+";\" onmouseover=\"banShow(6,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=SM'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylfg_focus+";\" onmouseover=\"banShow(6,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=FG'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yldb_focus+";\" onmouseover=\"banShow(6,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=DB'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yljb_focus+";\" onmouseover=\"banShow(6,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=JB'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylsd_focus+";\" onmouseover=\"banShow(6,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=SD'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylmz_focus+";\" onmouseover=\"banShow(6,7)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=MZ'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+yljx_focus+";\" onmouseover=\"banShow(6,8)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=JX'\">??????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylwb_focus+";\" onmouseover=\"banShow(6,9)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=WB'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylqj_focus+";\" onmouseover=\"banShow(6,10)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=QJ'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+ylzz_focus+";\" onmouseover=\"banShow(6,11)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwzx.yl.gov.cn/CMS/index.action?county=ZZ'\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"hz\" style=\"display:"+hz_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+hzht_focus+";\" onmouseover=\"banShow(7,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/hantaiqu/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hznz_focus+";\" onmouseover=\"banShow(7,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/nanzhengqu/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzcg_focus+";\" onmouseover=\"banShow(7,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/chengguxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzyx_focus+";\" onmouseover=\"banShow(7,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/yangxian/public/index'\">??????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzmx_focus+";\" onmouseover=\"banShow(7,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/mianxian/public/index'\">??????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzxx_focus+";\" onmouseover=\"banShow(7,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/xixiangxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzly_focus+";\" onmouseover=\"banShow(7,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/lueyang/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzzb_focus+";\" onmouseover=\"banShow(7,7)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/zhenbaxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hznq_focus+";\" onmouseover=\"banShow(7,8)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/ningqiangxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzlb_focus+";\" onmouseover=\"banShow(7,9)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/liubaxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hzfp_focus+";\" onmouseover=\"banShow(7,10)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/fopingxian/public/index'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+hznz_focus+";\" onmouseover=\"banShow(7,11)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.hanzhong.gov.cn/jingkaiqu/public/index'\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"ak\" style=\"display:"+ak_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+akhb_focus+";\" onmouseover=\"banShow(8,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a11903b9d0584'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akgx_focus+";\" onmouseover=\"banShow(8,10)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=402880245a3b4816015a3bcf4bad0001'\">?????????<\/a>");

//document.writeln("<a target=\"_top\" style=\"color:"+akgx_focus+";\" onmouseover=\"banShow(8,10)\" onmouseout=\"clearban()\"  //onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028800065c167520165c1763b6c000b'\">???????????????<\/a>");

document.writeln("<a target=\"_top\" style=\"color:"+akpl_focus+";\" onmouseover=\"banShow(8,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1193456b058a'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akxy_focus+";\" onmouseover=\"banShow(8,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1193bc4f058c'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+aksq_focus+";\" onmouseover=\"banShow(8,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1191c7960586'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akzy_focus+";\" onmouseover=\"banShow(8,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1192c3be0588'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akbh_focus+";\" onmouseover=\"banShow(8,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1193f9ea058d'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akhy_focus+";\" onmouseover=\"banShow(8,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1190f8180585'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akzp_focus+";\" onmouseover=\"banShow(8,7)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a11937ef2058b'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akns_focus+";\" onmouseover=\"banShow(8,8)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a119285a60587'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+akfa_focus+";\" onmouseover=\"banShow(8,9)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://bsdt.ankang.gov.cn/webIndex.action?districtId=4028802459af843a015a1192fbee0589'\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---?????????---><div class=\"text text1\" id=\"sl\" style=\"display:"+sl_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+slsz_focus+";\" onmouseover=\"banShow(9,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.shangzhou.gov.cn'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+slln_focus+";\" onmouseover=\"banShow(9,1)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.luonan.gov.cn'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+slsy_focus+";\" onmouseover=\"banShow(9,2)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.shy.gov.cn'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+slza_focus+";\" onmouseover=\"banShow(9,3)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href=' http://zwfw.zazf.gov.cn'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+sldf_focus+";\" onmouseover=\"banShow(9,4)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href=' http://zwfw.danfeng.gov.cn'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+slsn_focus+";\" onmouseover=\"banShow(9,5)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://zwfw.shangnan.gov.cn'\">?????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+slzs_focus+";\" onmouseover=\"banShow(9,6)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='http://s.snzs.gov.cn'\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<!---???????????????---><div class=\"text text1\" id=\"yls\" style=\"display:"+yls_disp+";\">");
document.writeln("<a target=\"_top\" style=\"color:"+ylq_focus+";\" onmouseover=\"banShow(10,0)\" onmouseout=\"clearban()\"  onclick=\"javascript:window.location.href='"+ylq_mainlink+"'\">?????????<\/a>");
document.writeln("<\/div>");
document.writeln("<\/div><div id=\"left\"><div class=\"text\" style='padding:0;text-align: right;'><nobr>???(?????????)???</nobr><\/div><\/div><\/div><!------------------------------------>");



document.writeln("<div style=\"overflow:hidden; display:block\" id=\"zd_sx_shengpai\">")
document.writeln("<div id=\"right_pc\" >");
document.writeln("<!---?????????????????????--->");
document.writeln("<div class=\"text text1\" style=\"display:block;\"><a target=\"_top\" style=\"color:"+pcjg_focus+";\" onmouseover=\"banShow_xc()\" onmouseout=\"clearban()\" onclick=\"linkToThd('',\'"+xx_singlink+"',\'"+xx_mainlink+"\',\'"+jstoken+"\');\">????????????<\/a><\/div>");
document.writeln("<\/div><div id=\"left\"><div class=\"text text1\" style=\"padding: 0;text-align: right;\"><nobr>????????????????????????<\/nobr><\/div><\/div><\/div>")



document.writeln("<div style=\"overflow:hidden; display:none\" id=\"zd_sx_xincheng\">")
document.writeln("<div id=\"right_pc\" >");
document.writeln("<!---??????--->");
document.writeln("<div class=\"text text1\" style=\"display:block;\">");
document.writeln("<a target=\"_top\" style=\"color:"+pcjg_focus+";\"  onmouseover=\"banShow(11,0)\" onmouseout=\"clearban()\" onclick=\"linkToThd('',\'"+kg_singlink+"',\'"+kg_mainlink+"\',\'"+jstoken+"\');\">???????????? <\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+pcjg_focus+";\" onmouseover=\"banShow(11,1)\" onmouseout=\"clearban()\" onclick=\"linkToThd('',\'"+fd_singlink+"',\'"+fd_mainlink+"\',\'"+jstoken+"\');\">????????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+pcjg_focus+";\"  onmouseover=\"banShow(11,2)\" onmouseout=\"clearban()\" onclick=\"linkToThd('',\'"+qh_singlink+"',\'"+qh_mainlink+"\',\'"+jstoken+"\');\">????????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+pcjg_focus+";\" onmouseover=\"banShow(11,3)\" onmouseout=\"clearban()\" onclick=\"linkToThd('',\'"+fx_singlink+"',\'"+fx_mainlink+"\',\'"+jstoken+"\');\">????????????<\/a>");
document.writeln("<a target=\"_top\" style=\"color:"+pcjg_focus+";\" onmouseover=\"banShow(11,4)\" onmouseout=\"clearban()\" onclick=\"linkToThd('',\'"+jh_singlink+"',\'"+jh_mainlink+"\',\'"+jstoken+"\');\">????????????<\/a>");
document.writeln("<\/div><\/div>");
document.writeln("<div id=\"left\"><div class=\"text text1\" style=\"padding: 0;text-align: right;\"><nobr>?????????<\/nobr><\/div><\/div><\/div>")



document.writeln("<!----------------------------?????? start------------------------------------->");
document.writeln("<div id=\"ban\" style=\"display:none;\">");
document.writeln("	<div class=\"txt\" style=\"font-size:14px; color:#0385C3; text-align:right; width:10%; float:left; \">??????????????????<\/div>");
document.writeln("<!----??????----><div class=\"ban_inner\" id=\"ban_0\" style=\"display:"+xa_disp+";\">");
//document.writeln("		<ul id=\"ban_2_999\" style=\"display:none;\"  class=\"baner\">");
//document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_0\" style=\"display:"+xaxc_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiyilu/icity/item/xyljb?reg_code=610102001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/changlezhonglu/icity/item/clzljb?reg_code=610102002000'\">??????????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhongshanmen/icity/item/zsmjb?reg_code=610102003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hansenzhai/icity/item/hszjb?reg_code=610102004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jiefangmen/icity/item/jfmjb?reg_code=610102005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/ziqianglu/icity/item/zqljb?reg_code=610102006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/taihualu/icity/item/thljb?reg_code=610102007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/changlexilu/icity/item/clxljb?reg_code=610102008000'\">??????????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hujiamiao/icity/item/hjmjb?reg_code=610102009000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_1\" style=\"display:"+xabl_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/nanyuanmen/icity/item/nymjb?reg_code=610103001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/baishulin/icity/item/bsljb?reg_code=610103002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/changlefang/icity/item/clfjb?reg_code=610103003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/dongguannanjie/icity/item/dgnjjb?reg_code=610103004000'\">??????????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/taiyilu/icity/item/tyljb?reg_code=610103005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wenyilu/icity/item/wyljb?reg_code=610103006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/changanlu/icity/item/caljb?reg_code=610103007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhangjiacun/icity/item/zjcjb?reg_code=610103008000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_2\" style=\"display:"+xalh_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/qingnianlu/icity/item/qnljb?reg_code=610104001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/beiyuanmen/icity/item/bymjb?reg_code=610104002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/huanchengxilu/icity/item/hcxljb?reg_code=610104003000'\">??????????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiguanjie/icity/item/xgjjb?reg_code=610104004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/tumenjie/icity/item/tmjjb?reg_code=610104005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hongmiaopo/icity/item/hmpjb?reg_code=610104006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/taoyuanlu/icity/item/taoyuanlu?reg_code=610104007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zaoyuanjie/icity/item/zyjb?reg_code=610104008000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/beiguan/icity/item/bgjb?reg_code=610104009000'\">????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_3\" style=\"display:"+xabq_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/fangzhicheng/icity/item/fzcjb?reg_code=610111001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiwangjie/icity/item/xwjjb?reg_code=610111002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/shilipu/icity/item/slpjb?reg_code=610111003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hongqingjie/icity/item/hongqingjiejb?reg_code=610111004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/baqiaojie/icity/item/bqjjb?reg_code=610111005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hongqijie/icity/item/hqjjb?reg_code=610111006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/dizhaijie/icity/item/dizhaijie?reg_code=610111007000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_4\" style=\"display:"+xawy_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hanchengjie/icity/item/hcjjb?reg_code=610112001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/tanjiajie/icity/item/tjjjb?reg_code=610112002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/caotanjie/icity/item/ctjjb?reg_code=610112003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinjiamiao/icity/item/xjmjb?reg_code=610112004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/weiyanggong/icity/item/wygjb?reg_code=610112005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xujiawan/icity/item/xjwjb?reg_code=610112006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/weiyanghu/icity/item/wyhjb?reg_code=610112007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhangjiabao/icity/item/zjbjb?reg_code=610112008000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/daminggong/icity/item/dmgjb?reg_code=610112009000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/liucunbao/icity/item/lcbjb?reg_code=610112010000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_5\" style=\"display:"+xayt_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/dengjiapo/icity/item/djpjb?reg_code=610113001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/qujiangjie/icity/item/qjjjb?reg_code=610113002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/dayanta/icity/item/dytjb?reg_code=610113003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiaozhailu/icity/item/xzljb?reg_code=610113004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/changyanbao/icity/item/cybjb?reg_code=610113005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/dianzicheng/icity/item/dzcjb?reg_code=610113006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhanghuzhai/icity/item/zhzjb?reg_code=610113007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/duchengjie/icity/item/dcjjb?reg_code=610113008000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_6\" style=\"display:"+xayl_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinhualu/icity/item/xhljb?reg_code=610114001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/guanshanzhen/icity/item/gsz?reg_code=610114002000/'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wutunzhen/icity/item/wtz?reg_code=610114003000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/beitunjie/icity/item/btjjb?reg_code=610114004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinxingjie/icity/item/xxjjb?reg_code=610114005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhenxingjie/icity/item/zxjjb?reg_code=610114006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/fenghuanglu/icity/item/fhljb?reg_code=610114007000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_7\" style=\"display:"+xalt_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xuyangjie/icity/item/xyjjb?reg_code=610115001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/renzongjie/icity/item/rzjjb?reg_code=610115002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/liyangjie/icity/item/lyjjb?reg_code=610115003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/youhuaijie/icity/item/yhjjb?reg_code=610115004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/renliujie/icity/item/rljjb?reg_code=610115005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/hezhaijie/icity/item/hzjjb?reg_code=610115006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/lishanjie/icity/item/lsjjb?reg_code=610115007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/muzhaijie/icity/item/mzjjb?reg_code=610115008000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiaojinjie/icity/item/xjjjb?reg_code=610115009000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinfengjie/icity/item/xfjjb?reg_code=610115010000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinshijie/icity/item/xsjjb?reg_code=610115011000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiekoujie/icity/item/xkjjb?reg_code=610115012000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/daiwangjie/icity/item/dwjjb?reg_code=610115013000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiquanjie/icity/item/xiquanjiejb?reg_code=610115014000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jiaokoujie/icity/item/jkjjb?reg_code=610115015000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/lingkoujie/icity/item/lkjjb?reg_code=610115016000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/beitianjie/icity/item/beitianjie?reg_code=610115017000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/tielujie/icity/item/tljjb?reg_code=610115018000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiangqiaojie/icity/item/xiangqiaojiejb?reg_code=610115019000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/qinlingjie/icity/item/qljjb?reg_code=610115020000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xingzhejie/icity/item/xzjjb?reg_code=610115021000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yujinjie/icity/item/yjjjb?reg_code=610115022000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/maejie/icity/item/mejjb?reg_code=610115023000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_8\" style=\"display:"+xaca_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yinzhen/icity/item/yz?reg_code=610116001000'\">??????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wutaijie/icity/item/wtjjb?reg_code=610116002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/dazhaojie/icity/item/dzjjb?reg_code=610116003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wangmangjie/icity/item/wmjjb?reg_code=610116004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/duqujie/icity/item/dqjjb?reg_code=610116005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/weiqujie/icity/item/weiqujiejb?reg_code=610116006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/ziwujie/icity/item/zwjjb?reg_code=610116007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/paolijie/icity/item/pljjb?reg_code=610116008000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yangzhuangjie/icity/item/yzjjb?reg_code=610116009000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/weizhaijie/icity/item/wzjjb?reg_code=610116010000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/luanzhen/icity/item/lzjb?reg_code=610116011000'\">??????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/guodujie/icity/item/gdjjb?reg_code=610116012000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/mingdujie/icity/item/mdjjb?reg_code=610116013000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/huangliangjie/icity/item/hljjb?reg_code=610116014000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/taiyigong/icity/item/tygjb?reg_code=610116015000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wangqujie/icity/item/wangqujiejb?reg_code=610116016000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_9\" style=\"display:"+xahy_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/gantinjie/icity/item/gtjjb?reg_code=610125001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yuxiazhen/icity/item/yxz?reg_code=610125002000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zuanzhen/icity/item/zaz?reg_code=610125003000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jiangcunzhen/icity/item/jcz?reg_code=610125004000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/laodianzhen/icity/item/ldz?reg_code=610125005000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/ganhezhen/icity/item/ghz?reg_code=610125006000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/shijingzhen/icity/item/sjz?reg_code=610125007000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/weifengzhen/icity/item/wfz?reg_code=610125008000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yuchanzhen/icity/item/ycz?reg_code=610125009000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wuzhuzhen/icity/item/wzz?reg_code=610125010000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jingquguanliju/icity/item/jqglj?reg_code=610125011000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_10\" style=\"display:"+xagl_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/chonghuangjie/icity/item/chjjb?reg_code=610126001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhangbujie/icity/item/zhangbujjb?reg_code=610126002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jingweijie/icity/item/jwjjb?reg_code=610126003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jijiajie/icity/item/jjjjb?reg_code=610126004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/tongyuanjie/icity/item/tyjjb?reg_code=610126005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/luyuanjie/icity/item/luyuanjiejb?reg_code=610126006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/gengzhen/icity/item/gz?reg_code=610126007000'\">??????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_11\" style=\"display:"+xaltx_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/languanjie/icity/item/lgjjb?reg_code=610122001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/huaxuzhen/icity/item/hxz?reg_code=610122002000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiehuzhen/icity/item/xhz?reg_code=610122003000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/sanlizhen/icity/item/slz?reg_code=610122004000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/puhuazhen/icity/item/phz?reg_code=610122005000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yushanzhen/icity/item/ysz?reg_code=610122005000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/ancunzhen/icity/item/acz?reg_code=610122007000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/qianweizhen/icity/item/qwz?reg_code=610122008000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/mengcunzhen/icity/item/mcz?reg_code=610122009000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/tangyuzhen/icity/item/tyz?reg_code=610122010000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiaozhaizhen/icity/item/xzz?reg_code=610122011000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jiaodaizhen/icity/item/jdz?reg_code=610122012000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/houzhen/icity/item/hz?reg_code=610122013000'\">??????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/sanguanmiao/icity/item/sgmz?reg_code=610122014000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/bayuanzhen/icity/item/byz?reg_code=610122015000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jiujianfang/icity/item/jjfz?reg_code=610122016000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/lanqiao/icity/item/lqz?reg_code=610122017000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wangchuanzhen/icity/item/wcz?reg_code=610122018000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/gepaizhen/icity/item/gpz?reg_code=610122019000'\">?????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_12\" style=\"display:"+xazz_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/erqujie/icity/item/eqjjb?reg_code=610124001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yabaizhen/icity/item/ybz?reg_code=610124002000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/louguanzhen/icity/item/lgz?reg_code=610124003000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/shangcunzhen/icity/item/scz?reg_code=610124004000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/mazhaozhen/icity/item/mzz?reg_code=610124005000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhongnanzhen/icity/item/znz?reg_code=610124006000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jixianzhen/icity/item/jxz?reg_code=610124007000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/guangjizhen/icity/item/gjz?reg_code=610124008000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/qinghuazhen/icity/item/qhz?reg_code=610124009000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhuyuzhen/icity/item/zyz?reg_code=610124010000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/cuifengzhen/icity/item/cfz?reg_code=610124011000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/situnzhen/icity/item/stz?reg_code=610124012000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/furenzhen/icity/item/frz?reg_code=610124013000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/sizhuzhen/icity/item/szz?reg_code=610124014000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/jiufengzhen/icity/item/jfz?reg_code=610124015000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/luoyuzhen/icity/item/lyz?reg_code=610124016000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/houzhenzizhen/icity/item/hzzz?reg_code=610124017000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/chenhezhen/icity/item/chz?reg_code=610124018000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/banfangzizhen/icity/item/bfzz?reg_code=610124019000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wangjiahezhen/icity/item/wjhz?reg_code=610124020000'\">????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_14\" style=\"display:"+xagx_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/yuhuazhai/icity/item/yhzjb?reg_code=610152001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/zhangbajie/icity/item/zbjjb?reg_code=610152002000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/dongdajie/icity/item/ddjjb?reg_code=610152003000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xiliujie/icity/item/xiliujiejb?reg_code=610152004000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinglongjie/icity/item/xinglongjiejb?reg_code=610152005000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/wuxingjie/icity/item/wxjjb?reg_code=610152006000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/lingzhaojie/icity/item/lzjjb?reg_code=610152007000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/caotangzhen/icity/item/ctz?reg_code=610152008000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/qinduzhen/icity/item/qdz?reg_code=610152009000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/pangguangzhen/icity/item/pgz?reg_code=610152010000'\">?????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<ul id=\"ban_0_17\" style=\"display:"+xagw_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinzhujie/icity/item/xzjjb?reg_code=610155001000'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xa.gov.cn/xinhejie/icity/item/xhjjb?reg_code=610155002000'\">???????????????<\/a><\/li>");
document.writeln("		<\/ul>");
document.writeln("		<\/div>");

document.writeln("<!----?????????----><div class=\"ban_inner\" id=\"ban_5\" style=\"display:"+ya_disp+";\">");
document.writeln("        <ul id=\"ban_5_0\" style=\"display:"+yabt_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602001000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E5%25AE%259D%25E5%25A1%2594%25E5%25B1%25B1%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602002000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E5%258D%2597%25E5%25B8%2582%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602003000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E5%2587%25A4%25E5%2587%25B0%25E5%25B1%25B1%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602005000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E6%25A1%25A5%25E6%25B2%259F%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602004000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E6%259E%25A3%25E5%259B%25AD%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602102000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E6%25B2%25B3%25E5%25BA%2584%25E5%259D%25AA%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602103000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E6%259D%258E%25E6%25B8%25A0%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602104000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E5%25A7%259A%25E5%25BA%2597%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602105000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E9%259D%2592%25E5%258C%2596%25E7%25A0%25AD%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602106000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E8%259F%25A0%25E9%25BE%2599%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602107000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E6%259F%25B3%25E6%259E%2597%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602108000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E5%258D%2597%25E6%25B3%25A5%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602109000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E4%25B8%25B4%25E9%2595%2587'\">??????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602110000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E7%2594%2598%25E8%25B0%25B7%25E9%25A9%25BF%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602200000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E5%25B7%259D%25E5%258F%25A3%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602202000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E5%2586%25AF%25E5%25BA%2584%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602205000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E9%25BA%25BB%25E6%25B4%259E%25E5%25B7%259D%25E4%25B9%25A1'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610602208000&cityName=%25E5%25AE%259D%25E5%25A1%2594%25E5%258C%25BA%2520%25C2%25B7%2520%25E4%25B8%2587%25E8%258A%25B1%25E5%25B1%25B1%25E4%25B9%25A1'\">????????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("		</ul>");
document.writeln("        <ul id=\"ban_5_1\" style=\"display:"+yaas_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603001000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%259C%259F%25E6%25AD%25A6%25E6%25B4%259E%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603002000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258C%25BA%2520%25C2%25B7%2520%25E9%2587%2591%25E6%2598%258E%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603003000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2599%25BD%25E5%259D%25AA%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603101000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%25A0%2596%25E7%25AA%2591%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603102000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258C%25BA%2520%25C2%25B7%2520%25E6%25B2%25BF%25E6%25B2%25B3%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603103000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%258B%259B%25E5%25AE%2589%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603104000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%258C%2596%25E5%25AD%2590%25E5%259D%25AA%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603105000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%259D%25AA%25E6%25A1%25A5%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603106000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25BB%25BA%25E5%258D%258E%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603107000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%25AB%2598%25E6%25A1%25A5%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610603108000&cityName=%25E5%25AE%2589%25E5%25A1%259E%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2595%25B0%25E5%2588%2580%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("        <ul id=\"ban_5_8\" style=\"display:"+yawq_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/workService/new-street-list.do?cityCode=610626001000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%2590%25B4%25E8%25B5%25B7%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/workService/new-street-list.do?cityCode=610626101000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2593%2581%25E8%25BE%25B9%25E5%259F%258E%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/workService/new-street-list.do?cityCode=610626102000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%2591%25A8%25E6%25B9%25BE%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/workService/new-street-list.do?cityCode=610626103000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2599%25BD%25E8%25B1%25B9%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/workService/new-street-list.do?cityCode=610626104000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2595%25BF%25E5%25AE%2598%25E5%25BA%2599%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/workService/new-street-list.do?cityCode=610626105000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2595%25BF%25E5%259F%258E%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610626106000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%25C2%25B7%25E4%25BA%2594%25E8%25B0%25B7%25E5%259F%258E%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610626107000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%25C2%25B7%25E5%2590%25B4%25E4%25BB%2593%25E5%25A0%25A1%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610626108000&cityName=%25E5%2590%25B4%25E8%25B5%25B7%25E5%258E%25BF%25C2%25B7%25E5%25BA%2599%25E6%25B2%259F%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("        <ul id=\"ban_5_9\" style=\"display:"+yazd_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625001000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25BF%259D%25E5%25AE%2589%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625101000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%259D%258F%25E6%25B2%25B3%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625102000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%25A1%25BA%25E5%25AE%2581%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625103000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%2597%25A6%25E5%2585%25AB%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625104000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2587%2591%25E4%25B8%2581%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625105000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%25B0%25B8%25E5%25AE%2581%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625106000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25B9%2589%25E6%25AD%25A3%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610625107000&cityName=%25E5%25BF%2597%25E4%25B8%25B9%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%258F%258C%25E6%25B2%25B3%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("        <ul id=\"ban_5_10\" style=\"display:"+yazc_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623001000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2593%25A6%25E7%25AA%2591%25E5%25A0%25A1%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623101000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%259D%25A8%25E5%25AE%25B6%25E5%259B%25AD%25E5%2588%2599%25E9%2595%2587'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623102000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%258E%2589%25E5%25AE%25B6%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623103000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25AE%2589%25E5%25AE%259A%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623104000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%25A9%25AC%25E5%25AE%25B6%25E7%25A0%25AD%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623105000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%258D%2597%25E6%25B2%259F%25E5%25B2%2594%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623106000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%25B6%25A7%25E5%25B3%25AA%25E5%25B2%2594%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623107000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%259D%258E%25E5%25AE%25B6%25E5%25B2%2594%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610623108000&cityName=%25E5%25AD%2590%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25BD%2599%25E5%25AE%25B6%25E5%259D%25AA%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_11\" style=\"display:"+yayc_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622001000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25A4%25A7%25E7%25A6%25B9%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622101000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%25B0%25B8%25E5%259D%25AA%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622102000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25BB%25B6%25E6%25B0%25B4%25E5%2585%25B3%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622103000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%2596%2587%25E5%25AE%2589%25E9%25A9%25BF%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622104000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%259D%25A8%25E5%25AE%25B6%25E5%259C%25AA%25E5%258F%25B0%25E9%2595%2587'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622105000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E8%25B4%25BE%25E5%25AE%25B6%25E5%259D%25AA%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622108000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25B9%25BE%25E5%259D%25A4%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610622107000&cityName=%25E5%25BB%25B6%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%2585%25B3%25E5%25BA%2584%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_12\" style=\"display:"+yaycx_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621001000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25B8%2583%25E9%2587%258C%25E6%259D%2591%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621101000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%25BB%2591%25E5%25AE%25B6%25E5%25A0%25A1%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621102000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2583%2591%25E5%25BA%2584%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621103000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25BC%25A0%25E5%25AE%25B6%25E6%25BB%25A9%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621104000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25BA%25A4%25E5%258F%25A3%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621106000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%259B%25B7%25E8%25B5%25A4%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621107000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%25BD%2597%25E5%25AD%2590%25E5%25B1%25B1%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610621108000&cityName=%25E5%25BB%25B6%25E9%2595%25BF%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25AE%2589%25E6%25B2%259F%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_7\" style=\"display:"+yagq_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610627001000&cityName=%25E7%2594%2598%25E6%25B3%2589%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%25BE%258E%25E6%25B0%25B4%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610627101000&cityName=%25E7%2594%2598%25E6%25B3%2589%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25B8%258B%25E5%25AF%25BA%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610627102000&cityName=%25E7%2594%2598%25E6%25B3%2589%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2581%2593%25E9%2595%2587'\">??????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610627103000&cityName=%25E7%2594%2598%25E6%25B3%2589%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%259F%25B3%25E9%2597%25A8%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610627200000&cityName=%25E7%2594%2598%25E6%25B3%2589%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%25A1%25A5%25E9%2595%2587%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610627203000&cityName=%25E7%2594%2598%25E6%25B3%2589%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%258A%25B3%25E5%25B1%25B1%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_6\" style=\"display:"+yzfx_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628101000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%25BE%258A%25E6%25B3%2589%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628102000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25BC%25A0%25E6%259D%2591%25E9%25A9%25BF%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628103000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25BC%25A0%25E5%25AE%25B6%25E6%25B9%25BE%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628104000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%259B%25B4%25E7%25BD%2597%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628001000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E8%258C%25B6%25E5%259D%258A%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628106000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2589%259B%25E6%25AD%25A6%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628109000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25AF%25BA%25E4%25BB%2599%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610628204000&cityName=%25E5%25AF%258C%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%258C%2597%25E9%2581%2593%25E5%25BE%25B7%25E4%25B9%25A1'\">????????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_4\" style=\"display:"+yayic_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610630001000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25B8%25B9%25E5%25B7%259E%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610630101000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%25A7%258B%25E6%259E%2597%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610630102000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25BA%2591%25E5%25B2%25A9%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610630104000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%259B%2586%25E4%25B9%2589%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610630200000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E8%258B%25B1%25E6%2597%25BA%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610630201000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25BA%25A4%25E9%2587%258C%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610630105000&cityName=%25E5%25AE%259C%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25A3%25B6%25E5%258F%25A3%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_5\" style=\"display:"+yalc_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629001000c&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%2587%25A4%25E6%25A0%2596%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629101000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%2597%25A7%25E5%258E%25BF%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629102000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25BA%25A4%25E5%258F%25A3%25E6%25B2%25B3%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629103000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E8%2580%2581%25E5%25BA%2599%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629104000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%259C%259F%25E5%259F%25BA%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629105000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%259F%25B3%25E5%25A4%25B4%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629106000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%25A7%2590%25E6%259F%258F%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629200000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E8%258F%25A9%25E5%25A0%25A4%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610629107000&cityName=%25E6%25B4%259B%25E5%25B7%259D%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%25B0%25B8%25E4%25B9%25A1%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_2\" style=\"display:"+yahl_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610632001000&cityName=%25E9%25BB%2584%25E9%2599%25B5%25E5%258E%25BF%2520%25C2%25B7%2520%25E6%25A1%25A5%25E5%25B1%25B1%25E8%25A1%2597%25E9%2581%2593%25E5%258A%259E%25E4%25BA%258B%25E5%25A4%2584'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610632101000&cityName=%25E9%25BB%2584%25E9%2599%25B5%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25BA%2597%25E5%25A4%25B4%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610632102000&cityName=%25E9%25BB%2584%25E9%2599%25B5%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%259A%2586%25E5%259D%258A%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610632103000&cityName=%25E9%25BB%2584%25E9%2599%25B5%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2594%25B0%25E5%25BA%2584%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610632104000&cityName=%25E9%25BB%2584%25E9%2599%25B5%25E5%258E%25BF%2520%25C2%25B7%2520%25E9%2598%25BF%25E5%2585%259A%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610632105000&cityName=%25E9%25BB%2584%25E9%2599%25B5%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%258F%258C%25E9%25BE%2599%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("       <ul id=\"ban_5_3\" style=\"display:"+yahlx_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610631100000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%259F%25B3%25E5%25A0%25A1%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610631101000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2599%25BD%25E9%25A9%25AC%25E6%25BB%25A9%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610631102000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2593%25A6%25E5%25AD%2590%25E8%25A1%2597%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610631106000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF%2520%25C2%25B7%2520%25E7%2595%258C%25E5%25A4%25B4%25E5%25BA%2599%25E9%2595%2587'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610631107000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF%2520%25C2%25B7%2520%25E4%25B8%2589%25E5%25B2%2594%25E9%2595%2587'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610631205000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%259C%25AA%25E5%258F%25B0%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yanan.gov.cn/bsdt/workService/new-street-list.do?cityCode=610631206000&cityName=%25E9%25BB%2584%25E9%25BE%2599%25E5%258E%25BF%2520%25C2%25B7%2520%25E5%25B4%25BE%25E5%25B4%2584%25E4%25B9%25A1'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("		<\/div>");

document.writeln("<!----?????????----><div class=\"ban_inner\" id=\"ban_2\" style=\"display:"+yls_disp+";\">");
document.writeln("        <ul id=\"ban_2_2\" style=\"display:"+xyxp_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481001000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481002000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481003000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481005000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481004000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481102000'\">??????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481104000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481105000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481109000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481101000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481108000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610481107000'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("        <ul id=\"ban_2_10\" style=\"display:"+xych_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430001000'\">????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430101000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430103000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430104000'\">??????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430105000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430106000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430107000'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.xys.gov.cn/wsbs/wsbs.do?method=xzbs&areacode=610430109000'\">????????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("		<\/div>");

document.writeln("<!----????????????----><div class=\"ban_inner\" id=\"ban_11\" style=\"display:"+pcjg_disp+";\">");
document.writeln("        <ul id=\"ban_11_2\" style=\"display:"+qh_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zw.xixianxinqu.gov.cn/zhoulingjiedao/icity/zhouling?orgCode=61701001'\">????????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("		<\/div>");

document.writeln("<!----?????????----><div class=\"ban_inner\" id=\"ban_10\" style=\"display:"+yls_disp+";\">");
document.writeln("        <ul id=\"ban_10_0\" style=\"display:"+ylq_disp+";\"  class=\"baner\">");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yangling.gov.cn/dazhai/public/index'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yangling.gov.cn/ylj/public/index'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yangling.gov.cn/litai/public/index'\">???????????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yangling.gov.cn/wuquan/public/index'\">?????????<\/a><\/li>");
document.writeln("			<li><a target=\"_top\" onclick=\"javascript:window.location.href='http://zwfw.yangling.gov.cn/rougu/public/index'\">?????????<\/a><\/li>");
document.writeln("		</ul>");
document.writeln("		<\/div>");
document.writeln("<\/div>");
document.writeln("<!----------------------------?????? end------------------------------------>");


document.writeln("<\/div><\/div>")
document.writeln("<a id=\"hreftag\"></a>");