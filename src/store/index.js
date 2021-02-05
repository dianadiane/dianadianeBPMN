import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        selectElement: null,//选中的元素
        moduler: null,//模块
        Toos: {},
        readStartEventDocumentation: '',//read file Usertask options extension 
        readUsertaskElementextensionElements: {
            elementObject: {},
            //userTask（任务）
            selectResult: '',//selectResult 指定分配方式
            //指定为人员
            isMultiUser: "",//true or false
            isFixed: "",//true or false
            chosePeopleList: "",//"zhangsan,zhangsi,zhangwu"
            //指定为机构
            orgScope: "",//机构范围 指定部门START_DEPARTMENT,指定公司START_COMPANY,指定机构SPECIFY_OPTION
            orgvalue: "",//选择机构
            //指定为职位
            positionValue: "",//选择岗位
            //指定为角色
            // orgScope 机构范围
            // orgvalue 选择机构
            // rolevalue 选择岗位
            autoSelect: "",//自动带出 true or false
            //审批设置
            editForm:"",//允许编辑表单 true or false
            requireOpinion:"",//审批意见 true or false
            showApproveRecord:"",//显示审批记录 true or false
            rejectable:"",//审批允许驳回 true or false
            sendCopy:"",//审批允许抄送 true or false


            //signUserTask（串行，并行任务）
            isSerialOrParallel:false,//是否串行或并行
            isSequential:"",//横向为串行true，竖向为并行false




            userDetail: null,//bpmn:ExtensionElement
        },//read file Usertask options extension 
        SpeifyClassIsUSERmessage: {
            "baseMessage": [],
            "detailMessage": []
        }
    }
    // mutations: {
    //     addUserExtensionElements(state, ploads) {
    //         //ploads = {:this.selectResult,values:}
    //         //selectResult分配具体方式 和 extensionElementsArr数组
    //         let selectResult = ploads.selectResult;//传进来
    //         let values = ploads.values

    //         let user = state.readUsertaskElementextensionElements.user;
    //         let org = state.readUsertaskElementextensionElements.org;
    //         let role = state.readUsertaskElementextensionElements.role;
    //         let position = state.readUsertaskElementextensionElements.position;
    //         if (selectResult == "USER") {
    //             user = user.concat(values)
    //         }


    //         console.log(state.readUsertaskElementextensionElements.user)
    //     },
    //     changeUser(state,dates) {//dates[需要修改的index，值]
    //         let index = dates[0];
    //         let changeDetail = dates[1]


    //         // state.readUsertaskElementextensionElements.user[index] =  changeDetail
    //         // state.readUsertaskElementextensionElements.userDetail.values[index].$body = changeDetail
    //     }
    // }
})

export default store