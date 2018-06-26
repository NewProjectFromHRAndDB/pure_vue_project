//加载面包屑
window.onload=function(){
    var type = getQueryString("type");
    if(type == "GJSS"){
        loadBreadcrumb("高级搜索", "消防保卫警卫预案详情");
    }else if(type == "DT"){
        loadBreadcrumb("地图", "消防保卫警卫预案详情");
    }else{
        loadBreadcrumb("消防保卫警卫预案", "消防保卫警卫预案详情");
    }
}
new Vue({
    el: "#detailDisplay",
    data: function () {
        return {
            //页面获取的pkid
            pkid:"",
            //详情Data
            detailData: {},
            //详情页日期
            zzsj:"",
            cjsj:"",
            xgsj:"",

            //预案类型Data
            yalxdm: [],
           
        }
    },
    created: function () {
        //取得选中行pkid
        this.pkid = this.GetQueryString("pkid");
        this.YALX();
        history.back();
        // this.planDetails(this.pkid);
    },
    // mounted:function(){
        
    //     this.planDetails(this.pkid);
    // },

    methods: {
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        //预案类型
        YALX: function(){
            axios.get('/api/codelist/getCodetype/YALX').then(function(res){
                this.yalxdm = res.data.result;
                this.planDetails(this.pkid);
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //对象类型
        DXLX: function(){
            axios.get('/api/codelist/getCodetype/YADXLX').then(function(res){
                this.DXLX_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //预案种类
        YAZL:function(){
            axios.get('/api/codelist/getCodetype/YAZL').then(function(res){
                this.YAZL_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //预案详情
        planDetails: function (val) {
            var _self = this;    
                //显示图片
                doFindPhoto("YALB","02");
                axios.get('/dpapi/xfbwjw/doFindById/' + val).then(function (res) {
                    this.detailData = null;
                    this.detailData = res.data.result;
                    debugger;
                    //制作时间
                    if (this.detailData.zzsj == null || this.detailData.zzsj == "") {
                        this.detailData.zzsj='';
                    } else {
                        var date = new Date(this.detailData.zzsj);
                        if (date == undefined) {
                            this.detailData.zzsj='';
                        }
                        var month = '' + (date.getMonth() + 1),
                            day = '' + date.getDate(),
                            year = date.getFullYear();
        
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
        
                        this.detailData.zzsj = [year, month, day].join('-');
                    }
                     //创建时间
                    if (this.detailData.cjsj == null || this.detailData.cjsj == "") {
                        this.detailData.cjsj='';
                    } else {
                        var date = new Date(this.detailData.cjsj);
                        if (date == undefined) {
                            this.detailData.cjsj='';
                        }
                        var month = '' + (date.getMonth() + 1),
                            day = '' + date.getDate(),
                            year = date.getFullYear();
        
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
        
                        this.cjsj=[year, month, day].join('-');
                    }
                   //修改时间
                    if (this.detailData.xgsj == null || this.detailData.xgsj == "") {
                        this.detailData.xgsj='';
                    } else {
                        var date = new Date(this.detailData.xgsj);
                        if (date == undefined) {
                            this.detailData.xgsj='';
                        }
                        var month = '' + (date.getMonth() + 1),
                            day = '' + date.getDate(),
                            year = date.getFullYear();
        
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
        
                        this.xgsj=[year, month, day].join('-');
                    }
                    for(var k=0;k<this.yalxdm.length;k++){
                        if(this.yalxdm[k].codeValue == this.detailData.yalxdm){
                            this.detailData.yalxdm = this.yalxdm[k].codeName;
                        }
                    }
                   
                    this.detailData.sfkqy = (this.detailData.sfkqy==1?"是":"否");
                    _self.planDetailVisible = true;
            }.bind(this), function (error) {
                console.log(error)
            })
        

        },
        
        /**
        * lxy
        */
        submitUpload(){
            this.upLoadData= {id:2};
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList){
            console.log(file, fileList);
        },
        handlePreview(file){
            console.log(file);
        },
        

    }
})
