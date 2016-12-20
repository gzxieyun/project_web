/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'zhanggui3\'">' + entity + '</span>' + html;
	}
	var icons = {
		'ico-ol-banner-left': '&#xe915;',
		'ico-ol-banner-right': '&#xe919;',
		'ico-ol-news-down': '&#xe91a;',
		'ico-ol-news-up': '&#xe91b;',
		'ico-dot': '&#xe918;',
		'ico-after': '&#xe916;',
		'ico-before2': '&#xe917;',
		'ico-ol_add': '&#xe900;',
		'ico-ol_arrow': '&#xe901;',
		'ico-ol_choose': '&#xe902;',
		'ico-ol_email': '&#xe903;',
		'ico-ol_fax': '&#xe904;',
		'ico-ol_footer_phone': '&#xe905;',
		'ico-ol_footer_qq': '&#xe906;',
		'ico-ol_home': '&#xe907;',
		'ico-ol_information': '&#xe908;',
		'ico-ol_label_bao': '&#xe909;',
		'ico-ol_label_ma': '&#xe90a;',
		'ico-ol_label_phone': '&#xe90b;',
		'ico-ol_label_problem': '&#xe90c;',
		'ico-ol_label_top': '&#xe90d;',
		'ico-ol_location': '&#xe90e;',
		'ico-ol_ma': '&#xe90f;',
		'ico-ol_nochoose': '&#xe910;',
		'ico-ol_phone': '&#xe911;',
		'ico-ol_qq': '&#xe912;',
		'ico-ol_tap': '&#xe913;',
		'ico-ol_time': '&#xe914;',
		'ico-zg_downward': '&#xe957;',
		'ico-zg_fenlei_all_0': '&#xe958;',
		'ico-zg_fenlei_all_1': '&#xe959;',
		'ico-zg_fenlei_appliances_0': '&#xe95a;',
		'ico-zg_fenlei_appliances_1': '&#xe95b;',
		'ico-zg_fenlei_bag_0': '&#xe95c;',
		'ico-zg_fenlei_bag_1': '&#xe95d;',
		'ico-zg_fenlei_camera_0': '&#xe95e;',
		'ico-zg_fenlei_camera_1': '&#xe95f;',
		'ico-zg_fenlei_dress_0': '&#xe960;',
		'ico-zg_fenlei_dress_1': '&#xe961;',
		'ico-zg_fenlei_food_0': '&#xe962;',
		'ico-zg_fenlei_food_1': '&#xe963;',
		'ico-zg_fenlei_household_0': '&#xe964;',
		'ico-zg_fenlei_household_1': '&#xe965;',
		'ico-zg_fenlei_outdoor_0': '&#xe966;',
		'ico-zg_fenlei_outdoor_1': '&#xe967;',
		'ico-zg_fenlei_skin_0': '&#xe968;',
		'ico-zg_fenlei_skin_1': '&#xe969;',
		'ico-zg_fenlei_tie_0': '&#xe96a;',
		'ico-zg_fenlei_tie_1': '&#xe96b;',
		'ico-zg_lianxi_phone': '&#xe96c;',
		'ico-zg_lianxi_service': '&#xe96d;',
		'ico-zg_mouse': '&#xe96e;',
		'ico-zg_qrcode': '&#xe96f;',
		'ico-zg_search': '&#xe970;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ico-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
