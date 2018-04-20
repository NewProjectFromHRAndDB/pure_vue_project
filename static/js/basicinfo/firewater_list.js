//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            awa: "",
            //搜索表单
            searchForm: {
                symc: '',
                sydz: '',
                sylx: '',
                gxdz: '',
                xz: '',
                kyzt:'',
                xhs_gwid:'',
                xhs_szxs:'',
                xhs_gwxs:'',
                xhs_jkxs:'',
                xfsh_gwid:'',
                xfsh_shgd:'',
                xfsh_jscd:'',
                xfsc_rl:'',
                xfsc_gwxs:'',
                xfsc_tcwz:'',
                xfmt_tcwz:'',
                xfmt_ksq:'',
                xfmt_sz:'',
                trsy_trsylx:'',
                trsy_ywksq:''
            },
            tableData: [],
            SYLX_data: [],
            GXZD_data:[],
            XZ_data:[],
            KYZT_data:[],
            xhs_szxs_data:[],
            xhs_gwxs_data:[],
            xhs_jkxs_data:[],
            xfsh_jscd_data:[],
            xfsc_gwxs_data:[],
            xfmt_sz_data:[],
            trsy_trsylx_data:[],
            trsy_ywksq_data:[],
            rowdata: '',
            isXhsSelectShow:false,
            isXfshSelectShow:false,
            isXfscSelectShow:false,
            isXfmtSelectShow:false,
            isTrsySelectShow:false,
            //表高度变量
            tableheight: 443,
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 10,
            //行数据保存
            rowdata: {

            },
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            
            
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
            
           
        }
    },
    created: function () {
        this.searchClick();
        this.searchSYLX_data();
        this.searchGXZD_data();
        this.searchKYZT_data();
        this.searchXZ_data();
        this.searchXhsSZXS_data();
        this.searchXhsGWXS_data();
        this.searchXhsJKXS_data();
        this.searchXfshJSCD_data();
        this.searchXfscGWXS_data();
        this.searchXfmtSZ_data();
        this.searchTrsyLX_data();
        this.searchTrsyYWKSQ_data();
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        handleChange(value) {
            console.log(value);
        },
        //表格查询事件
        searchClick: function () {
            this.loading=true;
            /*水源类型多选，array拼接成字符串
             this.searchForm.sylx = '';
             if (this.selected_SYLX.length > 0) {
                 for (var i = 0; i < this.selected_SYLX.length; i++) {
                     this.searchForm.sylx += '\'' + this.selected_SYLX[i] + '\',';
                 }
             }*/
            var params = {
                symc: this.searchForm.symc,
                sydz: this.searchForm.sydz,
                sylx: this.searchForm.sylx,
                gxdz: this.searchForm.gxdz,
                xz: this.searchForm.xz,
                kyzt: this.searchForm.kyzt,
                xhs_gwid: this.searchForm.xhs_gwid,
                xhs_szxs: this.searchForm.xhs_szxs,
                xhs_gwxs: this.searchForm.xhs_gwxs,
                xhs_jkxs: this.searchForm.xhs_jkxs,
                xfsh_gwid: this.searchForm.xfsh_gwid,
                xfsh_shgd: this.searchForm.xfsh_shgd,
                xfsh_jscd: this.searchForm.xfsh_jscd,
                xfsc_rl: this.searchForm.xfsc_rl,
                xfsc_gwxs: this.searchForm.xfsc_gwxs,
                xfsc_tcwz: this.searchForm.xfsc_tcwz,
                xfmt_tcwz: this.searchForm.xfmt_tcwz,
                xfmt_ksq: this.searchForm.xfmt_ksq,
                xfmt_sz: this.searchForm.xfmt_sz,
                trsy_trsylx: this.searchForm.trsy_trsylx,
                trsy_ywksq: this.searchForm.trsy_ywksq
            }
            axios.post('/dpapi/xfsy/findlist', params).then(function (res) {
                console.log(res.data.result);
                this.tableData = res.data.result;
                this.total = this.tableData.length;
                this.loadingData();
                this.loading=false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.symc = "";
            this.searchForm.sydz = "";
            this.searchForm.sylx = "";
            this.searchForm.gxdz = "";
            this.searchForm.xz = "";
            this.searchForm.kyzt = "";
            this.clearOthers();
        },
        //清空关联表查询条件
        clearOthers: function(){
            this.searchForm.xhs_gwid = "";
            this.searchForm.xhs_szxs = "";
            this.searchForm.xhs_gwxs = "";
            this.searchForm.xhs_jkxs = "";
            this.searchForm.xfsh_gwid = "";
            this.searchForm.xfsh_shgd = "";
            this.searchForm.xfsh_jscd = "";
            this.searchForm.xfsc_rl = "";
            this.searchForm.xfsc_gwxs = "";
            this.searchForm.xfsc_tcwz = "";
            this.searchForm.xfmt_tcwz = "";
            this.searchForm.xfmt_ksq = "";
            this.searchForm.xfmt_sz = "";
            this.searchForm.trsy_trsylx = "";
            this.searchForm.trsy_ywksq = "";
        },
        //下拉框数据加载
        searchSYLX_data: function () {
            axios.get('/api/codelist/getCodetype/SYLX').then(function (res) {
                //水源类型数据只显示大类即以00结尾的类型
                var lxdata = res.data.result;
                for(var i in lxdata){
                    var end_sylx = lxdata[i].codeValue.substring(2,4);
                    if(end_sylx =="00")
                        this.SYLX_data.push(lxdata[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchGXZD_data:function () {
            
        },
        searchXZ_data:function () {
            axios.get('/api/codelist/getCodetype/SYXZ').then(function (res) {
                //水源性质数据只显示市政 即以111开头的类型
                var xzdata = res.data.result;
                for(var i in xzdata){
                    var start_sylx = xzdata[i].codeValue.substring(0,3);
                    if(start_sylx =="111")
                        this.XZ_data.push(xzdata[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchKYZT_data:function () {
            axios.get('/api/codelist/getCodetype/SYKYZT').then(function (res) {
                this.KYZT_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //消火栓查询条件加载
        searchXhsSZXS_data:function () {
            axios.get('/api/codelist/getCodetype/SZXS').then(function (res) {
                this.xhs_szxs_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchXhsGWXS_data:function () {
            axios.get('/api/codelist/getCodetype/GWXS').then(function (res) {
                this.xhs_gwxs_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchXhsJKXS_data:function () {
            axios.get('/api/codelist/getCodetype/XHSJKXS').then(function (res) {
                this.xhs_jkxs_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchXfshJSCD_data:function () {
            axios.get('/api/codelist/getCodetype/SYSHJSCD').then(function (res) {
                this.xfsh_jscd_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchXfscGWXS_data:function () {
            axios.get('/api/codelist/getCodetype/GWXS').then(function (res) {
                this.xfsc_gwxs_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchXfmtSZ_data:function () {
            axios.get('/api/codelist/getCodetype/SYSZ').then(function (res) {
                this.xfmt_sz_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchTrsyLX_data:function () {
            axios.get('/api/codelist/getCodetype/TRSYLX').then(function (res) {
                this.trsy_trsylx_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchTrsyYWKSQ_data:function () {
            axios.get('/api/codelist/getCodetype/SYYWKSQ').then(function (res) {
                this.trsy_ywksq_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        dataFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '无';
            } else {
                return rowDate;
            }
        },
        selectsylx:function(){
        //console.log(this.searchForm.sylx);
           switch(this.searchForm.sylx){
               case '1100':
                    this.clearOthers();
                    this.isXfshSelectShow = false;
                    this.isXfscSelectShow = false;
                    this.isXfmtSelectShow = false;
                    this.isTrsySelectShow = false;
                    this.isXhsSelectShow = true;
                    break;
                case '1200':
                    this.clearOthers();
                    this.isXfscSelectShow = false;
                    this.isXfmtSelectShow = false;
                    this.isTrsySelectShow = false;
                    this.isXhsSelectShow = false;
                    this.isXfshSelectShow = true;
                    break;
                case '1300':
                    this.clearOthers();
                    this.isXfmtSelectShow = false;
                    this.isTrsySelectShow = false;
                    this.isXhsSelectShow = false;
                    this.isXfshSelectShow = false;
                    this.isXfscSelectShow = true;
                    break;
                case '2100':
                    this.clearOthers();
                    this.isTrsySelectShow = false;
                    this.isXhsSelectShow = false;
                    this.isXfshSelectShow = false;
                    this.isXfscSelectShow = false;
                    this.isXfmtSelectShow = true;
                    break;
                case '2900':
                    this.clearOthers();
                    this.isXhsSelectShow = false;
                    this.isXfshSelectShow = false;
                    this.isXfscSelectShow = false;
                    this.isXfmtSelectShow = false;
                    this.isTrsySelectShow = true;
                    break;
                default :
                    this.clearOthers();
                    this.isXhsSelectShow = false;
                    this.isXfshSelectShow = false;
                    this.isXfscSelectShow = false;
                    this.isXfmtSelectShow = false;
                    this.isTrsySelectShow = false;
           }
        },
        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
            //this.sels = sels
            console.info(val);
        },
        //点击进入详情页
        informClick(val) {
            window.location.href = "firewater_detail.html?id=" + val.uuid + "&sylx=" + val.sylx;
        },
        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },
        //分页大小修改事件
        pageSizeChange: function (val) {
            console.log("每页 " + val + " 条");
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        
        closeDialog: function (val) {
            this.addFormVisible = false;
            val.permissionname = "";
            val.permissioninfo = "";
            val.create_name = "";
            val.create_time = "";
            val.alter_name = "";
            val.alter_time = "";
        }
    },

})