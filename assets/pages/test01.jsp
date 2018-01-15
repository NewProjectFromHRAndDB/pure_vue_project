<%@ page language="java" contentType="text/html; charset=GB18030" pageEncoding="GB18030"%>
<!DOCTYPE html>
<html>
<head>
	<title>运营拍档</title>
	<link rel="stylesheet" type="text/css" href="../css/reset.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../css/zxx.lib.css">
	<link rel="stylesheet" type="text/css" href="../css/element.css">
	<link rel="stylesheet" type="text/css" href="../css/app.css">
</head>
<body class="fw f14">
	<div class="header-box navbar">
		<div class="container">
			<div class="navbar-header">
				<button class="navbar-toggle collapsed" id="oscar-nav-btn" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="../" class="navbar-brand">
					<div class="logo2"><!-- 运营拍档 --></div>
				</a>
			</div><!-- /navbar-header -->
			<nav class="navbar-collapse collapse" id="bs-nav">
				<ul class="nav navbar-nav navbar-right">
					<li>
						<a class="fix" href="javascript:;">
							<span class="glyphicon glyphicon-volume-up l mt3"></span>
							<span class="f12 l mt1 ml5">(0)</span>
						</a>
					</li>
					<li>
						<a class="glyphicon glyphicon-cog" href="javascript:;"></a>
					</li>
					<li>
						<a class="f12" href="javascript:;">
							<span>oscar@outlook.com</span>
							<span class="glyphicon glyphicon-triangle-top oscar-arrow frame-duration"></span>
							<div class="dada abs ovh">
								<div class="dada-item">
									<span class="glyphicon glyphicon-user"></span>
									<span class="ml5">个人中心</span>
								</div>
								<div class="dada-item">
									<span class="glyphicon glyphicon-off"></span>
									<span class="ml5">退出</span>
								</div>
							</div><!-- /dada -->
						</a>
					</li>
				</ul>
			</nav>
			<div class="dada2 abs ovh f12">
				<div class="dada-item">
					<span class="glyphicon glyphicon-user"></span>
					<span class="ml5">个人中心</span>
				</div>
				<div class="dada-item">
					<span class="glyphicon glyphicon-off"></span>
					<span class="ml5">退出</span>
				</div>
			</div><!-- /dada -->
		</div><!-- /container -->
	</div><!-- /header-box -->

	<div class="left-sidebar">
		<a id="menu-toggle-btn" class="abs db el-icon-arrow-left menu-toggle-btn f12 tc" href="javascript:;"></a>
		<div id="menu-box">
			<big-tree default-active="1-2-1"></big-tree>
		</div>
	</div><!-- /left-sidebar -->

	<div class="main-box">
		<div class="main-container">
			asdfasdfasdf
		</div><!-- main-container -->
	</div><!-- /main-box -->

	<script src="../lib/jquery-3.2.1.min.js"></script>
	<script src="../lib/vue.min.js"></script>
	<script src="../lib/element.js"></script>
	<script>
		$('#oscar-nav-btn').click(function () {
			$('.dada2').toggle();
		});

		$('#menu-toggle-btn').click(function () {
			var left = $('.left-sidebar'),
				main = $('.main-box'),
				$this = $(this);
			if (left.hasClass('damin')) {
				left.removeClass('damin').css('left', '0');
				main.css('padding-left', '240px');
				setTimeout(function () {
					$this.removeClass('menu-toggle-bg').css({"right": "0", "transform": "rotateY(0)"});
				}, 300);
			} else {
				left.addClass('damin').css('left', '-240px');
				main.css('padding-left', 0);
				setTimeout(function () {
					$this.addClass('menu-toggle-bg').css({"right": "-26px", "transform": "rotateY(180deg)"});
				}, 300);
			}
		});

		var myData = [
			{
				'index': '1',
				'menuName': '基础管理',
				'children': [
					{ 'index': '1-1', 'menuName': '用户管理', 'url': 'http://www.bing.com' },
					{
						'index': '1-2',
						'menuName': '角色管理',
						'children': [
							{ 'menuName': '管理员', 'index': '1-2-1', 'url': 'http://www.baidu.com'},
							{ 'menuName': 'CEO', 'index': '1-2-2', 'url': 'http://www.sina.com'}
						]
					},
					{ 'index': '1-3', 'menuName': '权限管理', 'url': 'http://www.xcar.com.cn'}
				]
			},
			{
				'index': '2',
				'menuName': '商品管理',
				'url': 'http://www.google.com'
			},
			{
				'index': '3',
				'menuName': '订单管理',
				'children': [
					{
						'index': '3-1',
						'menuName': '订单列表',
						'url': 'http://www.yahoo.com'
					},
					{
						'index': '3-2',
						'menuName': '退货列表',
						'url': 'http://www.sina.com'
					}
				]
			},
			{
				'index': '4',
				'menuName': '商家管理'
			}
		];

		// 定义树节点
		var treeMenuTemplate = [];
		treeMenuTemplate.push('<li class="el-submenu" :class="[open ? \'is-opened\': \'\', selected ? \'is-active\':\'\']">');
		treeMenuTemplate.push('<a class="db el-submenu__title" :id="model.index" @click="toggle" v-menu-animation="open" :style="{paddingLeft: paddingLeft + \'px\'}" :href="getUrl">');
		treeMenuTemplate.push('<i class="el-icon-message" v-if="level == 1"></i>');
		treeMenuTemplate.push('<template v-if="hasChildren()">');
		treeMenuTemplate.push('<i class="el-submenu__icon-arrow" :class="[open ? \'el-icon-arrow-up\': \'el-icon-arrow-down\']"></i>');
		treeMenuTemplate.push('</template>');
		treeMenuTemplate.push('{{ model.menuName }}');
		treeMenuTemplate.push('</a>');
		treeMenuTemplate.push('<ul class="el-menu" :class="[open ? \'\' : \'dn\']" v-if="hasChildren()">');
		treeMenuTemplate.push('<tree-menu v-for="item in model.children" :model="item" :level="level + 1" :theId="theId"></tree-menu>');
		treeMenuTemplate.push('</ul>');
		treeMenuTemplate.push('</li>');

		var treeMenu = Vue.component('tree-menu', {
			template: treeMenuTemplate.join(''),

			created: function () {
				var index = this.model.index;
				var hasIndex = this.theId.search(index);
				var lala = index.replace(this.theId, '');
				if (hasIndex == 0) {
					this.open = true;
				}
				if (hasIndex == 0 && lala.length == 0) {
					this.selected = true;
				}
			},

			props: ['model', 'level', 'theId'],

			computed: {
				getUrl: function () {
					if (this.hasChildren()) {
						return "javascript:;";
					}
					return this.model.url;
				}
			},

			data: function () {
				return {
					open: false,
					paddingLeft: this.level * 20,
					selected: false
				};
			},

			methods: {
				hasChildren: function () {
					return this.model.children && this.model.children.length;
				},

				toggle: function () {
					if (this.hasChildren()) {
						this.open = !this.open;
					}
				}
			}

		});

		Vue.directive('menu-animation', function (el, binding) {
			var open = (binding.value);
			var ulElement = $(el).parent().children('ul');
			if (open) {
				ulElement.slideDown(200);
			} else {
				ulElement.slideUp(200);
			}
		});

		// 定义外围树
		var bigTreeTemplate = [];
		bigTreeTemplate.push('<div class="tree-menu">');
		bigTreeTemplate.push('<ul v-for="menuItem in theModel" class="el-menu">');
		bigTreeTemplate.push('<tree-menu :model="menuItem" :level="theLevel" :theId="defaultActive"></tree-menu>');
		bigTreeTemplate.push('</ul>');
		bigTreeTemplate.push('</div>');

		Vue.component('big-tree', {
			template: bigTreeTemplate.join(''),

			props: ['defaultActive'],

			created: function () {},

			data: function () {
				return {
					theModel: myData,
					theLevel: 1
				};
			},

			components: {
				'tree-menu': treeMenu
			}
		});

		new Vue({
			el: '#menu-box'
		});

	</script>
</body>
</html>
