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
            elementObject:{},
            selectResult: '',//selectResult 指定分配方式
            //指定为人员
            isMultiUser:'',//true or false
            isFixed:'',//true or false
            chosePeopleList:'',//"zhangsan,zhangsi,zhangwu"
            // user: [],//是否多人，是否固定，人什么
            userDetail:null,//bpmn:ExtensionElement
            org: {},
            role: {},
            position: {}
        },//read file Usertask options extension 
        SpeifyClassIsUSERmessage: {
            "baseMessage": [],
            "detailMessage": []
        }
    },
    mutations: {
        addUserExtensionElements(state, ploads) {
            //ploads = {:this.selectResult,values:}
            //selectResult分配具体方式 和 extensionElementsArr数组
            let selectResult = ploads.selectResult;//传进来
            let values = ploads.values

            let user = state.readUsertaskElementextensionElements.user;
            let org = state.readUsertaskElementextensionElements.org;
            let role = state.readUsertaskElementextensionElements.role;
            let position = state.readUsertaskElementextensionElements.position;
            if (selectResult == "USER") {
                user = user.concat(values)
            }


            console.log(state.readUsertaskElementextensionElements.user)
        },
        changeUser(state,dates) {//dates[需要修改的index，值]
            let index = dates[0];
            let changeDetail = dates[1]

            
            // state.readUsertaskElementextensionElements.user[index] =  changeDetail
            // state.readUsertaskElementextensionElements.userDetail.values[index].$body = changeDetail
        }
    }
})

export default store