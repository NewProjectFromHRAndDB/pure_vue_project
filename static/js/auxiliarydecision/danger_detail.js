//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",
            id: "",
            //表数据
            tableData: [],//基本数据
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //基本数据保存
            detailData: {},
            photo64:""
        }
    },

    mounted: function () {
        /**菜单选中 by li.xue 20180628*/
        //$("#activeIndex").val(getQueryString("index"));
        
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("化学危险品", "化学危险品详情");
        
        this.id = getQueryString("ID");
        this.searchClick();
    },

    methods: {
        searchClick: function () {
            axios.get('/dpapi/danger/' + this.id).then(function (res) {
                this.tableData = res.data.result;
                this.detailData = this.tableData;
                doFindPhoto("HXWXPLX",this.detailData.type);
            }.bind(this), function (error) {
                console.log(error)
            })
        },
         //发送至邮箱
        openEmail: function () {
            this.emailDialogVisible = true;
        },
        closeEmailDialog: function () {
            this.emailDialogVisible = false;
            this.email = "";
        },
        //信息分享
        openShare: function () {
            this.shareDialogVisible = true;
        },
        closeShareDialog: function () {
            this.shareDialogVisible = false;
        },
        //信息打印
        openPrinter: function () {
            // 1.设置要打印的区域 div的className
            var newstr = document.getElementsByClassName('main-box')[0].innerHTML;
            // 2. 复制给body，并执行window.print打印功能
            document.body.innerHTML = newstr
            window.print()
            // 重新加载页面，以刷新数据
            window.location.reload();

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
    },

})