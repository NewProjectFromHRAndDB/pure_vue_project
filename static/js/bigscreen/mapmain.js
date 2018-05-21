//axios默认设置cookie
axios.defaults.withCredentials = true;
var vm = new Vue({
    el: "#app",
    data: {
        city: '',
        marker: [],
        clusterer: null,
        marker1: '',
        marker2: '',
        marker3: '',
        markerData: [],
        zzData: [],
        syData: [],
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
        tableData: [
            {
                DWMC: "辽宁省人民法院",
                XZQY: "辽宁省",
                DWDZ: "霞飞路29号",
                XFGXJGNAME: "沈阳市消防局",
                CJSJ: "2012-02-23",
                DWDJ: "省部级",
                DWXZ: "司法",
                DWDH: "1234567",
                ID: "1"
            },
            {
                DWMC: "辽宁省政府",
                DWDJ: "省部级",
                DWXZ: "行政",
                XZQY: "辽宁省",
                DWDZ: "霞飞路30号",
                ZDMJ: 50000,
                XFGXJGID: "沈阳市消防局",
                DWDH: "1234567",
                ID: "2"
            },
            {
                DWMC: "辽宁省就业局",
                DWDJ: "省部级",
                DWXZ: "民事",
                XZQY: "辽宁省",
                DWDZ: "霞飞路31号",
                ZDMJ: 20000,
                XFGXJGID: "沈阳市消防局",
                DWDH: "1234567",
                ID: "3"
            },
            {
                DWMC: "沈阳市城市规划管理局",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "辽宁省",
                DWDZ: "霞飞路32号",
                ZDMJ: 10000,
                XFGXJGID: "沈阳市消防和平分队",
                DWDH: "1234567",
                ID: "4"
            },
            {
                DWMC: "沈阳市公安局",
                DWDJ: "市厅级",
                DWXZ: "司法",
                XZQY: "辽宁省",
                DWDZ: "霞飞路33号",
                ZDMJ: 12000,
                XFGXJGID: "沈阳市消防沈河分队",
                DWDH: "1234567",
                ID: "5"
            },
            {
                DWMC: "沈阳市地铁二号线",
                DWDJ: "市厅级",
                DWXZ: "民事",
                XZQY: "辽宁省",
                DWDZ: "霞飞路34号",
                ZDMJ: 1000,
                XFGXJGID: "沈阳市消防浑南分队",
                DWDH: "1234567",
                ID: "6"
            },
            {
                DWMC: "青岛市塑性加工园",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "山东省",
                DWDZ: "文明路39号",
                ZDMJ: 2000,
                XFGXJGID: "青岛市市消防大东分队",
                DWDH: "1234567",
                ID: "7"
            },
            {
                DWMC: "泰安市城建局",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "山东省",
                DWDZ: "法防路36号",
                ZDMJ: 2000,
                XFGXJGID: "泰安市消防塔湾分队",
                DWDH: "1234567",
                ID: "8"
            },
            {
                DWMC: "河北省国土资源厅",
                DWDJ: "省部级",
                DWXZ: "城市管理",
                XZQY: "河北省",
                DWDZ: "格调路46号",
                ZDMJ: 3000,
                XFGXJGID: "河北省消防总队",
                DWDH: "1234567",
                ID: "9"
            },
            {
                DWMC: "秦皇岛市林业局",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "河北省",
                DWDZ: "发文路64号",
                ZDMJ: 4000,
                XFGXJGID: "秦皇岛市消防大队",
                DWDH: "1234567",
                ID: "10"
            }
        ]
    },
    methods: {
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
            // debugger;后台获取时地名传错
        },
        getBoundary: function (map) {
            var bdary = new BMap.Boundary();
            bdary.get(this.city, function (rs) { //获取行政区域
                var count = rs.boundaries.length; //行政区域的点有多少个
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 3, strokeColor: "#ff0000" }); //建立多边形覆盖物
                    ply.setFillColor("none");
                    map.addOverlay(ply); //添加覆盖物
                    // map.setViewport(ply.getPath()); //调整视野 
                }
            });
        },
        //获取重点单位
        getPoint: function () {
            var params = {};
            axios.post('/dpapi/importantunits/list', params).then(function (res) {
                this.markerData = res.data.result;
                if (this.markerData !== []) {
                    // this.drawMap();
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //组织机构
        getJgidData: function () {
            var params = {};
            axios.post('/dpapi/organization/getOrganizationtree', params).then(function (res) {
                this.zzData = res.data.result;
                if (this.zzData !== []) {
                    // this.getSyData();
                    // this.drawMap();
                }
                console.log(this.zzData);
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //水源
        getSyData: function () {
            var params = {
                symc: "",
                sydz: "",
                sylx: "",
                dzbm: "",
                xz: "",
                kyzt: "",
                xhs_gwid: "",
                xhs_szxs: "",
                xhs_gwxs: "",
                xhs_jkxs: "",
                xfsh_gwid: "",
                xfsh_shgd: "",
                xfsh_jscd: "",
                xfsc_rl: "",
                xfsc_gwxs: "",
                xfsc_tcwz: "",
                xfmt_tcwz: "",
                xfmt_ksq: "",
                xfmt_sz: "",
                trsy_trsylx: "",
                trsy_ywksq: ""
            }
            axios.post('/dpapi/xfsy/findlist', params).then(function (res) {
                this.syData = res.data.result;
                if (this.syData !== []) {
                    // this.drawMap();
                    this.initMap();
                }
                console.log(this.syData);
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        initMap: function(){
            var map = new BMap.Map("BMap");    //创建Map实例
            this.map = map;
            this.mapType = '2D';
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
            geolocationControl.addEventListener("locationSuccess", function(e){
                // 定位成功事件
                var address = '';
                address += e.addressComponent.province;
                address += e.addressComponent.city;
                address += e.addressComponent.district;
                address += e.addressComponent.street;
                address += e.addressComponent.streetNumber;
                alert("当前定位地址为：" + address);
            });
            geolocationControl.addEventListener("locationError",function(e){
                // 定位失败事件
                alert(e.message);
            });
            map.addControl(geolocationControl);

            // var map = new BMap.Map("BMap",{mapType:BMAP_PERSPECTIVE_MAP});    //创建Map实例
            map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);
            var top_left_control = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            });
            map.addControl(top_left_control);
            map.enableScrollWheelZoom(true);      //开启鼠标滚轮缩放
            // map.addEventListener("tilesload",function(){
            this.drawMap();
            // });
            // map.setMinZoom(5);       //设置地图最小缩放级别
            // this.getBoundary(map);   //绘制边框
        },
        drawMap: function () {
            var content =
            '<div class="app-map-infowindow zddw-infowindow" style="background-image: url(../../static/images/zddw_back.png);min-height: 184px;background-position: right bottom;background-repeat: no-repeat;">'+
            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">'+
            '水源信息'+
            '</h3>'+
            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">'+
            '周口市水源消防栓'+
            '</div>'+
            '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:800px;white-space: normal;">'+
            '<tr>'+
            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>管辖中队：</strong>周口市中队</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>可用状态：</strong>可用</td>'+
            '</tr>'+
            '<tr>'+   
            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>管网形式：</strong>枝网管网</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="padding: 4px;font-size: 14px;"><strong>管网直径：</strong>200mm</td>'+
            '</tr>'+
            '<tr>'+
            '</tr>'+
            '</table>'+
            '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: left;">'+
            '<b class="btn" style="font-size:12px;;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickInfoWindowDetail()"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">基本信息</b>'+
            '<b class="btn" style="font-size:12px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onCreateKeyDiagram()"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_key_diagram.png">总队预案</b>'+
            '<a class="btn" style="font-size:12px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" href="{[this.getPano(values)]}" target="_blank"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_panorama.png">支队预案</a>'+
            '<b class="btn" style="font-size:12px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickSwcj()"><img style="width: 16px;height: 16px;vertical-align: sub;"  src="../../static/images/maptool/icon_3d.png">大（中队）预案</b>'+
            '<b class="btn" style="font-size:12px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickShare()"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_share.png"> 分享</b>'+
            '</div>'+
            '<div class="x-clear"></div>'+
            '</div>'
            // +{
            //     getOrgName: function(values) {
            //         var name = _PreLoadDataMgr.getFieldValue('AppOrganizations', 'uuid', values.orgUuid, 'name');
            //         return name;
            //     },
            //     getFhjbName: function(values) {
            //         var name = _PreLoadDataMgr.getFieldValue('DtDictionaryComps', 'uuid', values.fhjb, 'name');
            //         return name;
            //     },
            //     getYajbName: function(values) {
            //         var name = _PreLoadDataMgr.getFieldValue('DtDictionaryComps', 'uuid', values.yajb, 'name');
            //         return name;
            //     },
            //     getPano: function(values) {
            //         var url = 'http://720yun.com/t/4bc2dxaOa4f?from=groupmessage&isappinstalled=0&pano_id=1080864';
            //         var attachs = values.compAttachFileDTOs || [];
            //         attachs.forEach(function(item) {
            //             var type = item.type;
            //             if (type == 'PANO') {
            //                 url = item.url;
            //             }
            //         });
            //         return url;
            //     },
            //     get3D: function(values) {
            //         var url = _CommonConstants.ATTACHFILE_URL + '/Zddw/TP/sanwei.jpg';
            //         var attachs = values.compAttachFileDTOs || [];
            //         attachs.forEach(function(item) {
            //             var type = item.type;
            //             if (type == 'ZDDW_MODEL') {
            //                 url = item.url;
            //             }
            //         });
            //         return url;
            //     },

            // }
                ;
                this.content = content;
            var sycontent =
            '<div class="app-map-infowindow zddw-infowindow" style="background-image: url(../../static/images/zddw_back.png);min-height: 184px;background-position: right bottom;background-repeat: no-repeat;">'+
            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">'+
            '水源信息'+
            '</h3>'+
            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">'+
            '周口市水源消防栓'+
            '</div>'+
            '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:800px;white-space: normal;">'+
            '<tr>'+
            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>管辖中队：</strong>周口市中队</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>可用状态：</strong>可用</td>'+
            '</tr>'+
            '<tr>'+   
            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>管网形式：</strong>枝网管网</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="padding: 4px;font-size: 14px;"><strong>管网直径：</strong>200mm</td>'+
            '</tr>'+
            '<tr>'+
            '</tr>'+
            '</table>'+
            '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: left;">'+
            '<b class="btn" style="color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 32px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickInfoWindowDetail()"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">基本信息</b>'+
            '<b class="btn" style="color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 32px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onCreateKeyDiagram()"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_key_diagram.png">总队预案</b>'+
            '<a class="btn" style="color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 32px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" href="{[this.getPano(values)]}" target="_blank"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_panorama.png">支队预案</a>'+
            '<b class="btn" style="color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 32px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickSwcj()"><img style="width: 16px;height: 16px;vertical-align: sub;"  src="../../static/images/maptool/icon_3d.png">大（中队）预案</b>'+
            '<b class="btn" style="color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 32px;margin: 0 2px;height: 32px;line-height: 32px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickShare()"><img style="width: 16px;height: 16px;vertical-align: sub;" src="../../static/images/maptool/icon_share.png"> 分享</b>'+
            '</div>'+
            '<div class="x-clear"></div>'+
            '</div>'
            // +{
            //     getOrgName: function(values) {
            //         var name = _PreLoadDataMgr.getFieldValue('AppOrganizations', 'uuid', values.orgUuid, 'name');
            //         return name;
            //     },
            //     getFhjbName: function(values) {
            //         var name = _PreLoadDataMgr.getFieldValue('DtDictionaryComps', 'uuid', values.fhjb, 'name');
            //         return name;
            //     },
            //     getYajbName: function(values) {
            //         var name = _PreLoadDataMgr.getFieldValue('DtDictionaryComps', 'uuid', values.yajb, 'name');
            //         return name;
            //     },
            //     getPano: function(values) {
            //         var url = 'http://720yun.com/t/4bc2dxaOa4f?from=groupmessage&isappinstalled=0&pano_id=1080864';
            //         var attachs = values.compAttachFileDTOs || [];
            //         attachs.forEach(function(item) {
            //             var type = item.type;
            //             if (type == 'PANO') {
            //                 url = item.url;
            //             }
            //         });
            //         return url;
            //     },
            //     get3D: function(values) {
            //         var url = _CommonConstants.ATTACHFILE_URL + '/Zddw/TP/sanwei.jpg';
            //         var attachs = values.compAttachFileDTOs || [];
            //         attachs.forEach(function(item) {
            //             var type = item.type;
            //             if (type == 'ZDDW_MODEL') {
            //                 url = item.url;
            //             }
            //         });
            //         return url;
            //     },

            // }
                ;
                this.sycontent = sycontent;

            // var pt = null;
            var map = this.map;
            // map.removeEventListener("tilesload");
            var myIcon1 = new BMap.Icon("../../static/images/maptool/zddw.png", new BMap.Size(70, 70));      //创建图标
            
            var province = [];
            this.province = province;
            var provinces = [[113.64964385,34.7566100641,3000,'河南'],[113.307649675,23.1200491021,5000,'广东']];
            for(var i = 0;i < provinces.length;i++){
                var pt = new BMap.Point(provinces[i][0],provinces[i][1]);
                var marker = new BMap.Marker(pt, { icon: myIcon1 });
                // var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
                var label = new BMap.Label(provinces[i][2]);
                label.setStyle({ 
                fontSize: '10px',
                fontWeight: 'bold',
                opacity: '0.85',
                border: '0',
                padding: '2px 4px',
                textAlign: 'center',
                marginLeft:'22px',
                marginTop:'4px',
                color:'#fff',
                backgroundColor:'',
                 });
                
                marker.addEventListener("click", function (e) {
                    var pmarker = e.target;
                    var pt = pmarker.getPosition();
                    vm.prvinceName = pmarker.entity[3];
                    var citys = vm.cityp;
                    var map = vm.map;
                    vm.hideMarker(vm.province);
                    map.centerAndZoom(pt,7);
                    for(var i = 0;i<citys.length;i++){
                        var marker = citys[i];
                        var city = marker.entity;
                        var cityProvinceName = city[4];
                        if(vm.prvinceName == cityProvinceName){
                            marker.show();
                        } else {
                            marker.hide();
                        }
                    }
                });
                marker.entity = provinces[i];
                province.push(marker);
                map.addOverlay(marker);
                marker.setLabel(label);
            }
            var cityp = [];
            var citys = [[112.447524769,34.6573678177,200,'洛阳','河南'],[114.650201,33.625024,300,'周口','河南'],[]];
            for(var i = 0;i < citys.length;i++){
                var pt = new BMap.Point(citys[i][0],citys[i][1]);
                var marker = new BMap.Marker(pt, { icon: myIcon1 });
                var label = new BMap.Label(citys[i][2]);
                label.setStyle({ 
                    fontSize: '10px',
                    fontWeight: 'bold',
                    opacity: '0.85',
                    border: '0',
                    padding: '2px 4px',
                    textAlign: 'center',
                    marginLeft:'24px',
                    marginTop:'4px',
                    color:'#fff',
                    backgroundColor:'',
                     });
                marker.setLabel(label);
                marker.addEventListener("click", function (e) {
                    var cmarker = e.target;
                    var pt = cmarker.getPosition();
                    var zddws = vm.markerData;
                    vm.cityName =  cmarker.entity[3];
                    var map = vm.map;
                    vm.hideMarker(vm.cityp);
                    map.centerAndZoom(pt,11);
                    var zddwp = [];//将点放到数组当中
                    vm.zddwp = zddwp;
                    for(var i = 0;i<zddws.length;i++){               
                        var myIcon1 = new BMap.Icon("../../static/images/marker_zddw_map.png", new BMap.Size(24,24));      //创建图标
                        var zddwCityName = zddws[i].dwdz.substring(5,3);
                        if(vm.cityName == zddwCityName){
                            var point = new BMap.Point(zddws[i].gisX,zddws[i].gisY);
                            var marker = new BMap.Marker(point, { icon: myIcon1 });
                             marker.addEventListener("click", function (e) {
                                var pt = e.target.getPosition(); 
                                var map = vm.map;
                                map.centerAndZoom(pt,16);
                                var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
                                this.openInfoWindow(infoWindow);
                                var marker = e.currentTarget;
                                var pt = marker.point;
                                var circle = new BMap.Circle(pt, 1000, {strokeColor:"#EA0000", fillColor: "#FFD2D2", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                                var radius = 1000;
                                var r = 6371004;
                                map.addOverlay(circle);
                              });
                              zddwp.push(marker);
                            map.addOverlay(marker);
                            var label = new BMap.Label("周口消防队",{offset:new BMap.Size(-35,25)});
                            label.setStyle({ 
                                fontSize: '12px',
                                fontWeight: 'bold',
                                opacity: '0.85',
                                border: '0',
                                padding: '2px 4px',
                                textAlign: 'center',
                                color:'#D02090',
                                backgroundColor:'',
                                width:'30px',
                                 });
                            marker.setLabel(label);
                        }
                    }
                    cmarker.hide();
                });
                marker.entity = citys[i];
                marker.hide();
                cityp.push(marker);
                map.addOverlay(marker);
            }
            this.cityp = cityp;
            // map.addEventListener("zoomend", function (e) {
            //     var map = vm.map;
            //     var level = map.getZoom();
            //     if(level < vm.level){
            //         if( level < 7 ){
            //             vm.showMarker(vm.province);
            //             vm.hideMarker(vm.cityp);
            //         }
            //         if( level < 10 && level >= 7 ){
            //             vm.showMarker(vm.cityp,vm.cityName);
            //             vm.hideMarker(vm.province);
            //         }
            //     }
            // });
            // map.addEventListener("zoomstart", function (e) {
            //     var map = vm.map;
            //     var level = map.getZoom();
            //     vm.level = level;
            // });



        // 重点单位
        //     for (i = 0; i < this.markerData.length; i++) {  

        //         var x = this.markerData[i].gisX;
        //         var y = this.markerData[i].gisY;
        //         var pervison = this.markerData[i].dwdz.substring(0,2);//城市名称要对
        //         if (pervison == this.city) {
        //         var pt = new BMap.Point(x, y);  // 创建坐标点
        //         var myIcon1 = new BMap.Icon("../../static/images/qyd.png", new BMap.Size(24, 24));      //创建图标
        //         var marker = new BMap.Marker(pt, { icon: myIcon1 });
        //         map.addOverlay(marker);
        //         // this.marker.push(marker);
        //         // markerDatas.push(marker);
        //         var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
        //         marker.addEventListener("click", function (e) {
        //             var marker = e.currentTarget;
        //             var pt = marker.point;
        //             var x2 = pt.lng * Math.PI / 180;
        //             var y2 = pt.lat * Math.PI / 180;
        //             var circle = new BMap.Circle(pt, 100000, {strokeColor:"#EA0000", fillColor: "#FFD2D2", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
        //             var radius = 100000;
        //             var r = 6371004;
        //             map.addOverlay(circle);
        //             // debugger;
        //             //水源
        //             for (i = 0; i < vm.syData.length; i++) {
        //                 var x = vm.syData[i].gisX;
        //                 var x1 = x * Math.PI / 180;
        //                 var y = vm.syData[i].gisY;
        //                 var y1 = y * Math.PI / 180;
        //                 var dx = Math.abs(x1 - x2);
        //                 var dy = Math.abs(y1 - y2);
        //                 var p = Math.pow(Math.sin(dy / 2), 2) + Math.cos(y1) * Math.cos(y2) * Math.pow(Math.sin(dx / 2), 2);
        //                 var d = r * 2 * Math.asin(Math.sqrt(p));
        //                 if (radius >= d) {
        //                     var pt = new BMap.Point(x, y);     // 创建坐标点
        //                     var myIcon1 = new BMap.Icon("../../static/images/marker_naturalwater_map.png", new BMap.Size(24, 24));      //创建图标
        //                     var marker = new BMap.Marker(pt, { icon: myIcon1 });
        //                     // vm.marker.push(marker);
        //                     // markerDatas.push(marker);
        //                     var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
        //                     map.addOverlay(marker);
        //                 }
        //             }
        //             this.openInfoWindow(infoWindow);
        //         });
        //       };
        //  };
            
            //悬浮框
            // var markerClusterer = new BMapLib.MarkerClusterer(map,{minClusterSize:10});//聚合
            // var markerClusterer = new BMapLib.MarkerClusterer(map,{isAverangeCenter:true});//聚合点位置
            var markerClusterer = new BMapLib.MarkerClusterer(map);
            var clustererStyle = [{
                url: '../../static/images/heart30.png',
                size: new BMap.Size(30, 26),
                opt_anchor: [16, 0],
                textColor: '#ff00ff',
                opt_textSize: 10
            }, {
                url: '../../static/images/heart40.png',
                size: new BMap.Size(40, 35),
                opt_anchor: [40, 35],
                textColor: '#ff0000',
                opt_textSize: 12
            }, {
                url: '../../static/images/heart50.png',
                size: new BMap.Size(50, 44),
                opt_anchor: [32, 0],
                textColor: 'white',
                opt_textSize: 14
            }];
            this.clusterer = markerClusterer;
            // markerClusterer.setStyles(clustererStyle);
            // markerClusterer.addMarkers(markerDatas);
            //弹出框
            var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象//悬浮框 
        },

//重置
    Reset:function(){
        // location.reload();
        var map = this.map;
        map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);//重定位到原来坐标点
        var cityps = this.cityp;
        var proviences = this.province;
        var zddws = this.zddwp;
        this.showMarker(proviences);
        this.hideMarker(cityps);
        this.removeAllMarkers(zddws);
    },
    removeAllMarkers:function(markers){
        var map = vm.map;
        if(markers != null && markers.length != 0){
            for (i=0;i<markers.length;i++){
                map.removeOverlay(markers[i]);
            };
          }
    },
//显示
        showOvera: function () {
           var map = vm.map;
           var bounds = map.getBounds();
           var xmin = bounds.getSouthWest().lng;
           var xmax = bounds.getNorthEast().lng;
           var ymin = bounds.getSouthWest().lat;
           var ymax = bounds.getNorthEast().lat;
            //水源
            for (i = 0; i < vm.syData.length; i++) {
                    var x = vm.syData[i].gisX;
                    var y = vm.syData[i].gisY;
                    if ( x>xmin && x<xmax && y>ymin && y<ymax ) {
                        var pt = new BMap.Point(x, y);     // 创建坐标点
                        var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xhs.png", new BMap.Size(40, 40));      //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        marker.addEventListener("click", function (e) {
                            var marker = e.target;
                            var pt = marker.getPosition();
                            
                            map.centerAndZoom(pt,10);
                            var infoWindow = new BMap.InfoWindow(vm.sycontent);  // 创建信息窗口对象
                            this.openInfoWindow(infoWindow);
                        });
                        map.addOverlay(marker);
                    }
                }
            },
//区域内重点单位全部
showOverzddw: function () {
    var map = vm.map;
    var bounds = map.getBounds();
    var xmin = bounds.getSouthWest().lng;
    var xmax = bounds.getNorthEast().lng;
    var ymin = bounds.getSouthWest().lat;
    var ymax = bounds.getNorthEast().lat;
     
     for (i = 0; i < vm.markerData.length; i++) {
             var x = vm.markerData[i].gisX;
             var y = vm.markerData[i].gisY;
             if ( x>xmin && x<xmax && y>ymin && y<ymax ) {
                 var pt = new BMap.Point(x, y);     // 创建坐标点
                 var myIcon1 = new BMap.Icon("../../static/images/marker_zddw_map.png", new BMap.Size(24, 24));      //创建图标
                 var marker = new BMap.Marker(pt, { icon: myIcon1 });
                 marker.addEventListener("click", function (e) {
                     var marker = e.target;
                     var pt = marker.getPosition();
                     var circle = new BMap.Circle(pt, 1000, {strokeColor:"#EA0000", fillColor: "#FFD2D2", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                     var radius = 1000;
                     var r = 6371004;
                     map.addOverlay(circle);
                     map.centerAndZoom(pt,16);
                     var infoWindow = new BMap.InfoWindow(vm.content);  // 创建信息窗口对象
                     this.openInfoWindow(infoWindow);
                 });
                 map.addOverlay(marker);
             }
         }
     },


      showMarker: function (markers) {
        if(markers != null && markers.length != 0){
            for (i=0;i<markers.length;i++){
                markers[i].show();
            };
          }
       },
       hideMarker: function (markers) {
        if(markers != null && markers.length != 0){
            for (i=0;i<markers.length;i++){
                markers[i].hide();
            };
          }
      },
      EwOver: function (){
          var map = this.map;
          var mapType = this.mapType;
          if(mapType == 'satellite'){
              map.setMapType(BMAP_NORMAL_MAP);
              this.mapType = '2D';
          }
      },
      WxOver:function(){
        var map = this.map;
        var mapType = this.mapType;
        if(mapType == '2D'){
            map.setMapType(BMAP_SATELLITE_MAP);
            this.mapType = 'satellite';
        }
      }
    },
     mounted() {
        this.getCity();
        document.title = this.city + '预案情况';
        this.getPoint();
        //this.getJgidData();
        this.getSyData();
    }
})
