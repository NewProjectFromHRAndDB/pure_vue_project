//axios默认设置cookie
axios.defaults.withCredentials = true;
//lxy
$("#shengshizs").hide();
$("#zddwxx").hide();
var vm = new Vue({
    el: "#app",
    data: {
        //坐标转换
        PI: 3.14159265358979324,
        x_pi: 3.14159265358979324 * 3000.0 / 180.0,
        loading: false,
        //点击重点单位标记上次画的圆
        circle: new BMap.Circle(),
        city: '',
        circlez: [],
        marker: [],
        clusterer: null,
        //路况
        ctrl: '',
        marker1: '',
        marker2: '',
        marker3: '',
        isTrafficOpen: '1',
        uuid: '',
        zddwzs: '',
        zddwxx: [],
        markerData: [],
        ShengZddwDate: [],
        ShiZddwDate: [],
        zzData: [],
        syData: [],
        clData: [],
        citys: [],
        zdd: '',
        shuiData: [],
        form: {
            delivery1: true,
            delivery2: true,
            delivery3: true
        },
        options: [
            { value: '北京', label: '北京' },
            { value: '天津', label: '天津' },
            { value: '河北', label: '河北' },
            { value: '山西', label: '山西' },
            { value: '内蒙古', label: '内蒙古' },
            { value: '辽宁', label: '辽宁' },
            { value: '吉林', label: '吉林' },
            { value: '黑龙江', label: '黑龙江' },
            { value: '上海', label: '上海' },
            { value: '江苏', label: '江苏' },
            { value: '浙江省', label: '浙江省' },
            { value: '安徽', label: '安徽' },
            { value: '福建', label: '福建' },
            { value: '江西', label: '江西' },
            { value: '山东', label: '山东' },
            { value: '河南', label: '河南' },
            { value: '湖北', label: '湖北' },
            { value: '湖南', label: '湖南' },
            { value: '广东', label: '广东' },
            { value: '广西', label: '广西' },
            { value: '海南', label: '海南' },
            { value: '重庆', label: '重庆' },
            { value: '四川', label: '四川' },
            { value: '贵州', label: '贵州' },
            { value: '云南', label: '云南' },
            { value: '西藏', label: '西藏' },
            { value: '陕西', label: '陕西' },
            { value: '甘肃省', label: '甘肃省' },
            { value: '青海', label: '青海' },
            { value: '宁夏', label: '宁夏' },
            { value: '新疆', label: '新疆' }],
        selectedOptions: [],
        selectedOptions2: [],
        tableData: [],
        planData: {
            yaid_1: '',
            yaid_2: '',
            yaid_3: ''
        },
        planList: {},
        infoData: {},
        dwdzData: {},
        xfzrrData: {},
        zbdhData: {},
        fhdjData: {},
        xfdzData: {},
        yajbData: {},
        //消防水源详细信息
        sylxmcData: {},
        qsxsData: {},
        symcData: {},
        kyztmcData: {},
        //消防队站详细信息
        dzmcData: {},
        dzlxmcData: {},
        lxdhData: {},
        dzjcData: {},
        dzdzData: {},
        //消防车辆详细信息
        cllxData: {},
        clmcData: {},
        clztData: {},
        cldzData: {},
        //微型消防站详细信息
        smallStation: [
            {
                gisX: 121.66985,
                gisY: 38.931901,
                xfzmc: '海防消防站'
            },
            {
                gisX: 121.68088,
                gisY: 38.928702,
                xfzmc: '香周消防站'
            },
            {
                gisX: 121.69166,
                gisY: 38.924014,
                xfzmc: '香工街消防站'
            },
            {
                gisX: 121.6025614549,
                gisY: 38.9372534900,
                xfzmc: '远东消防站'
            }
        ],
        //分页功能
        shengshizs: [],
        selqhmc: [],
        searchForm: {
            xzqh: '',
            xzqhmc: ''
        },
        //当前页
        currentPage: 1,
        //分页大小
        pageSize: 10,
        //预案信息总记录数
        total: 10,
        //序号
        indexData: 0,

        // db start
        //检索数据
        searchData: [],
        //消防库检索框输入
        searchCond: '',
        //百度库检索框输入
        searchBaiduCond: '',
        //检索来源
        searchSource: '搜索百度库',
        //当前城市
        myCity: ''
        // db end
    },
    mounted: function() {
        // var gis_X = this.GetQueryString("gis_X");
        // var gis_Y = this.GetQueryString("gis_Y");
        // var isSydj = this.GetQueryString("sydj");
        // if(isSydj == 1){
        //     var gisX = this.GetQueryString("gis_X");
        //     var gisY = this.GetQueryString("gis_Y");
        //     var zddw={
        //         gisX:gisX,
        //         gisY:gisY,
        //     };
        //     vm.drawMapc(zddw);
        // }
        this.getCity();
        document.title = this.city + '预案情况';
        this.getShengZddwDate();//省
    },
    methods:
    //获取重点单位信息
    {
        //当前页修改事件
        handleCurrentChange: function(val) {
            this.currentPage = val;
            var _self = this;
            // _self.loadingData(); //重新加载数据
        },
        getZddwxx: function (xzqh, uuid) {
            var params = { xzqh: xzqh, uuid: uuid };
            axios.post('/dpapi/importantunits/doSearchListByVO', params).then(function (res) {
                this.zddwxx = res.data.result;
                this.total = res.data.result.length;
                //lxy20180528
                $("#shengshizs").hide();
                $("#zddwxx").show();
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        shengshiClick: function (data) {

            var xzqh = data.xzqh;
            this.searchForm.xzqhmc = data.xzqhmc;
            this.selqhmc = this.shengshizs;
            var map = vm.map;
            vm.hideMarker(vm.province);
            vm.hideMarker(vm.cityp);
            var pt = new BMap.Point(data.gisX, data.gisY);
            //判断是省还是市
            if (xzqh.indexOf("0000") > 0) {
                //获取市下拉
                var params = {
                    xzqh: xzqh
                };
                axios.post('/dpapi/map/getShiMapByVO', params).then(function (res) {
                    this.shengshizs = res.data.result;
                    //获取焦点
                    map.centerAndZoom(pt, 7);
                    vm.drawMapa(this.shengshizs);
                    this.total = res.data.result.length;
                    $("#shengshizs").show();
                    $("#zddwxx").hide();

                }.bind(this), function (error) {
                    console.log(error);
                })
            } else {
                params = { xzqh: xzqh };
                axios.post('/dpapi/map/getImportantunitsVO', params).then(function (res) {
                    this.zddwxx = res.data.result;
                    //获取焦点
                    map.centerAndZoom(pt, 15);
                    vm.drawMapb(this.zddwxx);
                    this.total = res.data.result.length;
                    $("#shengshizs").hide();
                    $("#zddwxx").show();
                }.bind(this), function (error) {
                    console.log(error);
                })
                $("#shengshizs").hide();
                $("#zddwxx").show();
            }
        },
        zddwxxClick: function (zddwxx) {
            vm.drawMapc(zddwxx);
        },
        // //表格查询事件
        searchClick: function () {
            //选中的数据
            var bdata = this.searchForm.xzqhmc;
            var xzqh = bdata.xzqh;
            vm.shengshiClick(bdata);
            var params = {
                xzqh: xzqh
            };
            //判断是否为省
            if (xzqh.indexOf("0000") > 0) {
                axios.post('/dpapi/map/getShiMapByVO', params).then(function (res) {
                    this.total = res.data.result.length;
                    this.shengshizs = res.data.result;
                    $("#shengshizs").show();
                    $("#zddwxx").hide();
                }.bind(this), function (error) {
                    console.log(error);
                })
            } else {
                params = { xzqh: xzqh };
                axios.post('/dpapi/importantunits/doSearchZddwListByVO', params).then(function (res) {
                    this.zddwxx = res.data.result;
                    this.total = res.data.result.length;
                    $("#shengshizs").hide();
                    $("#zddwxx").show();
                }.bind(this), function (error) {
                    console.log(error);
                })
                $("#shengshizs").hide();
                $("#zddwxx").show();
            }
        },
        // lxy end
        getMarker1: function () {
            if (this.form.delivery1) {
                this.marker1.show();
            } else {
                this.marker1.hide();
            }
        },
        getMarker2: function () {
            if (this.form.delivery2) {
                this.marker2.show();
            } else {
                this.marker2.hide();
            }
        },
        getMarker3: function () {
            if (this.form.delivery3) {
                this.marker3.show();
            } else {
                this.marker3.hide();
            }
        },
        getCity: function () {
            var url = location.href;
            var tmp1 = url.split("?")[1];
            var city1 = tmp1.split("=")[1];
            this.city = decodeURI(city1);
        },
        //获取省范围的方法
        getBoundary: function (map) {
            var bdary = new BMap.Boundary();
            bdary.get(this.city, function (rs) { //获取行政区域
                var count = rs.boundaries.length; //行政区域的点有多少个
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 3, strokeColor: "#ff0000" }); //建立多边形覆盖物
                    ply.setFillColor("none");
                    map.addOverlay(ply); //添加覆盖物 map.setViewport(ply.getPath());调整视野 
                }
            });
        },
        //获取省份
        getShengZddwDate: function () {
            var params = {};
            axios.post('/dpapi/map/getMapByVO', params).then(function (res) {
                this.ShengZddwDate = res.data.result;
                this.total = res.data.result.length;
                //获取左侧省市的卡片数据
                this.shengshizs = res.data.result;
                //省市与重点单位详细切换
                $("#shengshizs").show();
                $("#zddwxx").hide();
                this.initMap();
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //获取城市
        getShiZddwDate: function (xzqh) {
            var params = {
                xzqh: xzqh
            };
            axios.post('/dpapi/map/getShiMapByVO', params).then(function (res) {
                this.ShiZddwDate = res.data.result;
                //分页，数据总数
                this.total = res.data.result.length;
                //省或者市的重点单位信息
                this.shengshizs = res.data.result;
                $("#shengshizs").show();
                $("#zddwxx").hide();
                this.drawMapa(res.data.result);
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //重点单位
        getQuZddwDate: function (xzqh) {
            var params = {
                xzqh: xzqh
            };
            axios.post('/dpapi/map/getImportantunitsVO', params).then(function (res) {
                this.markerData = res.data.result;
                this.drawMapb(this.markerData);
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //获取水源详情
        getSyDetails: function (uuid) {
            axios.get('/dpapi/xfsy/findlist' + this.uuid).then(function (res) {
                this.shuiData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //组织机构
        getJgidData: function () {
            var params = {};
            axios.post('/api/organization/getOrganizationtree', params).then(function (res) {
                this.zzData = res.data.result;
                if (this.zzData !== []) {
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //水源
        getSyData: function () {
            var map = vm.map;
            var bounds = map.getBounds();
            var xmin = bounds.getSouthWest().lng;
            var xmax = bounds.getNorthEast().lng;
            var ymin = bounds.getSouthWest().lat;
            var ymax = bounds.getNorthEast().lat;
            var params = {
                gisX_min: xmin,
                gisX_max: xmax,
                gisY_min: ymin,
                gisY_max: ymax
            }
            axios.post('/dpapi/xfsy/findlist', params).then(function (res) {
                this.syData = res.data.result;
                vm.createClusterbb();//聚合
                this.getSysj();
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //车辆
        getClData: function () {
            var map = vm.map;
            var bounds = map.getBounds();
            var xmin = bounds.getSouthWest().lng;
            var xmax = bounds.getNorthEast().lng;
            var ymin = bounds.getSouthWest().lat;
            var ymax = bounds.getNorthEast().lat;
            var params = {
                gisX_min: xmin,
                gisX_max: xmax,
                gisY_min: ymin,
                gisY_max: ymax
            }
            //车辆获取
            axios.post('/dpapi/fireengine/list', params).then(function (res) {
                this.clData = res.data.result;
                vm.createClustercc();//聚合
                this.getClsj();
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //获取重点单位//获取重点单位取不到
        getPoint: function () {
            var map = vm.map;
            var bounds = map.getBounds();
            var xmin = bounds.getSouthWest().lng;
            var xmax = bounds.getNorthEast().lng;
            var ymin = bounds.getSouthWest().lat;
            var ymax = bounds.getNorthEast().lat;
            var params = {
                gisX_min: xmin,
                gisX_max: xmax,
                gisY_min: ymin,
                gisY_max: ymax
            }
            axios.post('/dpapi/importantunits/list', params).then(function (res) {
                this.markerData = res.data.result;
                vm.createCluster();//聚合
                this.getZdsj();
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //队站
        getDzData: function () {
            var map = vm.map;
            var bounds = map.getBounds();
            var xmin = bounds.getSouthWest().lng;
            var xmax = bounds.getNorthEast().lng;
            var ymin = bounds.getSouthWest().lat;
            var ymax = bounds.getNorthEast().lat;
            var params = {
                gisX_min: xmin,
                gisX_max: xmax,
                gisY_min: ymin,
                gisY_max: ymax
            }
            axios.post('/dpapi/xfdz/list', params).then(function (res) {
                this.dzData = res.data.result;
                vm.createClusteraa();//聚合
                this.getDzsj();
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        initMap: function () {
            // db start
            // 百度地图API功能
            function G(id) {
                return document.getElementById(id);
            }
            var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                {
                    "input": "suggestId"
                    , "location": map
                });
            ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
                var str = "";
                var _value = e.fromitem.value;
                var value = "";
                if (e.fromitem.index > -1) {
                    value = _value.province + _value.city + _value.district + _value.street + _value.business;
                }
                str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                value = "";
                if (e.toitem.index > -1) {
                    _value = e.toitem.value;
                    value = _value.province + _value.city + _value.district + _value.street + _value.business;
                }
                str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                G("searchResultPanel").innerHTML = str;
            });

            var myValue;
            ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
                var _value = e.item.value;
                myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                this.myCity = _value.city;
                console.log(this.myCity);
                G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                setPlace();
            });

            function setPlace() {
                map.clearOverlays();    //清除地图上所有覆盖物
                function myFun() {
                    var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                    map.centerAndZoom(pp, 18);
                    map.addOverlay(new BMap.Marker(pp));    //添加标注
                }
                var local = new BMap.LocalSearch(map, { //智能搜索
                    onSearchComplete: myFun
                });
                local.search(myValue);
            }
            // db end

            var map = new BMap.Map("BMap", { enableMapClick: false });  //创建Map实例
            vm.map = map;
            // //声明mapType为2D
            // this.mapType = '2D';
            // 添加带有定位的导航控件
            var navigationControl = new BMap.NavigationControl({
                // 靠左上角位置
                anchor: BMAP_ANCHOR_TOP_LEFT,
                // LARGE类型
                type: BMAP_NAVIGATION_CONTROL_LARGE,
                // 启用显示定位
                enableGeolocation: true
            });
            map.addControl(navigationControl);
            // 添加定位控件
            var geolocationControl = new BMap.GeolocationControl();
            geolocationControl.addEventListener("locationSuccess", function (e) {
                // 定位成功事件
                var address = '';
                address += e.addressComponent.province;
                address += e.addressComponent.city;
                address += e.addressComponent.district;
                address += e.addressComponent.street;
                address += e.addressComponent.streetNumber;
                alert("当前定位地址为：" + address);
            });
            geolocationControl.addEventListener("locationError", function (e) {
                // 定位失败事件
                alert(e.message);
            });
            map.addControl(geolocationControl);
            map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);
            var top_left_control = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            });
            map.addControl(top_left_control);
            map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
            vm.createCluster();
            vm.drawMap();
            //经纬度的获取
            map.addEventListener("click", function (e) {
                document.getElementById('lat').value = e.point.lat;
                document.getElementById('lng').value = e.point.lng;
            });
            //重点单位从后台管理系统的跳转
            var isSydj = this.GetQueryString("sydj");
            if (isSydj == 1) {
                var zddw = "";
                var ID = this.GetQueryString("uuid");
                axios.get('/dpapi/importantunits/' + ID).then(function (res) {
                    zddw = res.data.result;
                    vm.drawMapc(zddw);
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
            //水源从后台管理系统的跳转
            var isShuidj = this.GetQueryString("shuidj");
            if (isShuidj == 1) {
                this.loading = true;
                var sy = "";
                var ID = this.GetQueryString("uuid");
                var sylx = this.GetQueryString("sylx");
                var params = {
                    uuid: ID,
                    sylx: sylx
                }
                axios.post('/dpapi/xfsy/findSyAndSxByVo', params).then(function (res) {
                    sy = res.data.result;
                    vm.getSysjz(sy);
                }.bind(this), function (error) {
                    console.log(error)
                })

            }
            //队站从后台管理系统的跳转
            var isDzdj = this.GetQueryString("dzdj");
            if (isDzdj == 1) {
                this.loading = true;
                var dz = "";
                var dzid = this.GetQueryString("id");
                var dzlx = this.GetQueryString("dzlx");
                var params = {
                    dzid: dzid,
                    dzlx: dzlx
                }
                axios.post('/dpapi/xfdz/findDzDetailByVo', params).then(function (res) {
                    dz = res.data.result;
                    vm.getDzjz(dz);
                }.bind(this), function (error) {
                    console.log(error)
                })

            }
            //车辆从后台管理系统跳转
            var isCldj = this.GetQueryString("cldj");
            if (isCldj == 1) {
                this.loading = true;
                var cl = "";
                var id = this.GetQueryString("uuid");
                axios.get('/dpapi/fireengine/' + id).then(function (res) {
                    cl = res.data.result;
                    vm.getCljz(cl);
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
        //除去聚合点（保留项）
        removeCluster: function () {
            var map = vm.map;
            var markerClusterer = new BMapLib.MarkerClusterer(map);
            var clustererStyle = [{

            }];
            markerClusterer.setStyles(clustererStyle);
            vm.markerClusterer = markerClusterer;
        },
        //重点单位聚合
        createCluster: function () {
            var map = vm.map;
            var markerClusterer = new BMapLib.MarkerClusterer(map);
            var clustererStyle = [{
                url: '../../static/images/new/jh231.png',
                size: new BMap.Size(120, 70),
                textColor: 'red',
                textSize: '180px',
                textMarginTop: '200px',
            }];
            markerClusterer.setStyles(clustererStyle);
            vm.markerClusterer = markerClusterer;
        },
        //队站聚合
        createClusteraa: function () {
            var map = vm.map;
            var markerClusterer = new BMapLib.MarkerClusterer(map);
            var clustererStyle = [{
                url: '../../static/images/maptool/zqdd.png',
                size: new BMap.Size(70, 25),
                textColor: '#fff',
            }];
            markerClusterer.setStyles(clustererStyle);
            vm.markerClusterer = markerClusterer;
        },
        //水源聚合
        createClusterbb: function () {
            var map = vm.map;
            var markerClusterer = new BMapLib.MarkerClusterer(map);
            var clustererStyle = [{
                url: '../../static/images/maptool/trsy.png',
                size: new BMap.Size(70, 25),
                textColor: '#fff',
            }];
            markerClusterer.setStyles(clustererStyle);
            vm.markerClusterer = markerClusterer;
        },
        //车辆聚合
        createClustercc: function () {
            var map = vm.map;
            var markerClusterer = new BMapLib.MarkerClusterer(map);
            var clustererStyle = [{
                url: '../../static/images/maptool/fireengine.png',
                size: new BMap.Size(70, 25),
                textColor: '#fff',
            }];
            markerClusterer.setStyles(clustererStyle);
            vm.markerClusterer = markerClusterer;
        },
        //图层一
        drawMap: function () {
            
            var map = this.map;
            var myIcon1 = new BMap.Icon("../../static/images/new/w1_p.png", new BMap.Size(100, 70)); //创建图标
            var province = [];
            this.province = province;
            var provinces = this.ShengZddwDate;
            //数据库表
            for (var i = 0; i < provinces.length; i++) {
                var pt = new BMap.Point(provinces[i].gisX, provinces[i].gisY);
                var marker = new BMap.Marker(pt, { icon: myIcon1 });
                //判断字段长度改变样式
                var labelstr = "";
                var mclen = provinces[i].xzqhmc.length;
                var sllen = provinces[i].zddwsl.length;

                if (mclen == 4) {
                    labelstr = '&nbsp<span style="color:#fff;">' + provinces[i].xzqhmc + '</span>';
                } else {
                    labelstr = '<span style="color:#fff;">' + provinces[i].xzqhmc + '</span>';
                }

                if (sllen == 4) {
                    labelstr += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style="font-size:1.3em;color:yellow;">' + provinces[i].zddwsl + '</span>';
                } else {
                    labelstr += '&nbsp&nbsp&nbsp&nbsp&nbsp<span style="font-size:1.3em;color:yellow;">' + provinces[i].zddwsl + '</span>';
                }
                if (mclen == 5 && sllen == 5) {
                    labelstr = '<span style="color:#fff;">' + provinces[i].xzqhmc + '</span>';
                    labelstr += '&nbsp&nbsp<span style="font-size:1.3em;color:yellow;">' + provinces[i].zddwsl + '</span>';
                }
                var label = new BMap.Label(labelstr);
                marker.province = provinces[i];
                label.setStyle({
                    fontSize: '0.6em',
                    fontWeight: 'bold',
                    border: '0',
                    padding: '14px 4px',
                    textAlign: 'center',
                    marginLeft: '1.5px',
                    marginTop: '24px',
                    color: '#ED0C0A',
                    borderRadius: '2px',
                    paddingRight: '58px',
                    background: '',
                });
                //zjczzz
                marker.addEventListener("onmouseover", function (e) {
                    var myIcon3 = new BMap.Icon("../../static/images/new/w1_pp.png", new BMap.Size(100, 70)); //点击后的新图标
                    var marker = e.currentTarget;
                    marker.setIcon(myIcon3);
                    marker.setTop(true, 27000000);
                });
                marker.addEventListener("onmouseout", function (e) {
                    var myIcon1 = new BMap.Icon("../../static/images/new/w1_p.png", new BMap.Size(100, 70)); //点击后的新图标
                    var marker = e.currentTarget;
                    marker.setIcon(myIcon1);
                    marker.setTop(false);
                });
                //
                marker.addEventListener("click", function (e) {
                    //获取行政区划
                    var xzqh = e.target.province.xzqh;
                    vm.selqhmc = vm.shengshizs;
                    //获取省行政区划代码
                    vm.getShiZddwDate(xzqh);
                    var pmarker = e.target;
                    var pt = pmarker.getPosition();
                    vm.prvinceName = pmarker.entity[3];
                    var citys = vm.cityp;
                    var map = vm.map;
                    vm.hideMarker(vm.province);
                    map.centerAndZoom(pt, 8);
                });
                marker.entity = provinces[i];
                province.push(marker);
                map.addOverlay(marker);
                marker.setLabel(label);
            }
        },
        //图层二
        drawMapa: function (result) {
            var myIcon1 = new BMap.Icon("../../static/images/new/w1_pct.png", new BMap.Size(110, 70));
            var cityp = [];
            var citys;
            if (this.ShiZddwDate.length > 0) {
                citys = this.ShiZddwDate;
            } else {
                citys = result;
            }
            //数据库表
            for (var i = 0; i < citys.length; i++) {
                var pt = new BMap.Point(citys[i].gisX, citys[i].gisY);
                var marker = new BMap.Marker(pt, { icon: myIcon1 });

                // var label = new BMap.Label('&nbsp<span style="color:#fff;">'+citys[i].xzqhmc +'</span>' +'&nbsp&nbsp&nbsp&nbsp&nbsp<span style="font-size:1.3em;color:red;">'+ citys[i].zddwsl+'</span>');//城市名称
                //判断字段长度改变样式zzjc
                var labelstr = "";
                var mclen = citys[i].xzqhmc.length;
                var sllen = citys[i].zddwsl.length;
                if (mclen == 4) {
                    labelstr = '<span style="color:#fff;font-size:12px;margin-left:25px;">' + citys[i].xzqhmc + '</span>';

                } else {

                    labelstr = '<span style="color:#fff;">' + citys[i].xzqhmc + '</span>';
                }
                if (mclen == 5) {
                    labelstr = '&nbsp<span style="color:#fff;font-size:12px;margin-left:15px;">' + citys[i].xzqhmc + '</span>';
                }
                if (mclen > 5 && mclen < 11) {
                    labelstr = '&nbsp&nbsp&nbsp<span style="color:#fff;font-size:8px;">' + citys[i].xzqhmc + '</span>';
                }
                if (mclen == 6) {
                    labelstr = '<span style="color:#fff;font-size:8px;margin-left:26px;">' + citys[i].xzqhmc + '</span>';
                }
                if (mclen == 7) {
                    labelstr = '<span style="color:#fff;font-size:2px;margin-left:20px;">' + citys[i].xzqhmc + '</span>';
                }
                if (mclen == 8) {
                    labelstr = '<span style="color:#fff;font-size:2px;margin-left:25px;">' + citys[i].xzqhmc + '</span>';
                }
                if (mclen > 7 && mclen <= 8) {
                    labelstr = '&nbsp&nbsp&nbsp&nbsp&nbsp<span style="color:#fff;font-size:2px;">' + citys[i].xzqhmc + '</span>';
                }
                if (mclen >= 11) {
                    labelstr = '<span style="color:#fff;font-size:2px;">' + citys[i].xzqhmc + '</span>';
                }
                if (sllen == 4) {
                    labelstr += '<br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style="font-size:1.5em;color:yellow;">' + citys[i].zddwsl + '</span>';
                } else {
                    labelstr += '<br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style="font-size:1.5em;color:yellow;">' + citys[i].zddwsl + '</span>';
                }
                if (mclen == 5 && sllen == 5) {
                    labelstr = '<span style="color:#fff;font-size:11px;">' + citys[i].xzqhmc + '</span>';
                    labelstr += '<br/>' + '&nbsp&nbsp<span style="font-size:1.5em;color:yellow;">' + citys[i].zddwsl + '</span>';

                }

                var label = new BMap.Label(labelstr);
                marker.city = citys[i];
                //
                label.setStyle({
                    fontSize: '0.6em',
                    fontWeight: 'bold',
                    border: '0',
                    padding: '1px 4px',
                    textAlign: 'center',
                    marginLeft: '2px',
                    color: '#ED0C0A',
                    borderRadius: '2px',
                    paddingRight: '58px',
                    marginTop: '25px',
                    background: '',
                });
                marker.setLabel(label);
                // marker.setLabel(labels);
                var map = vm.map;
                //zjczzz
                marker.addEventListener("onmouseover", function (e) {
                    var myIcon3 = new BMap.Icon("../../static/images/new/w1_ppct.png", new BMap.Size(110, 70)); //点击后的新图标
                    var marker = e.currentTarget;
                    marker.setIcon(myIcon3);
                    marker.setTop(true, 27000000);
                });
                marker.addEventListener("onmouseout", function (e) {
                    var myIcon1 = new BMap.Icon("../../static/images/new/w1_pct.png", new BMap.Size(110, 70)); //点击后的新图标
                    var marker = e.currentTarget;
                    marker.setIcon(myIcon1);
                    marker.setTop(false);
                });
                //
                marker.addEventListener("click", function (e) {
                    //loading加载开始
                    vm.loading = true;
                    vm.selqhmc = vm.shengshizs;
                    var zddws = result;
                    //获取点坐标
                    var xzqh = e.target.entity.xzqh;
                    vm.getZddwxx(xzqh);
                    //获取省行政区划代码
                    vm.getQuZddwDate(xzqh);
                    var cmarker = e.target;
                    var pt = cmarker.getPosition();
                    var map = vm.map;
                    vm.hideMarker(vm.cityp);
                    map.centerAndZoom(pt, 15);
                });
                marker.entity = citys[i];
                cityp.push(marker);
                map.addOverlay(marker);

            }
            this.cityp = cityp;
            //弹出框
        },//图层三
        drawMapb: function (data) {
            var zddws = data;
            var map = vm.map;
            var zddwp = [];//将点放到数组当中
            vm.zddwp = zddwp;
            for (var i = 0; i < zddws.length; i++) {
                var myIcon1 = new BMap.Icon("../../static/images/new/w1_03.png", new BMap.Size(26, 26)); //创建图标
                // var point = new BMap.Point(zddws[i].gisX, zddws[i].gisY);
                if (zddws[i].gisX != "" && zddws[i].gisY != "") {
                    //gis坐标转百度坐标入口
                    var gispt = new BMap.Point(zddws[i].gisX, zddws[i].gisY);
                    var middle = this.wgs84_bd09(gispt);
                    var point = new BMap.Point(middle.lng, middle.lat);
                } else {
                    //百度坐标直接入口    
                    var point = new BMap.Point(zddws[i].lon, zddws[i].lat);
                }
                //point需要重新new一下
                // var point = new BMap.Point(middle.lng,middle.lat);
                var marker = new BMap.Marker(point, { icon: myIcon1 });
                marker.uuid = zddws[i].uuid;
                marker.addEventListener("click", function (e) {
                    //显示底部按钮
                    vm.ShowBtn();
                    vm.getZddwxx('', e.target.uuid);
                    vm.removeAllMarkers(vm.circlez);
                    var circlez = [];//清除圆
                    vm.circlez = circlez;//清除圆
                    var pt = e.target.getPosition();
                    var map = vm.map;
                    map.centerAndZoom(pt, 18);//防止跳回聚合
                    for (var i = 0; i < zddws.length; i++) {
                        if (e.target.uuid == zddws[i].uuid) {
                            this.infoData = (zddws[i].dwmc != null ? zddws[i].dwmc : '无');
                            this.dwdzData = (zddws[i].dwdz != null ? zddws[i].dwdz : '重点单位地址:无');
                            this.xfzrrData = (zddws[i].xfzrr != null ? zddws[i].xfzrr : '无');
                            this.zbdhData = (zddws[i].zbdh != null ? zddws[i].zbdh : '无');
                            this.fhdjData = (zddws[i].fhdj != null ? zddws[i].fhdj : '无');
                            this.yajbData = (zddws[i].yajb != null ? zddws[i].yajb : '无');
                        }
                    }
                    var uuid = e.target.uuid;
                    // onclick="vm.openPlan_1(\'' + uuid + '\')"
                    var contents =
                        '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/new/back15.png);min-height: 164px;background-position: right;background-repeat: no-repeat;">' +
                        '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                        this.infoData +
                        '</h3>' +
                        '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                        this.dwdzData +
                        '</div>' +
                        '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:440px;white-space: normal;">' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>预案级别：</strong>' + this.yajbData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>防火级别：</strong>' + this.fhdjData + '</td>' +
                        '</tr>' +
                        '</table>' +
                        '<div  class="bbar" style="text-align: center; position: absolute; bottom:0;width: 100%;height: 25px;text-align: left;">' +
                        '<b class="btn" disabled="true" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_generalteam.png">总队预案</b>' +
                        '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',02)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" target="_blank"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_detachment.png">支队预案</b>' +
                        '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',03)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;"  src="../../static/images/btn/icon_brigade.png">大（中队）预案</b>' +
                        '<b class="btn" onclick="vm.zddwxq(\'' + uuid + '\')" style="padding:0 9px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">基本信息</b>' +
                        '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')" style="padding:0 11.5px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;" src="../../static/images/btn/icon_share.png"> 分享</b>' +
                        '</div>' +
                        '<div class="x-clear"></div>' +
                        '</div>'
                        ;
                    var infoWindow = new BMap.InfoWindow(contents); //创建信息窗口对象
                    infoWindow.disableAutoPan();//弹出框持续显示不受聚合影响
                    this.openInfoWindow(infoWindow);//打开新窗口
                    //设置新图标
                    var myIcon2 = new BMap.Icon("../../static/images/new/w1_05.png", new BMap.Size(26, 26)); //点击后的新图标
                    var marker = e.currentTarget;
                    marker.setIcon(myIcon2);
                    marker.setTop(true, 27000000);//标注遮挡问题
                    var pt = marker.point;
                    //隐藏旧圆
                    var oc = vm.circle;
                    oc.hide();
                    //调整缩放级别和圆圈的半径范围
                    var circle = new BMap.Circle(pt, 240, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                    var radius = 240;
                    var r = 6371004;
                    map.addOverlay(circle);
                    map.addOverlay(marker);
                    circlez.push(circle);//清除圆
                    vm.chAllMarkers(vm.zdd);
                    vm.zdd = marker;
                });
                var label = new BMap.Label(this.formatLabel(zddws[i].dwmc), { offset: new BMap.Size(-15, 35) });
                label.setStyle({
                    opacity: '0.7',
                    fontSize: '12px',
                    border: '0',
                    textAlign: 'center',
                    color: '#fff',
                    borderRadius: '2px',
                    paddingTop: '1px',
                    paddingLeft: '3px',
                    Width: '5px',
                    background: '#356FAE',
                    display: 'inline-block',
                    paddingRight: '80px',
                    marginLeft: '-10px',
                });
                marker.setLabel(label);
                zddwp.push(marker);

            };
            var markerClusterer = vm.markerClusterer;
            markerClusterer.addMarkers(zddwp);
            vm.loading = false;
        },
        //点击重点单位事件
        drawMapc: function (zddw) {
            vm.ShowBtn();
            //隐藏旧圆
            var oc = vm.circle;
            oc.hide();
            // var pt = new BMap.Point(zddw.gisX, zddw.gisY);
            //gis坐标转换
            var gispt = new BMap.Point(zddw.gisX, zddw.gisY);
            var middle = this.wgs84_bd09(gispt);
            var pt = new BMap.Point(middle.lng, middle.lat);
            //end
            var map = vm.map;
            map.centerAndZoom(pt, 18);//防止跳回聚合
            this.infoData = (zddw.dwmc != null ? zddw.dwmc : '无');
            this.dwdzData = (zddw.dwdz != null ? zddw.dwdz : '重点单位:无');
            this.xfzrrData = (zddw.xfzrr != null ? zddw.xfzrr : '无');
            this.zbdhData = (zddw.zbdh != null ? zddw.zbdh : '无');
            this.fhdjData = (zddw.fhdj != null ? zddw.fhdj : '无');
            this.yajbData = (zddw.yajb != null ? zddw.yajb : '无');
            var uuid = zddw.uuid;
            var contents =
                '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/new/back15.png);min-height: 164px;background-position: right;background-repeat: no-repeat;">' +
                '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                this.infoData +
                '</h3>' +
                '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                this.dwdzData +
                '</div>' +
                '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:440px;white-space: normal;">' +
                '<tr>' +
                '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>预案级别：</strong>' + this.yajbData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>防火级别：</strong>' + this.fhdjData + '</td>' +
                '</tr>' +
                '</table>' +
                '<div  class="bbar" style="text-align: center; position: absolute; bottom:0;width: 100%;height: 25px;text-align: left;">' +
                '<b class="btn" disabled="true" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_generalteam.png">总队预案</b>' +
                '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',02)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" target="_blank"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_detachment.png">支队预案</b>' +
                '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',03)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;"  src="../../static/images/btn/icon_brigade.png">大（中队）预案</b>' +
                '<b class="btn" onclick="vm.zddwxq(\'' + uuid + '\')" style="padding:0 9px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">基本信息</b>' +
                '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')" style="padding:0 11.5px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;" src="../../static/images/btn/icon_share.png"> 分享</b>' +
                '</div>' +
                '<div class="x-clear"></div>' +
                '</div>'
                ;
            var infoWindow = new BMap.InfoWindow(contents); //创建信息窗口对象
            infoWindow.disableAutoPan();//不受聚合影响
            vm.map.openInfoWindow(infoWindow, pt);//
            //设置新图标
            var myIcon2 = new BMap.Icon("../../static/images/new/w1_05.png", new BMap.Size(26, 26)); //点击后的新图标
            var marker = new BMap.Marker(pt, { icon: myIcon2 });
            var circle = new BMap.Circle(pt, 240, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
            var radius = 240;
            var r = 6371004;
            map.addOverlay(circle);
            map.addOverlay(marker);
            var label = new BMap.Label(this.formatLabel(zddw.dwmc), { offset: new BMap.Size(-15, 35) });
            label.setStyle({
                opacity: '0.7',
                fontSize: '12px',
                border: '0',
                textAlign: 'center',
                color: '#fff',
                borderRadius: '2px',
                paddingRight: '60px',
                paddingTop: '1px',
                paddingLeft: '3px',
                Width: '5px',
                background: '#356FAE',
                display: 'inline-block',
                paddingRight: '80px',
                marginLeft: '-10px',
            });
            marker.setLabel(label);
            vm.chAllMarkers(vm.zdd);
            vm.zdd = marker;
            vm.circle = circle;
        },
        //显示按钮方法
        ShowBtn: function () {
            var flag = 0;
            if (flag == 0) {
                document.getElementById("btn").style.display = "block"
                flag = 1;
            } else {
                document.getElementById("btn").style.display = "none"
                flag = 0;
            }
        },
        //对水源传参进行画点
        getSysjz: function (sysy) {
            var syy = [];
            vm.syy = syy;
            var map = vm.map;
            var pt = new BMap.Point(sysy.gisX, sysy.gisY);
            var uuid = sysy.uuid;

            //判断水源种类
            var d = sysy.sylx;
            switch (d) {
                case '01': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_hydrant_map.png", new BMap.Size(24, 24));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
                case '02': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_crane_map.png", new BMap.Size(24, 24));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
                case '03': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_naturalwater_map.png", new BMap.Size(24, 24));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
                case '04': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_pool_map.png", new BMap.Size(24, 24));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
            };
            marker.uuid = uuid;//影响水源这块
            var pt = marker.getPosition();
            map.centerAndZoom(pt, 14);//不进行放大
            this.sylxmcData = (sysy.sylxmc != null ? sysy.sylxmc : '无');
            this.qsxsData = (sysy.qsxs != null ? sysy.qsxs : '无');
            this.symcData = (sysy.symc != null ? sysy.symc : '无');
            this.kyztmcData = (sysy.kyztmc != null ? sysy.kyztmc : '无');

            var sycontent =
                '<div class="app-map-infowindow zddw-infowindow" style="height:205px;background-image: url(../../static/images/maptool/water_xhs_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                this.symcData +
                '</h3>' +
                '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                this.symcData +
                '</div>' +
                '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:400px;white-space: normal;">' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>水源类型：</strong>' + this.sylxmcData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>可用状态：</strong>' + this.kyztmcData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>取水形式：</strong>' + this.qsxsData + '</td>' +
                '</tr>' +
                '<tr>' +
                '</tr>' +
                '<tr>' +
                '</tr>' +
                '</table>' +
                '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                '<b class="btn" onclick="vm.syxq(\'' + uuid + '\')" style="border-radius:2px;padding:0 7px;background:#5963A0;font-size:12px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">详细信息</b>' +
                '</div>' +
                '<div class="x-clear"></div>' +
                '</div>'
                ;
            var infoWindow = new BMap.InfoWindow(sycontent);  // 创建信息窗口对象
            infoWindow.disableAutoPan();
            infoWindow.enableAutoPan();
            vm.map.openInfoWindow(infoWindow, pt);

            var markerClusterer = vm.markerClusterer;
            markerClusterer.addMarkers(syy);
            map.addOverlay(marker);
            var label = new BMap.Label(this.formatLabel(sysy.symc), { offset: new BMap.Size(-15, 35) });
            label.setStyle({
                opacity: '0.8',
                fontSize: '12px',
                fontWeight: 'bold',
                opacity: '0.7',
                border: '0',
                textAlign: 'center',
                color: '#4A4AFF',
                borderRadius: '2px',
                paddingRight: '110px',
                paddingTop: '0px',
                Width: '5px',
                display: 'inline-block',
                paddingRight: '80px',
                marginLeft: '-9px',
            });
            marker.setLabel(label);//跳动的动画
            syy.push(marker);
            // marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画 
            this.loading = false;
        },
        //对队站进行传参数画点
        getDzjz: function (dzdz) {
            var dz = [];
            vm.dz = dz;
            var map = vm.map;
            var x = dzdz.gisX;
            var y = dzdz.gisY;
            var dzid = dzdz.dzid;
            var pt = new BMap.Point(x, y);
            map.centerAndZoom(pt, 14);
            //创建坐标点
            var d = dzdz.dzlx;
            //判断队站种类
            switch (d) {
                case "0200": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_02.png", new BMap.Size(45, 45));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
                case "0300": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_03.png", new BMap.Size(45, 45));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
                case "0500": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfdd_05.png", new BMap.Size(45, 45));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
                case "0900": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_09.png", new BMap.Size(45, 45));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    break;
            };
            marker.dzid = dzid;
            var pt = marker.getPosition();
            // map.centerAndZoom(pt, 15);
            this.dzlxmcData = (dzdz.dzlxmc != null ? dzdz.dzlxmc : '无');
            this.dzmcData = (dzdz.dzmc != null ? dzdz.dzmc : '无');
            this.lxdhData = (dzdz.lxdh != null ? dzdz.lxdh : '无');
            this.dzjcData = (dzdz.dzjc != null ? dzdz.dzjc : '无');
            this.dzdzData = (dzdz.dzdz != null ? dzdz.dzdz : '消防队站地址:无');
            var dzcontent =
                '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/maptool/zqzd_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                this.dzmcData +
                '</h3>' +
                '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                this.dzdzData +
                '</div>' +
                '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:400px;white-space: normal;">' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站类型：</strong>' + this.dzlxmcData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>值班电话：</strong>' + this.lxdhData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站简称：</strong>' + this.dzjcData + '</td>' +
                '</tr>' +
                '<tr>' +
                '</tr>' +
                '<tr>' +
                '</tr>' +
                '</table>' +
                '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                '<b class="btn" onclick="vm.dzxq(\'' + dzid + '\')" style="border-radius:2px;padding:0 7px;background:#5963A0;font-size:12px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">详细信息</b>' +
                '</div>' +
                '<div class="x-clear"></div>' +
                '</div>'
                ;
            var infoWindow = new BMap.InfoWindow(dzcontent);  // 创建信息窗口对象
            infoWindow.disableAutoPan();
            infoWindow.enableAutoPan();
            vm.map.openInfoWindow(infoWindow, pt);

            map.addOverlay(marker);
            var label = new BMap.Label(this.formatLabel(dzdz.dzmc), { offset: new BMap.Size(-20, 35) });
            label.setStyle({
                opacity: '0.7',
                fontSize: '12px',
                fontWeight: 'bold',
                border: '0',
                padding: '2px 4px',
                textAlign: 'center',
                color: 'red',
                borderRadius: '2px',
                paddingRight: '55px',
                marginLeft: '10px',
                marginTop: '2px',
            });
            marker.setLabel(label);
            dz.push(marker);

            var markerClusterer = vm.markerClusterer;
            markerClusterer.addMarkers(dz);
            this.loading = false;
        },
        //对车辆进行传参数画点
        getCljz: function (clcl) {
            var cl = [];
            vm.cl = cl;
            var map = vm.map;
            var x = clcl.gisX;
            var y = clcl.gisY;
            var uuid = clcl.uuid;
            var pt = new BMap.Point(x, y);     // 创建坐标点
            map.centerAndZoom(pt, 16);
            // var d=new Date().getDay();
            var myIcon1 = new BMap.Icon("../../static/images/maptool/fireenginexfc.png", new BMap.Size(24, 24));      //创建图标
            var marker = new BMap.Marker(pt, { icon: myIcon1 });
            marker.uuid = uuid;
            var pt = marker.getPosition();

            // map.centerAndZoom(pt, 10);
            this.clmcData = (clcl.clmc != null ? clcl.clmc : '无');
            this.cllxData = (clcl.cllx != null ? clcl.cllx : '无');
            this.cldzData = (clcl.cldz != null ? clcl.cldz : '消防车辆地址:无');
            this.clztData = (clcl.clzt != null ? clcl.clzt : '无');

            var clcontent =
                '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/new/cl41.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                this.clmcData +
                '</h3>' +
                '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                this.cldzData +
                '</div>' +
                '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:400px;white-space: normal;">' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>车辆类型：</strong>' + this.cllxData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>车辆状态：</strong>' + this.clztData + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>车辆名称：</strong>' + this.clmcData + '</td>' +
                '</tr>' +
                '<tr>' +
                '</tr>' +
                '<tr>' +
                '</tr>' +
                '</table>' +
                '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                '<b class="btn" onclick="vm.clxq(\'' + uuid + '\')" style="border-radius:2px;padding:0 7px;background:#5963A0;font-size:12px;color: #fff;padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;border: 1px solid #E4E4E4;cursor: pointer;text-align: center;text-decoration: none;"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">详细信息</b>' +
                '</div>' +
                '<div class="x-clear"></div>' +
                '</div>'
                ;
            var infoWindow = new BMap.InfoWindow(clcontent);  // 创建信息窗口对象
            infoWindow.disableAutoPan();
            infoWindow.enableAutoPan();
            vm.map.openInfoWindow(infoWindow, pt);

            var markerClusterer = vm.markerClusterer;
            markerClusterer.addMarkers(cl);
            map.addOverlay(marker);
            var label = new BMap.Label(this.formatLabel(clcl.clmc), { offset: new BMap.Size(-20, 25) });
            label.setStyle({
                fontSize: '12px',
                fontWeight: 'bold',
                border: '0',
                textAlign: 'center',
                color: '#7BA860',
                borderRadius: '2px',
                paddingRight: '110px',
                paddingTop: '5px',
                Width: '5px',
                display: 'inline-block',
                paddingRight: '80px',
                marginLeft: '-9px',
            });
            marker.setLabel(label);
            cl.push(marker);
            this.loading = false;
        },
        //重置的按钮重新的编写
        Reset: function () {
            location.reload();//重新加载
            var map = this.map;
            map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);//重定位到原来坐标点
            var cityps = this.cityp;
            var proviences = this.province;
            var zddws = this.zddwp;
            var syy = this.syy;
            var cl = this.cl;
            var dz = this.dz;
            var wx = this.wx;
            var circlez = this.circlez;
            // var markerClusterer = this.markerClusterer;//去掉聚合点
            this.showMarker(proviences);
            this.hideMarker(cityps);
            this.hideMarker(zddws);
            this.hideMarker(syy);
            this.hideMarker(cl);
            this.hideMarker(dz);
            this.hideMarker(wx);
            this.hideMarker(circlez);
            this.removeCluster();
        },
        //清除点击后的圆 //替换图标
        removeAllMarkers: function (markers) {
            var map = vm.map;
            if (markers != null && markers.length != 0) {
                for (i = 0; i < markers.length; i++) {
                    map.removeOverlay(markers[i]);
                };
            }
        },
        //替换图标
        chAllMarkers: function (zdd) {
            if (zdd != '') {
                var myicon1234 = new BMap.Icon("../../static/images/new/w1_03.png", new BMap.Size(26, 26));
                zdd.setIcon(myicon1234);
                var map = vm.map;
                map.addOverlay(zdd);
            }
        },
        //显示队站
        showOverdz: function () {
            this.loading = true;
            var duizhan = document.getElementById("duizhan").value;
            if (duizhan == '1') {
                this.getDzData();//获取队站     
                document.getElementById("duizhan").value = "";
            } else {
                vm.hideMarker(vm.dz);
                document.getElementById("duizhan").value = "1";
            }

        },
        getDzsj: function () {
            var dz = [];
            vm.dz = dz;
            var map = vm.map;
            for (i = 0; i < vm.dzData.length; i++) {
                var x = vm.dzData[i].gisX;
                var y = vm.dzData[i].gisY;
                var dzid = vm.dzData[i].dzid;
                var pt = new BMap.Point(x, y);
                //创建坐标点
                var d = vm.dzData[i].dzlx;
                //判断队站种类
                switch (d) {
                    case "0200": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_02.png", new BMap.Size(45, 45));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                    case "0300": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_03.png", new BMap.Size(45, 45));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                    case "0500": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfdd_05.png", new BMap.Size(45, 45));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                    case "0900": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_09.png", new BMap.Size(45, 45));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                };
                marker.dzid = dzid;
                marker.addEventListener("click", function (e) {
                    var pt = marker.getPosition();
                    // map.centerAndZoom(pt, 15);
                    for (var i = 0; i < vm.dzData.length; i++) {
                        if (e.target.dzid == vm.dzData[i].dzid) {
                            this.dzlxmcData = (vm.dzData[i].dzlxmc != null ? vm.dzData[i].dzlxmc : '无');
                            this.dzmcData = (vm.dzData[i].dzmc != null ? vm.dzData[i].dzmc : '无');
                            this.lxdhData = (vm.dzData[i].lxdh != null ? vm.dzData[i].lxdh : '无');
                            this.dzjcData = (vm.dzData[i].dzjc != null ? vm.dzData[i].dzjc : '无');
                            this.dzdzData = (vm.dzData[i].dzdz != null ? vm.dzData[i].dzdz : '消防队站地址:无');
                        }
                    }
                    var dzcontent =
                        '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/maptool/zqzd_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                        '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                        this.dzmcData +
                        '</h3>' +
                        '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                        this.dzdzData +
                        '</div>' +
                        '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:400px;white-space: normal;">' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站类型：</strong>' + this.dzlxmcData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>值班电话：</strong>' + this.lxdhData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站简称：</strong>' + this.dzjcData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '</tr>' +
                        '<tr>' +
                        '</tr>' +
                        '</table>' +
                        '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                        '<b class="btn" onclick="vm.dzxq(\'' + e.target.dzid + '\')" style="border-radius:2px;padding:0 7px;background:#5963A0;font-size:12px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">详细信息</b>' +
                        '</div>' +
                        '<div class="x-clear"></div>' +
                        '</div>'
                        ;
                    var infoWindow = new BMap.InfoWindow(dzcontent);  // 创建信息窗口对象
                    infoWindow.disableAutoPan();
                    infoWindow.enableAutoPan();
                    this.openInfoWindow(infoWindow);
                });
                map.addOverlay(marker);
                var label = new BMap.Label(this.formatLabel(vm.dzData[i].dzmc), { offset: new BMap.Size(-20, 35) });
                label.setStyle({
                    opacity: '0.7',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '0',
                    padding: '2px 4px',
                    textAlign: 'center',
                    color: 'red',
                    borderRadius: '2px',
                    paddingRight: '55px',
                    marginLeft: '10px',
                    marginTop: '2px',
                });
                marker.setLabel(label);
                dz.push(marker);
            }
            var markerClusterer = vm.markerClusterer;
            markerClusterer.addMarkers(dz);
            this.loading = false;
        },
        //显示水源
        showOvera: function () {
            this.loading = true;
            var shuiyuan = document.getElementById("shuiyuan").value;
            if (shuiyuan == '1') {
                this.getSyData();
                document.getElementById("shuiyuan").value = "";
            } else {
                vm.hideMarker(vm.syy);
                document.getElementById("shuiyuan").value = "1";
            }
        },
        //
        //对水源进行灌注点
        getSysj: function () {
            var syy = [];
            vm.syy = syy;
            var map = vm.map;
            for (i = 0; i < vm.syData.length; i++) {
                var x = vm.syData[i].gisX;
                var y = vm.syData[i].gisY;
                var uuid = vm.syData[i].uuid;
                var pt = new BMap.Point(x, y); // 创建坐标点
                //判断水源种类
                var d = vm.syData[i].sylx;
                switch (d) {
                    case '01': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_hydrant_map.png", new BMap.Size(24, 24));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                    case '02': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_crane_map.png", new BMap.Size(24, 24));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                    case '03': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_naturalwater_map.png", new BMap.Size(24, 24));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                    case '04': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_pool_map.png", new BMap.Size(24, 24));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        break;
                };
                marker.uuid = uuid;//影响水源这块
                marker.addEventListener("click", function (e) {
                    var pt = marker.getPosition();
                    //标注                        
                    map.centerAndZoom(pt);//不进行放大
                    for (var i = 0; i < vm.syData.length; i++) {
                        if (e.target.uuid == vm.syData[i].uuid) {
                            this.sylxmcData = (vm.syData[i].sylxmc != null ? vm.syData[i].sylxmc : '无');
                            this.qsxsData = (vm.syData[i].qsxs != null ? vm.syData[i].qsxs : '无');
                            this.symcData = (vm.syData[i].symc != null ? vm.syData[i].symc : '无');
                            this.kyztmcData = (vm.syData[i].kyztmc != null ? vm.syData[i].kyztmc : '无');
                        }
                    }
                    var sycontent =
                        '<div class="app-map-infowindow zddw-infowindow" style="height:205px;background-image: url(../../static/images/maptool/water_xhs_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                        '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                        this.symcData +
                        '</h3>' +
                        '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                        this.symcData +
                        '</div>' +
                        '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:400px;white-space: normal;">' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>水源类型：</strong>' + this.sylxmcData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>可用状态：</strong>' + this.kyztmcData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>取水形式：</strong>' + this.qsxsData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '</tr>' +
                        '<tr>' +
                        '</tr>' +
                        '</table>' +
                        '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                        '<b class="btn" onclick="vm.syxq(\'' + uuid + '\')" style="border-radius:2px;padding:0 7px;background:#5963A0;font-size:12px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">详细信息</b>' +
                        '</div>' +
                        '<div class="x-clear"></div>' +
                        '</div>'
                        ;
                    var infoWindow = new BMap.InfoWindow(sycontent);  // 创建信息窗口对象
                    infoWindow.disableAutoPan();
                    infoWindow.enableAutoPan();
                    this.openInfoWindow(infoWindow);

                });
                var markerClusterer = vm.markerClusterer;
                markerClusterer.addMarkers(syy);
                map.addOverlay(marker);
                var label = new BMap.Label(this.formatLabel(vm.syData[i].symc), { offset: new BMap.Size(-20, 25) });
                label.setStyle({
                    opacity: '0.8',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    opacity: '0.7',
                    border: '0',
                    textAlign: 'center',
                    color: '#4A4AFF',
                    borderRadius: '2px',
                    paddingRight: '110px',
                    paddingTop: '0px',
                    Width: '5px',
                    display: 'inline-block',
                    paddingRight: '80px',
                    marginLeft: '-9px',
                });
                marker.setLabel(label);//跳动的动画

                syy.push(marker);
                // marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画
            }
            this.loading = false;
        },
        //显示车辆
        showOvercl: function () {
            this.loading = true;
            var cheliang = document.getElementById("cheliang").value;
            if (cheliang == '1') {
                this.getClData();
                document.getElementById("cheliang").value = "";
            } else {
                vm.hideMarker(vm.cl);
                document.getElementById("cheliang").value = "1";
            }
        },
        getClsj: function () {
            var cl = [];
            vm.cl = cl;
            var map = vm.map;
            for (i = 0; i < vm.clData.length; i++) {
                var x = vm.clData[i].gisX;
                var y = vm.clData[i].gisY;
                var uuid = vm.clData[i].uuid;
                var pt = new BMap.Point(x, y);     // 创建坐标点
                //判断水源种类
                // var d=new Date().getDay();
                var myIcon1 = new BMap.Icon("../../static/images/maptool/fireenginexfc.png", new BMap.Size(24, 24));      //创建图标
                var marker = new BMap.Marker(pt, { icon: myIcon1 });
                marker.uuid = uuid;
                marker.addEventListener("click", function (e) {
                    var marker = e.target;
                    var pt = marker.getPosition();
                    // map.centerAndZoom(pt, 10);
                    for (var i = 0; i < vm.clData.length; i++) {
                        if (e.target.uuid == vm.clData[i].uuid) {
                            this.clmcData = (vm.clData[i].clmc != null ? vm.clData[i].clmc : '无');
                            this.cllxData = (vm.clData[i].cllx != null ? vm.clData[i].cllx : '无');
                            this.cldzData = (vm.clData[i].cldz != null ? vm.clData[i].cldz : '消防车辆地址:无');
                            this.clztData = (vm.clData[i].clzt != null ? vm.clData[i].clzt : '无');
                        }
                    }
                    var clcontent =
                        '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/new/cl41.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                        '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                        this.clmcData +
                        '</h3>' +
                        '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                        this.cldzData +
                        '</div>' +
                        '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:400px;white-space: normal;">' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>车辆类型：</strong>' + this.cllxData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>车辆状态：</strong>' + this.clztData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>车辆名称：</strong>' + this.clmcData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '</tr>' +
                        '<tr>' +
                        '</tr>' +
                        '</table>' +
                        '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                        '<b class="btn" onclick="vm.clxq(\'' + uuid + '\')" style="border-radius:2px;padding:0 7px;background:#5963A0;font-size:12px;color: #fff;padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;cursor: pointer;text-align: center;text-decoration: none;"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">详细信息</b>' +
                        '</div>' +
                        '<div class="x-clear"></div>' +
                        '</div>'
                        ;
                    var infoWindow = new BMap.InfoWindow(clcontent);  // 创建信息窗口对象
                    infoWindow.disableAutoPan();
                    infoWindow.enableAutoPan();
                    this.openInfoWindow(infoWindow);
                });
                var markerClusterer = vm.markerClusterer;
                markerClusterer.addMarkers(cl);
                map.addOverlay(marker);
                var label = new BMap.Label(this.formatLabel(vm.clData[i].clmc), { offset: new BMap.Size(-20, 25) });
                label.setStyle({
                    opacity: '0.8',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '0',
                    textAlign: 'center',
                    color: '#7BA860',
                    borderRadius: '2px',
                    paddingRight: '110px',
                    paddingTop: '5px',
                    Width: '5px',
                    display: 'inline-block',
                    paddingRight: '80px',
                    marginLeft: '-9px',
                });
                marker.setLabel(label);
                cl.push(marker);
            }

            this.loading = false;
        },
        //显示微型消防站
        showOverwx: function () {
            this.loading = true;
            var wx = document.getElementById("wx").value;
            if (wx == "1") {
                var wx = [];
                vm.wx = wx;
                var map = vm.map;
                for (var i = 0; i < vm.smallStation.length; i++) {
                    var x = vm.smallStation[i].gisX;
                    var y = vm.smallStation[i].gisY;
                    // var uuid = vm.smallStation[i].uuid;
                    var pt = new BMap.Point(x, y);
                    var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd3.png", new BMap.Size(40, 40)); //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    map.addOverlay(marker);
                    var label = new BMap.Label(this.formatLabel(vm.smallStation[i].xfzmc), { offset: new BMap.Size(-20, 35) });
                    label.setStyle({
                        opacity: '0.7',
                        fontSize: '12px',
                        border: '0',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '2px',
                        paddingRight: '60px',
                        paddingTop: '2px',
                        paddingLeft: '10px',
                        Width: '5px',
                        background: '#5963A0',
                        display: 'inline-block',
                        paddingRight: '70px',
                        marginLeft: '0px',
                    });
                    marker.setLabel(label); wx.push(marker);
                }
                document.getElementById("wx").value = "";
                this.loading = false;
            } else {
                vm.hideMarker(vm.wx);
                document.getElementById("wx").value = "1";
            }
        },
        //区域内重点单位全部
        showOverzddw: function () {
            var zhong = document.getElementById("zhong").value;
            if (zhong == '1') {
                this.getPoint();
                document.getElementById("zhong").value = "";
            } else {
                vm.hideMarker(vm.zd);
                document.getElementById("zhong").value = "1";
            }
        },
        //重点单位区域显示
        getZdsj: function () {
            var zd = [];
            vm.zd = zd;
            for (var i = 0; i < vm.markerData.length; i++) {
                var x = vm.markerData[i].gisX;
                var y = vm.markerData[i].gisY;
                // if(x.gisX !=""&&y.gisY !=""){
                //     //gis坐标转百度坐标入口
                //         var gispt = new BMap.Point(x.gisX, y.gisY);
                //         var middle =  this.wgs84_bd09(gispt);
                //         var pt = new BMap.Point(middle.lng,middle.lat);
                //     }else{
                //     //百度坐标直接入口    
                //         var pt = new BMap.Point(x.lon, y.lat);
                //     }

                var uuid = vm.markerData[i].uuid;
                var pt = new BMap.Point(x, y);
                var myIcon1 = new BMap.Icon("../../static/images/new/w1_03.png", new BMap.Size(26, 26)); //创建图标
                var marker = new BMap.Marker(pt, { icon: myIcon1 });
                marker.uuid = uuid;
                marker.addEventListener("click", function (e) {
                    vm.ShowBtn();
                    var map = vm.map;
                    vm.removeAllMarkers(vm.circlez);
                    var circlez = [];//清除圆
                    vm.circlez = circlez;//清除圆
                    var pt = e.currentTarget.point;
                    // map.centerAndZoom(pt, 16);
                    for (var i = 0; i < vm.markerData.length; i++) {
                        if (e.target.uuid == vm.markerData[i].uuid) {
                            this.infoData = (vm.markerData[i].dwmc != null ? vm.markerData[i].dwmc : '无');
                            this.dwdzData = (vm.markerData[i].dwdz != null ? vm.markerData[i].dwdz : '重点单位地址:无');
                            this.xfzrrData = (vm.markerData[i].xfzrr != null ? vm.markerData[i].xfzrr : '无');
                            this.zbdhData = (vm.markerData[i].zbdh != null ? vm.markerData[i].zbdh : '无');
                            this.fhdjData = (vm.markerData[i].fhdj != null ? vm.markerData[i].fhdj : '无');
                            this.yajbData = (vm.markerData[i].yajb != null ? vm.markerData[i].yajb : '无');
                        }
                    }
                    var uuid = e.target.uuid;
                    var contentz =
                        '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/new/back15.png);min-height: 164px;background-position: right;background-repeat: no-repeat;">' +
                        '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                        this.infoData +
                        '</h3>' +
                        '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                        this.dwdzData +
                        '</div>' +
                        '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:440px;white-space: normal;">' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>预案级别：</strong>' + this.yajbData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>防火级别：</strong>' + this.fhdjData + '</td>' +
                        '</tr>' +
                        '</table>' +
                        '<div  class="bbar" style="text-align: center; position: absolute; bottom:0;width: 100%;height: 25px;text-align: left;">' +
                        '<b class="btn" disabled="true" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_generalteam.png">总队预案</b>' +
                        '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',02)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" target="_blank"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_detachment.png">支队预案</b>' +
                        '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',03)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;"  src="../../static/images/btn/icon_brigade.png">大（中队）预案</b>' +
                        '<b class="btn" onclick="vm.zddwxq(\'' + uuid + '\')" style="padding:0 9px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">基本信息</b>' +
                        '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')" style="padding:0 11.5px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;" src="../../static/images/btn/icon_share.png"> 分享</b>' +
                        '</div>' +
                        '<div class="x-clear"></div>' +
                        '</div>'
                        ;
                    var infoWindow = new BMap.InfoWindow(contentz); //创建信息窗口对象
                    infoWindow.disableAutoPan();
                    infoWindow.enableAutoPan();
                    this.openInfoWindow(infoWindow);
                    var circle = new BMap.Circle(pt, 1000, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                    var radius = 1000;
                    var r = 6371004;
                    //设置新图标
                    var myIcon2 = new BMap.Icon("../../static/images/new/w1_05.png", new BMap.Size(26, 26)); //点击后的新图标
                    var marker = e.currentTarget;
                    marker.setIcon(myIcon2);
                    map.addOverlay(circle);
                    circlez.push(circle);
                    map.addOverlay(marker);
                    vm.chAllMarkers(vm.zdd);
                    vm.zdd = marker;
                });
                var label = new BMap.Label(this.formatLabel(vm.markerData[i].dwmc), { offset: new BMap.Size(-15, 35) });
                label.setStyle({
                    opacity: '0.7',
                    fontSize: '12px',
                    border: '0',
                    textAlign: 'center',
                    color: '#fff',
                    borderRadius: '2px',
                    paddingRight: '60px',
                    paddingTop: '1px',
                    paddingLeft: '3px',
                    Width: '5px',
                    background: '#356FAE',
                    display: 'inline-block',
                    paddingRight: '80px',
                    marginLeft: '-10px',
                });
                marker.setLabel(label);
                zd.push(marker);
                vm.chAllMarkers(vm.zdd);
                vm.zdd = marker;
            }
            var markerClusterer = vm.markerClusterer;
            markerClusterer.addMarkers(zd);
        },
        //显示图标
        showMarker: function (markers) {
            if (markers != null && markers.length != 0) {
                for (i = 0; i < markers.length; i++) {
                    markers[i].show();
                };
            }
        },
        //隐藏图标
        hideMarker: function (markers) {
            if (markers != null && markers.length != 0) {
                for (i = 0; i < markers.length; i++) {
                    markers[i].hide();
                };
            }
            this.loading = false;
        },
        EwOver: function () {
            var map = this.map;
            // var mapType = this.mapType;
            // if (mapType == 'satellite') {
                map.setMapType(BMAP_NORMAL_MAP);
            //     this.mapType = '2D';
            // }
        },
        //调取预案
        openPlan_1: function (zddwid, yajb) {
            axios.get('/dpapi/digitalplanlist/doFindListByZddwId/' + zddwid).then(function (res) {
                var plan = res.data.result;
                this.planData.yaid_1 = '';
                this.planData.yaid_2 = '';
                this.planData.yaid_3 = '';
                for (var k = 0; k < plan.length; k++) {
                    if (yajb == '01') {
                        if (plan[k].yajb == '01') {
                            this.planData.yaid_1 = plan[k].uuid;
                            // break;
                        }
                    } else if (yajb == '02') {
                        if (plan[k].yajb == '02') {
                            this.planData.yaid_2 = plan[k].uuid;
                            // break;s
                        }
                    } else if (yajb == '03') {
                        if (plan[k].yajb == '03') {
                            this.planData.yaid_3 = plan[k].uuid;
                            // break;s
                        }
                    }
                }
                if (yajb == '01') {
                    if (this.planData.yaid_1 == null || this.planData.yaid_1 == '') {
                        this.$message({
                            message: "总队级预案不存在",
                            showClose: true,
                        });
                    } else {
                        this.showPlan(this.planData.yaid_1);
                    }
                } else if (yajb == '02') {
                    if (this.planData.yaid_2 == null || this.planData.yaid_2 == '') {
                        this.$message({
                            message: "支队级预案不存在",
                            showClose: true,
                        });
                    } else {
                        this.showPlan(this.planData.yaid_2);
                    }
                } else if (yajb == '03') {
                    if (this.planData.yaid_3 == null || this.planData.yaid_3 == '') {
                        this.$message({
                            message: "大中队级预案不存在",
                            showClose: true,
                        });
                    } else {
                        window.open(baseUrl+"/planShare/page/" + this.planData.yaid_3 + "/detail/web");
                    }
                }
            }.bind(this), function (error) {
                console.log(error)
            })

        },
        showPlan: function (val) {
            axios.get('/dpapi/yafjxz/doFindByPlanId/' + val).then(function (res) {
                if (res.data.result) {
                    var yllj = res.data.result[0].yllj;
                    window.open(baseUrl+"/upload/" + yllj);
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //分享
        openShare: function (val) {
            window.open(baseUrl+"/planShare/pageZddw/" + val + "/web");
        },
        //水源详情跳转
        syxq: function (params) {
            //window.location.href = "../basicinfo/firewater_list.html?uuid=" + params + "&sydj=1" + "&index=71" + "&type=DT";
            window.location.href = "../all.html?url=/basicinfo/firewater&uuid=" + params + "&sydj=1" + "&index=71" + "&type=DT";
        },
        //队站详情跳转
        dzxq: function (dzparams) {
            //window.location.href = "../basicinfo/firestation_list.html?dzid=" + dzparams + "&dzdj=1" + "&index=75" + "&type=DT";
            window.location.href = "../all.html?url=/basicinfo/firestation&dzid=" + dzparams + "&dzdj=1" + "&index=75" + "&type=DT";
        },
        //重点单位详情跳转
        zddwxq: function (zddwparams) {
            //window.location.href = "../planobject/importantunits_detail.html?ID=" + zddwparams + "&index=41" + "&type=DT";
            // window.location.href = "../planobject/importantunits_detail.html?uuid=" + zddwparams;
            window.location.href = "../all.html?url=/planobject/importantunits_detail&ID=" + zddwparams + "&index=41" + "&type=DT";
        },
        //车辆单位详情跳转
        clxq: function (clparams) {
            //window.location.href = "../basicinfo/fireengine_list.html?uuid=" + clparams + "&cldj=1" + "&index=63" + "&type=DT";
            window.location.href = "../all.html?url=/basicinfo/fireengine&uuid=" + clparams + "&cldj=1" + "&index=73" + "&type=DT";
        },
        //卫星地图
        WxOver: function () {
            var map = this.map;
            // var mapType = this.mapType;
            // if (mapType == '2D') {
            map.setMapType(BMAP_SATELLITE_MAP);
            //     this.mapType = 'satellite';
            // }
        },
        //三维地图
        SwOver:function (){
            var map = this.map;
            map.setMapType(BMAP_PERSPECTIVE_MAP);
        },
        //zjc
        formatLabelz: function (strname) {
            var len = strname.length;
            var subInder = 4;
            // if (strname.indexOf(":") > 0 && len < 12) {
            //     subInder = strname.indexOf(":") + 1;
            // }
            if (len <= subInder) {
                return strname;
            }
            var result = "";
            var cnt = parseInt(len / subInder);
            var index = 0;
            for (var i = 0; i < cnt; i++) {
                index = i * subInder;
                result += strname.slice(index, index + subInder) + "&nbsp;&nbsp;";
            }
            if (len % subInder) {
                result += + strname.slice(index + subInder, len);
            }
            var div = '<div style="font-weight: bold;text-align:center;color:#ED0C0A;">' + result + '</div>';
            return div;
        },
        //city
        formatLabels: function (strname) {
            var len = strname.length;
            var subInder = 4;
            if (strname.indexOf(":") > 0 && len < 12) {
                subInder = strname.indexOf(":") + 1;
            }
            if (len <= subInder) {
                return strname;
            }
            var result = "";
            var cnt = parseInt(len / subInder);
            var index = 0;
            for (var i = 0; i < cnt; i++) {
                index = i * subInder;
                result += strname.slice(index, index + subInder) + "&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            if (len % subInder) {
                result += + strname.slice(index + subInder, len);
            }
            var div = '<div style="font-weight: bold;text-align:center;color:#ED0C0A;">' + result + '</div>';
            return div;
        },

        //折行显示//文字传进来zzjc
        formatLabel: function (strname) {
            var len = strname.length;
            var subInder = 6;
            if (strname.indexOf(":") > 0 && len < 12) {
                subInder = strname.indexOf(":") + 1;
            }
            // if(len==3){
            //     strname +=strname+"&nbsp;&nbsp;&nbsp;";
            // }
            // if(len==4){
            //     strname +=strname+"&nbsp;&nbsp;";
            // }
            // if(len==5){
            //     strname +=strname+"&nbsp;";
            // }
            if (len <= subInder) {
                return strname;
            }
            var result = "";
            var cnt = parseInt(len / subInder);
            var index = 0;
            for (var i = 0; i < cnt; i++) {
                index = i * subInder;
                result += strname.slice(index, index + subInder) + "<br/>";
            }
            if (len % subInder) {
                result += strname.slice(index + subInder, len);
            }
            var div = '<div style="font-weight: bold;text-align:center;red">' + result + '</div>';
            return div;
        },
        //路况
        lukuang: function () {
            if (vm.ctrl == '') {
                var map = this.map;
                vm.ctrl = new BMapLib.TrafficControl({
                    showPanel: false
                });
                map.addControl(vm.ctrl);
            }

            var isTrafficOpen = document.getElementById("isTrafficOpen").value;
            if (isTrafficOpen == '1') {
                vm.ctrl.showTraffic();
                document.getElementById("isTrafficOpen").value = "";
            } else {
                vm.ctrl.hideTraffic();
                document.getElementById("isTrafficOpen").value = "1";
            }
        },
        //百度库搜索
        addSearchAuto: function (fuzzyKeyField) {
            var me = this;
            var map = me.getMap();
            var ac = new BMap.Autocomplete({
                "input": fuzzyKeyField.getId() + '-inputEl',
                "location": map
            });
            ac.addEventListener("onconfirm", function (e) { //鼠标点击下拉列表后的事件
                var _value = e.item.value;
                var myValue = _value.province + _value.city +
                    _value.district + _value.street + _value.business;
                var local = new BMap.LocalSearch(map, { //智能搜索
                    onSearchComplete: function () {
                        var poi = local.getResults().getPoi(0);
                        me.drawCurrentOverlay(poi);
                    }
                });
                local.search(myValue);
            });
            me.setAutoSearch(ac);
        },
        //显示百度库
        showSuggestId: function () {
            this.searchCond = '';
            this.searchBaiduCond = '';
            this.searchSource = '搜索百度库';
            document.getElementById("suggestId").style.display = 'inline';
            document.getElementById("advancedId").style.display = 'none';
        },
        //显示消防库
        showAdvancedId: function () {
            this.searchCond = '';
            this.searchBaiduCond = '';
            this.searchSource = '搜索消防库';
            document.getElementById("suggestId").style.display = 'none';
            document.getElementById("advancedId").style.display = 'inline';
        },
        //回车执行搜索
        doSearch: function (e) {
            if (e == 13) {
                params = {
                    yadxType: "1",
                    dxmc: this.searchCond
                };
                axios.post('/dpapi/advancedsearch/gjssYadxList', params).then(function (res) {
                    this.searchData = res.data.result;
                    this.setPlace(this.searchData);
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
        },
        setPlace: function (data) {
            vm.ShowBtn();
            vm.map.clearOverlays();    //清除地图上所有覆盖物
            var zddws = data;
            var map = vm.map;
            var zddwp = [];//将点放到数组当中
            vm.zddwp = zddwp;
            var visibleNum = 0;
            var visiblePoint;
            var inCityNum = 0;
            var inCityPoint = [];
            var centerPoint = new BMap.Point(map.getCenter().lng, map.getCenter().lat)
            var centerCity = '';
            for (var i = 0; i < zddws.length; i++) {
                var myIcon1 = new BMap.Icon("../../static/images/new/w1_03.png", new BMap.Size(26, 26)); //创建图标
                var point = new BMap.Point(zddws[i].gisX, zddws[i].gisY);
                var bound = map.getBounds();//地图可视区域
                if (bound.containsPoint(point)) {
                    visibleNum++;
                    visiblePoint = point;
                }
                if (map.getDistance(point, centerPoint) < 50000) {
                    inCityNum++;
                    inCityPoint.push(point);
                    console.log(map.getDistance(point, centerPoint));
                }
                var marker = new BMap.Marker(point, { icon: myIcon1 });
                marker.uuid = zddws[i].uuid;
                marker.addEventListener("click", function (e) {
                    vm.removeAllMarkers(vm.circlez);
                    var circlez = [];//清除圆
                    vm.circlez = circlez;//清除圆
                    var pt = e.target.getPosition();
                    var map = vm.map;
                    map.centerAndZoom(pt, 18);//防止跳回聚合
                    for (var i = 0; i < zddws.length; i++) {
                        if (e.target.uuid == zddws[i].uuid) {
                            this.infoData = (zddws[i].dxmc != null ? zddws[i].dxmc : '无');
                            this.dwdzData = (zddws[i].dxdz != null ? zddws[i].dxdz : '重点单位地址:无');
                            this.xfzrrData = (zddws[i].xfzrr != null ? zddws[i].xfzrr : '无');
                            this.zbdhData = (zddws[i].zbdh != null ? zddws[i].zbdh : '无');
                            this.fhdjData = (zddws[i].fhdj != null ? zddws[i].fhdj : '无');
                            this.yajbData = (zddws[i].yajb != null ? zddws[i].yajb : '无');
                        }
                    }
                    var uuid = e.target.uuid;
                    var contents =
                        '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/new/back15.png);min-height: 164px;background-position: right;background-repeat: no-repeat;">' +
                        '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                        this.infoData +
                        '</h3>' +
                        '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                        this.dwdzData +
                        '</div>' +
                        '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:440px;white-space: normal;">' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>预案级别：</strong>' + this.yajbData + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>防火级别：</strong>' + this.fhdjData + '</td>' +
                        '</tr>' +
                        '</table>' +
                        '<div  class="bbar" style="text-align: center; position: absolute; bottom:0;width: 100%;height: 25px;text-align: left;">' +
                        '<b class="btn" disabled="true" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_generalteam.png">总队预案</b>' +
                        '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',02)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" target="_blank"><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_detachment.png">支队预案</b>' +
                        '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\',03)" style="padding:0 7px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;"  src="../../static/images/btn/icon_brigade.png">大（中队）预案</b>' +
                        '<b class="btn" onclick="vm.zddwxq(\'' + uuid + '\')" style="padding:0 9px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/btn/icon_details.png">基本信息</b>' +
                        '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')" style="padding:0 11.5px;background:#5963A0;font-size:11px;color: #fff;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;cursor: pointer;text-align: center;text-decoration: none;" ><img style="margin-right:5px;margin-bottom:1px;width:12px;height:12px;vertical-align: sub;" src="../../static/images/btn/icon_share.png"> 分享</b>' +
                        '</div>' +
                        '<div class="x-clear"></div>' +
                        '</div>'
                        ;
                    var infoWindow = new BMap.InfoWindow(contents); //创建信息窗口对象
                    infoWindow.disableAutoPan();//
                    infoWindow.enableAutoPan();//自动平移
                    this.openInfoWindow(infoWindow);//
                    //设置新图标
                    var myIcon2 = new BMap.Icon("../../static/images/new/w1_05.png", new BMap.Size(26, 26)); //点击后的新图标
                    var marker = e.currentTarget;
                    marker.setIcon(myIcon2);
                    var pt = marker.point;// this.removeAllMarkers(zddws);//点击后清除圆圈的样式
                    var circle = new BMap.Circle(pt, 240, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                    var radius = 240;
                    var r = 6371004;
                    map.addOverlay(circle);
                    map.addOverlay(marker);
                    circlez.push(circle);//清除圆
                    vm.chAllMarkers(vm.zdd);
                    vm.zdd = marker;
                });
                var label = new BMap.Label(this.formatLabel(zddws[i].dxmc), { offset: new BMap.Size(-15, 35) });
                label.setStyle({
                    opacity: '0.7',
                    fontSize: '12px',
                    border: '0',
                    textAlign: 'center',
                    color: '#fff',
                    borderRadius: '2px',
                    paddingRight: '60px',
                    paddingTop: '1px',
                    paddingLeft: '3px',
                    Width: '5px',
                    background: '#356FAE',
                    display: 'inline-block',
                    paddingRight: '80px',
                    marginLeft: '-10px',
                });
                marker.setLabel(label);
                zddwp.push(marker);
            };
            if (visibleNum > 0 && vm.map.getZoom() >= 18) {
                vm.map.centerAndZoom(visiblePoint, 18);//重定位到已有单位坐标点
            }
            else if (inCityNum > 0) {
                vm.map.centerAndZoom(inCityPoint[0], 12);//重定位到已有单位坐标点
            }
            else {
                vm.map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);//重定位到原来坐标点
            }
            var markerClusterer = vm.markerClusterer;
            markerClusterer.addMarkers(zddwp);
        },
        // db end
        //根据参数部分和参数名来获取参数值 
        GetQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },

        //delta
        delta: function (lng, lat) {
            // Krasovsky 1940
            // a = 6378245.0, 1/f = 298.3
            // b = a * (1 - f)
            // ee = (a^2 - b^2) / a^2;
            var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
            var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
            var dLng = this.transformLng(lng - 105.0, lat - 35.0);
            var dLat = this.transformLat(lng - 105.0, lat - 35.0);
            var radLat = lat / 180.0 * this.PI;
            var magic = Math.sin(radLat);
            magic = 1 - ee * magic * magic;
            var sqrtMagic = Math.sqrt(magic);
            dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
            return {
                'lng': dLng,
                'lat': dLat,
            };
        },
        //WGS-84 TO BD-09
        wgs84_bd09: function (wgs) {
            var gcj = this.gcj_encrypt(wgs.lng, wgs.lat);
            var bd09 = this.bd_encrypt(gcj.lng, gcj.lat);
            return bd09;
        },
        //WGS-84 to GCJ-02 首次加密
        gcj_encrypt: function (wgsLng, wgsLat) {
            if (this.outOfChina(wgsLng, wgsLat))
                return {
                    'lng': wgsLng,
                    'lat': wgsLat
                };

            var d = this.delta(wgsLng, wgsLat);
            return {
                'lng': wgsLng + d.lng,
                'lat': wgsLat + d.lat
            };
        },
        //GCJ-02 to BD-09 二次加密
        bd_encrypt: function (gcjLng, gcjLat) {
            var x = gcjLng,
                y = gcjLat;
            var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
            var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
            bdLng = z * Math.cos(theta) + 0.0065;
            bdLat = z * Math.sin(theta) + 0.006;
            return {
                'lng': bdLng,
                'lat': bdLat,

            };
        },
        outOfChina: function (lng, lat) {
            if (lng < 72.004 || lng > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        },
        transformLat: function (x, y) {
            var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
            return ret;
        },
        transformLng: function (x, y) {
            var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
            return ret;
        },

    }

})
