//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //搜索表单
            searchForm: {
                NAME: "",
                ENGLISH_NAME:"",
                option_LXDM:"",
                CAS: "",
                DANGER_ID:"",
                EXPRESSION:""
            },
            tableData: [],
            LXDM_data:[],
            
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
            //行数据保存
            rowdata: {

            },
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
    created:function(){
        this.getLXDMData();
        this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
        },
        //表格查询事件
        searchClick: function () {
            var _self = this;
            _self.loading = true;//表格重新加载
            var params={
                name:this.searchForm.NAME,
                englishName: this.searchForm.ENGLISH_NAME,
                type: this.searchForm.option_LXDM,
                cas: this.searchForm.CAS,
                dangerId: this.searchForm.DANGER_ID,
                expression:this.searchForm.EXPRESSION
            };
            axios.post('/dpapi/danger/findByVO',params).then(function(res){
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                _self.loading = false;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //表格数据格式化
        dataFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '无';
            } else {
                return rowDate;
            }
        },
        clearClick: function () {
            this.searchForm.NAME="";
            this.searchForm.ENGLISH_NAME="";
            this.searchForm.CAS="";
            this.searchForm.option_LXDM="";
            this.searchForm.DANGER_ID="";
            this.searchForm.EXPRESSION="";
        },
        getLXDMData: function (){
            var LXDM = [];
            axios.get('/api/codelist/getCodetype/HXWXPLX').then(function(res){
                LXDM = res.data.result;
                for(var i = 0; i<LXDM.length;i++){
                    LXDM[i].codeValue=parseInt(LXDM[i].codeValue);
                    this.LXDM_data.push(LXDM[i]);
                }
                //定义一个比较器
                function compare(propertyName) {
                    return function(object1, object2) {
                    var value1 = object1[propertyName];
                    var value2 = object2[propertyName];
                    if (value2 < value1) {
                        return 1;
                    } else if (value2 > value1) {
                        return -1;
                    } else {
                        return 0;
                    }
                    }
                }
                this.LXDM_data.sort(compare("codeValue"));
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
        },
        detailClick(val) {
            window.location.href = "danger_detail.html?ID=" + val.uuid;
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
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        }
    },

})