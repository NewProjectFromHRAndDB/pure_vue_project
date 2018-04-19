//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //搜索表单
            searchForm: {
                ssdz: "",
                yjlx: "",
                cbl: [0,1000],
                czl: [0,1000]
            },
            tableData: [],
            allYjlxData: [],

            //表高度变量
            tableheight: 450,
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
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                permissionname: [{ required: true, message: "请输入权限名称", trigger: "blur" }]
            },
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },

        }
    },
    created: function () {
        this.searchClick();
        this.getAllYjlxData();
    },
    methods: {
        handleNodeClick(data) {
            // console.log(data);
        },
        //表格查询事件
        searchClick: function () {
            // this.loading = true;
            var _self = this;
            var params = {
                ssdz: this.searchForm.ssdz,
                yjlx: this.searchForm.yjlx.value,
                cbl_min: this.searchForm.cbl[0],
                cbl_max: this.searchForm.cbl[1],
                czl_min: this.searchForm.czl[0],
                czl_max: this.searchForm.czl[1]
            };
            axios.post('/dpapi/firedrug/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        clearClick: function () {
            this.searchForm.ssdz="";
            this.searchForm.yjlx="";
            this.searchForm.cbl=[];
            this.searchForm.czl=[]
        },
        getAllYjlxData: function () {
            axios.get('/api/codelist/getCodetype/YJLX').then(function (res) {
                this.allYjlxData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
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
            // console.log("每页 " + val + " 条");
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            // console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        
    },

})