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
        this.YALX();
       
        //取得选中行pkid
        this.pkid = this.GetQueryString("pkid");
        history.back();
        // this.planDetails(this.pkid);
    },
    mounted:function(){
        
        this.planDetails(this.pkid);
    },

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
            if(val == "67833B5FB1232169E053B077770AE86"){
                this.detailData = this.detailTestData;
                for(var k=0;k<this.yalxdm.length;k++){
                    if(this.yalxdm[k].codeValue == this.detailData.yalxdm){
                        this.detailData.yalxdm = this.yalxdm[k].codeName;
                    }
                }
            }
            else{
                axios.get('/dpapi/xfbwjw/doFindById/' + val).then(function (res) {
                    this.detailData = null;
                    this.detailData = res.data.result;
                    //制作时间
                    if (this.detailData.zzsj == null || this.detailData.zzsj == "") {
                        return '';
                    } else {
                        var date = new Date(this.detailData.zzsj);
                        if (date == undefined) {
                            return '';
                        }
                        var month = '' + (date.getMonth() + 1),
                            day = '' + date.getDate(),
                            year = date.getFullYear();
        
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
        
                        this.zzsj=[year, month, day].join('-');
                    }
                     //创建时间
                    if (this.detailData.cjsj == null || this.detailData.cjsj == "") {
                        return '';
                    } else {
                        var date = new Date(this.detailData.cjsj);
                        if (date == undefined) {
                            return '';
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
                        return '';
                    } else {
                        var date = new Date(this.detailData.xgsj);
                        if (date == undefined) {
                            return '';
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
        }

        },
        
        //时间格式
        
        //时间格式化
        dateFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '';
            } else {
                var date = new Date(rowDate);
                if (date == undefined) {
                    return '';
                }
                var month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-')
            }
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
