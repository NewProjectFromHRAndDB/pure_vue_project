//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                id: "",
                pic_type: "",
                pic_name: "",
            },
            //表数据
            tableData: [],
            //图片类型
            allTypes: [],
            allAddTypeNames:[],
            allEditTypeNames:[],
            //选择的图片名称
            picName:[],
            //图片预览
            imgPreviewData:{},
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
            total: 0,
            //序号
            indexData: 0,
            //新建页面是否显示
            addFormVisible: false,
            addFormRules: {
                picType: [
                    { required: true, message: '请输入图片类型', trigger: 'blur' },
                    { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                ],
                picName: [
                    { required: true, message: '请输入图片名称', trigger: 'blur' },
                    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
                ],
            },
            //新建数据
            addForm: {
                picType: "",
                picName: "",
                roles: []
            },
            //选中的序号
            selectIndex: -1,
            //修改界面是否显示
            editFormVisible: false,
            editFormRules: {
                picType: [
                    { required: true, message: '请输入图片类型', trigger: 'blur' },
                    { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                ],
                picName: [
                    { required: true, message: '请输入图片名称', trigger: 'blur' },
                    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
                ],
            },
            //修改界面数据
            editForm: {
                picType: "",
                picName: "",
                roles: []
            },
            editFormSelect: [],
            editRoles: [],
            //图片预览可否显示
            imgViewVisible: false,
            //图片列表
            fileList: [],
            //上传附加参数
            upLoadData: {
                picName: ""
            },
            picName:''
        }
    },
    created: function () {
        //菜单选中
        $("#activeIndex").val(getQueryString("index"));
        this.getAllTypes();
        this.searchClick();
    },
    methods: {
         //文件上传前
        beforeImgUpload (file) {
            const self = this;  //this必须赋值
            self.upLoadData.picName = self.picName;
            const isLt2M = file.size / 1024 / 1024 < 0.5;
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 500kb!');
                fileList.splice(0,fileList.length);
            }
            return isLt2M;
        },
        //图片上传
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning('限制选择 1 个图片！');
        },
        handleChange(file, fileList){
            if(fileList.length > 1){
                fileList.splice(1,fileList.length-1);
                this.$message.warning('限制选择 1 个图片！');
            }
            const isLt2M = file.size / 1024 / 1024 < 0.5;
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 500kb!');
                fileList.splice(0,fileList.length);
            }
            return isLt2M;
        },
        handleSuccess(response, file, fileList){
            fileList.splice(0,fileList.length);
            this.addFormVisible = false;
            this.editFormVisible = false;
        },
        //清空
        clearClick: function () {
            this.searchForm.pic_name="";
            this.searchForm.pic_type="";
        },
        //表格查询事件
        searchClick: function () {
            var _self = this;
            _self.loading = true;//表格重新加载
            var params = {
                picName: this.searchForm.pic_name,
                picType: this.searchForm.pic_type
            }
            axios.post('/api/imgupload/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                _self.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
            console.info(val);
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
        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },
        //图片预览
        imgPreview: function(val){
            var _self = this;
            var pkid = val.pkid;
            axios.get('/api/imgupload/doFindById/' + pkid).then(function (res) {
                this.imgPreviewData = res.data.result;
                var photo = document.getElementById("flag");
                this.photo64 =  this.imgPreviewData.photo64;
                photo.src = "data:image/png;base64,"+this.photo64;
            }.bind(this), function (error) {
                console.log(error)
            })
            _self.imgViewVisible = true;
        },
        //获取所有的角色
        getAllTypes: function () {
            axios.get('/api/imgupload/getAll').then(function (res) {
                this.allTypes = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //新增图片类型名称下拉框
        getAddTypeNames: function () {
            axios.get('/api/codelist/getCodetype/'+this.addForm.picType).then(function (res) {
                this.allAddTypeNames = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },       
        //修改图片类型名称下拉框
        getEditTypeNames: function () {
            axios.get('/api/codelist/getCodetype/'+this.editForm.picType).then(function (res) {
                this.allEditTypeNames = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //新增页面清除类型名称
        clearAddTypeNames:function(){
            this.allAddTypeNames = [];
            this.addForm.picName = "";
        },
        //修改页面清除类型名称
        clearEditTypeNames:function(){
            this.allEditTypeNames = [];
            this.editForm.picName = "";
        },
        //新建事件
        addClick: function () {
            var _self = this;
            _self.addFormVisible = true;
        },
        //新建提交点击事件
        addSubmit: function (val) {
            var _self = this;
            if(val.picName!=null && val.picName!="" && val.picType!="" && val.picType!=null)
            {
                axios.get('/api/imgupload/getNum/' + this.addForm.picName).then(function(res){
                    if(res.data.result != 0){
                        _self.$message({
                            message: "图片名已存在!",
                            type: "error"
                        });
                    }else{
                        var picTypename = "";
                        var picValue = "";
                        for(var i = 0;i<this.allTypes.length;i++){
                            if(this.allTypes[i].codetype == val.picType){
                                picTypename = this.allTypes[i].codetypeName;
                            }
                        }
                        for(var k = 0;k<this.allAddTypeNames.length;k++){
                            if(this.allAddTypeNames[k].codeName == val.picName){
                                picValue = this.allAddTypeNames[k].codeValue;
                            }
                        }
                        var params = {
                            picName: val.picName,
                            picType: val.picType,
                            picValue: picValue,
                            picTypename: picTypename
                        }
                        this.picName = val.picName;
                        axios.post('/api/imgupload/detail/insertByVO', params).then(function(res){
                            _self.total = _self.tableData.length;
                            this.submitUpload();
                            this.searchClick();
                        }.bind(this),function(error){
                            console.log(error)
                        })
                        _self.loadingData();//重新加载数据
                    }
                }.bind(this),function(error){
                    console.log(error)
                })
            }
            else{
                _self.$message({
                    message: "图片类型和图片名称都不能为空!",
                    type: "error"
                });
            }

        },
        //表格修改事件
        editClick: function (val) {
            var _self = this;
            var pkid = val.pkid;
            axios.get('/api/imgupload/doFindById/' + pkid).then(function (res) {
                this.editForm = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
            this.editFormVisible = true;
        },
        
        //保存点击事件
        editSubmit: function (val) {
            var _self = this;
            if(val.picName!=null && val.picName!="" && val.picType!="" && val.picType!=null)
            {
                var picTypename = "";
                var picValue = "";
                for(var i = 0;i<this.allTypes.length;i++){
                    if(this.allTypes[i].codetype == val.picType){
                        picTypename = this.allTypes[i].codetypeName;
                    }
                }
                for(var k = 0;k<this.allEditTypeNames.length;k++){
                    if(this.allEditTypeNames[k].codeName == val.picName){
                        picValue = this.allEditTypeNames[k].codeValue;
                    }
                }
                var params = {
                    pkid: val.pkid,
                    picName: val.picName,
                    picType: val.picType,
                    picValue: picValue,
                    picTypename: picTypename
                };
                this.picName = val.picName;
                axios.post('/api/imgupload/detail/updateByVO', params).then(function (res) {
                    this.submitUpload();
                    this.searchClick();
                }.bind(this), function (error) {
                    console.log(error)
                })
                _self.loadingData();
            }
            else{
                _self.$message({
                    message: "图片类型和图片名称都不能为空!",
                    type: "error"
                });
            } 
        },
        //删除所选，批量删除
        removeSelection: function () {
            var _self = this;
            var multipleSelection = this.multipleSelection;
            if (multipleSelection.length < 1) {
                _self.$message({
                    message: "请至少选中一条记录",
                    type: "error"
                });
                return;
            }
            var ids = [];
            var deletename = [];
            for (var i = 0; i < multipleSelection.length; i++) {
                var row = multipleSelection[i];
                ids.push(row.pkid);
            }
            this.$confirm("确认删除吗？", "提示", { type: "warning" })
                .then(function () {
                    var params = {
                        ids: ids
                    }
                    axios.post('/api/imgupload/detail/deleteByIds', params).then(function (res) {
                        for (var d = 0; d < ids.length; d++) {
                            for (var k = 0; k < _self.tableData.length; k++) {
                                if (_self.tableData[k].pkid == ids[d]) {
                                    _self.tableData.splice(k, 1);
                                }
                            }
                        }
                        _self.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        _self.total = _self.tableData.length;
                        _self.loadingData(); //重新加载数据
                    }.bind(this), function (error) {
                        console.log(error)
                    })

                })
                .catch(function (e) {
                    if (e != "cancel") console.log("出现错误：" + e);
                });

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
        },
        closeDialog: function (val) {
            this.addFormVisible = false;
            val.username ='';
            val.realname = '';
            val.password = '';
            val.checkPass = '';
            val.birth = '';
            val.sex = '';
            val.mobile = '';
            val.email ='';
            this.$refs["addForm"].resetFields();
            this.$refs.upload.clearFiles();
        },
        closeEditDialog: function (val) {
            this.editFormVisible = false;
            this.$refs.upload.clearFiles();
        },
    },

})