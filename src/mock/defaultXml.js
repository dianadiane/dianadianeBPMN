// 空数据
export var defaultXml = 
`
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
  <process id="standardProcess" name="标准流程"  >
  <documentation>这是一个测试模型</documentation>
    <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true">

    </startEvent>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
      <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
        <omgdc:Bounds x="120" y="295" width="30" height="30" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
 `


// // 有审批设置
// export var defaultXml =
//   `<?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
//   <process id="standardProcess" name="标准流程" isExecutable="true">
//   <extensionElements>
//   <flowable:businessType>CONTRACT</flowable:businessType>
// <flowable:unitId>10297</flowable:unitId>
// <flowable:departmentId>10299</flowable:departmentId >
// <flowable:callable>false</flowable:callable>
// <flowable:defaultProcess>true</flowable:defaultProcess >
// <flowable:rejectParentProcess>false</flowable:rejectParentProcess>
// <flowable:rejectGatewayBefore>false</flowable:rejectGatewayBefore>
//  </extensionElements>
// <documentation>这是一个测试模型</documentation>

//     <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true" />
//     <userTask id="UserTask_1dvde6r">
//       <extensionElements>
//         <flowable:editForm>true</flowable:editForm>
//         <flowable:requireOpinion>false</flowable:requireOpinion>
//         <flowable:showApproveRecord>true</flowable:showApproveRecord>
//         <flowable:rejectable>false</flowable:rejectable>
//         <flowable:sendCopy>true</flowable:sendCopy>
//       </extensionElements>
//     </userTask>
//   </process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
//     <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
//       <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
//         <omgdc:Bounds x="120" y="295" width="30" height="30" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="UserTask_1dvde6r_di" bpmnElement="UserTask_1dvde6r">
//         <omgdc:Bounds x="230" y="190" width="100" height="80" />
//       </bpmndi:BPMNShape>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </definitions>`


// //带连接线的数据
// export var defaultXml =
// `<?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
//   <process id="standardProcess" name="标准流程" isExecutable="true">
//     <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true">
//       <outgoing>SequenceFlow_009si3o</outgoing>
//     </startEvent>
//     <userTask id="UserTask_1dvde6r">
//       <extensionElements>
//         <flowable:assigneeOption></flowable:assigneeOption>
//         <flowable:editForm>true</flowable:editForm>
//         <flowable:requireOpinion>false</flowable:requireOpinion>
//         <flowable:showApproveRecord>true</flowable:showApproveRecord>
//         <flowable:rejectable>false</flowable:rejectable>
//         <flowable:sendCopy>true</flowable:sendCopy>
//       </extensionElements>
//       <incoming>SequenceFlow_009si3o</incoming>
//     </userTask>
//     <sequenceFlow id="SequenceFlow_009si3o" sourceRef="StartNode" targetRef="UserTask_1dvde6r">
// </sequenceFlow>
//   </process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
//     <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
//       <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
//         <omgdc:Bounds x="120" y="295" width="30" height="30" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="UserTask_1dvde6r_di" bpmnElement="UserTask_1dvde6r">
//         <omgdc:Bounds x="230" y="190" width="100" height="80" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNEdge id="SequenceFlow_009si3o_di" bpmnElement="SequenceFlow_009si3o">
//         <di:waypoint x="150" y="310" />
//         <di:waypoint x="190" y="310" />
//         <di:waypoint x="190" y="230" />
//         <di:waypoint x="230" y="230" />
//       </bpmndi:BPMNEdge>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </definitions>`

// 有连线并且是联动任务
// export var defaultXml =
// `<?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
//   <process id="standardProcess" name="标准流程" isExecutable="true">
//     <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true">
//       <outgoing>SequenceFlow_009si3o</outgoing>
//     </startEvent>
//     <sequenceFlow id="SequenceFlow_009si3o" sourceRef="StartNode" targetRef="UserTask_1dvde6r" />

//     <callActivity id="UserTask_1dvde6r"  flowable:inheritVariables="true">

//       <incoming>SequenceFlow_009si3o</incoming>
//     </callActivity>
//   </process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
//     <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
//       <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
//         <omgdc:Bounds x="120" y="295" width="30" height="30" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNEdge id="SequenceFlow_009si3o_di" bpmnElement="SequenceFlow_009si3o">
//         <di:waypoint x="150" y="310" />
//         <di:waypoint x="190" y="310" />
//         <di:waypoint x="190" y="230" />
//         <di:waypoint x="230" y="230" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNShape id="CallActivity_0yd277h_di" bpmnElement="UserTask_1dvde6r">
//         <omgdc:Bounds x="230" y="190" width="100" height="80" />
//       </bpmndi:BPMNShape>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </definitions>`

//有个别数据
// export var defaultXml =
//   `
//   <?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
//   <process id="standardProcess" name="标准流程" isExecutable="true">
//     <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true">

//      <documentation>这里是StartNode描述</documentation>
//      </startEvent>
//     <userTask id="UserTask_0z953jj" name="这里是usertask名称" text="1111" flowable:skipExpression="这里是usertask跳过表达式" flowable:dueDate="Fri Jan 01 2021 00:00:00 GMT+0800 (中国标准时间)" IsSelectAssignee="true">
//       <documentation>这里是usertask描述</documentation>
//       <extensionElements>
//         <flowable:assigneeOption>USER</flowable:assigneeOption>
//         <flowable:multiUser>true</flowable:multiUser>
// 			<flowable:fixed>false</flowable:fixed>
// <flowable:userValue>zhangsan4,zhangsan5</flowable:userValue>
// <flowable:editForm>true</flowable:editForm>

//       </extensionElements>
//     </userTask>
//   </process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
//     <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
//       <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
//         <omgdc:Bounds x="120" y="295" width="30" height="30" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="UserTask_0z953jj_di" bpmnElement="UserTask_0z953jj">
//         <omgdc:Bounds x="330" y="180" width="100" height="80" />
//       </bpmndi:BPMNShape>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </definitions>
// //  `

//串行或者并行的数据
// export var defaultXml =`<?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
//   <process id="standardProcess" name="标准流程" isExecutable="true">
//     <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true" />
//     <userTask id="UserTask_0vrhle5" flowable:assignee="assignee">
//       <multiInstanceLoopCharacteristics isSequential="true" flowable:collection="assigneeList" flowable:elementVariable="assignee"/>
//     </userTask>
//   </process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
//     <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
//       <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
//         <omgdc:Bounds x="120" y="295" width="30" height="30" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="UserTask_0vrhle5_di" bpmnElement="UserTask_0vrhle5">
//         <omgdc:Bounds x="260" y="150" width="100" height="80" />
//       </bpmndi:BPMNShape>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </definitions>`


  //  <flowable:orgScope>${USER}<![CDATA[START_DEPARTMENT]]></flowable:orgScope>
      //  <flowable:orgValue>${USER}<![CDATA[10982]]></flowable:orgValue>
      //  <flowable:roleValue>${USER}<![CDATA[CONTRACT_MANAGER]]></flowable:roleValue>
      //  <flowable:positionValue>${USER}<![CDATA[DEPT_MANAGER]]></flowable:positionValue>
      //  <flowable:autoSelect>${USER}<![CDATA[false]]></flowable:autoSelect>
      //            <flowable:editForm>${USER}<![CDATA[true]]></flowable:editForm>
      //        <flowable:requireOpinion>${USER}<![CDATA[true]]></flowable: requireOpinion>
      //  <flowable:showApproveRecord>${USER}<![CDATA[true]]></flowable: showApproveRecord>
      //  <flowable:rejectable>${USER}<![CDATA[true]]></flowable:rejectable >
      //  <flowable:sendCopy>${USER}<![CDATA[true]]></flowable:sendCopy>

      // // 数据基本完整
      // export var defaultXml =
      // `<?xml version="1.0" encoding="UTF-8"?>
      // <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef">
      //   <process id="biaozhunProcess" name="标准流程" isExecutable="true">
      //     <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true"></startEvent>
      //     <userTask id="ChengBanRen" name="承办人" flowable:formFieldValidation="true"></userTask>
      //     <userTask id="JingLi" name="经理" flowable:formFieldValidation="true"></userTask>
      //     <exclusiveGateway id="WangGuan" name="网关" default="I"></exclusiveGateway>
      //     <userTask id="ZongJian" name="总监" flowable:formFieldValidation="true"></userTask>
      //     <callActivity id="FaLvBuHuiQian" name="法律部子流程" flowable:calledElementType="key" flowable:fallbackToDefaultTenant="false"></callActivity>
      //     <subProcess id="ZiProcess" name="一级部门子流程">
      //       <userTask id="OneNode" name="第一人" flowable:formFieldValidation="true"></userTask>
      //       <userTask id="TwoNode" name="第二人" flowable:formFieldValidation="true"></userTask>
      //       <endEvent id="ZiEnd" name="结束"></endEvent>
      //       <startEvent id="ZiStart" name="开始" flowable:formFieldValidation="true"></startEvent>
      //       <sequenceFlow id="V" name="V" sourceRef="ZiStart" targetRef="OneNode"></sequenceFlow>
      //       <sequenceFlow id="Z" name="Z" sourceRef="OneNode" targetRef="TwoNode"></sequenceFlow>
      //       <sequenceFlow id="Q" name="Q" sourceRef="TwoNode" targetRef="ZiEnd"></sequenceFlow>
      //     </subProcess>
      //     <userTask id="CaiWuBu" name="财务部会签" flowable:assignee="assignee" flowable:dueDate="2020-11-28" flowable:formFieldValidation="true" flowable:skipExpression="age=18">
      //       <documentation>这是一个会签</documentation>
      //       <extensionElements>
      //         <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      //       </extensionElements>
      //       <multiInstanceLoopCharacteristics isSequential="false" flowable:collection="assigneeList" flowable:elementVariable="assignee"></multiInstanceLoopCharacteristics>
      //     </userTask>
      //     <endEvent id="EndNode" name="结束"></endEvent>
      //     <sequenceFlow id="J" name="J" sourceRef="ZongJian" targetRef="EndNode"></sequenceFlow>
      //     <sequenceFlow id="D" name="D" sourceRef="JingLi" targetRef="FaLvBuHuiQian"></sequenceFlow>
      //     <sequenceFlow id="A" name="A" sourceRef="StartNode" targetRef="ChengBanRen"></sequenceFlow>
      //     <sequenceFlow id="B" name="B" sourceRef="ChengBanRen" targetRef="JingLi"></sequenceFlow>
      //     <sequenceFlow id="C" name="C" sourceRef="JingLi" targetRef="WangGuan"></sequenceFlow>
      //     <sequenceFlow id="M" name="M" sourceRef="ZiProcess" targetRef="ZongJian"></sequenceFlow>
      //     <sequenceFlow id="F" name="F" sourceRef="CaiWuBu" targetRef="EndNode"></sequenceFlow>
      //     <sequenceFlow id="E" name="E" sourceRef="FaLvBuHuiQian" targetRef="CaiWuBu"></sequenceFlow>
      //     <sequenceFlow id="K" name="K" sourceRef="WangGuan" targetRef="ZiProcess">
      //       <conditionExpression xsi:type="tFormalExpression"><![CDATA[`+"${age>=18}"+`]]></conditionExpression>
      //     </sequenceFlow>
      //     <sequenceFlow id="I" name="I" sourceRef="WangGuan" targetRef="ZongJian">
      //       <documentation>流程线条</documentation>
      //       <conditionExpression xsi:type="tFormalExpression"><![CDATA[`+"${age>=18}"+`]]></conditionExpression>
      //     </sequenceFlow>
      //   </process>
      //   <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
      //     <bpmndi:BPMNPlane bpmnElement="biaozhunProcess" id="BPMNPlane_biaozhunProcess">
      //       <bpmndi:BPMNShape bpmnElement="StartNode" id="BPMNShape_StartNode">
      //         <omgdc:Bounds height="30.0" width="30.0" x="120.0" y="295.0"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="ChengBanRen" id="BPMNShape_ChengBanRen">
      //         <omgdc:Bounds height="80.0" width="100.0" x="210.0" y="270.0"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="JingLi" id="BPMNShape_JingLi">
      //         <omgdc:Bounds height="80.0" width="100.0" x="367.50000000000006" y="270.00000000000006"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="WangGuan" id="BPMNShape_WangGuan">
      //         <omgdc:Bounds height="40.0" width="40.0" x="537.5" y="290.0"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="ZongJian" id="BPMNShape_ZongJian">
      //         <omgdc:Bounds height="80.0" width="100.0" x="690.0" y="270.0"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="FaLvBuHuiQian" id="BPMNShape_FaLvBuHuiQian">
      //         <omgdc:Bounds height="79.99999999999994" width="100.0" x="360.0000000000001" y="409.00000000000017"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="ZiProcess" id="BPMNShape_ZiProcess">
      //         <omgdc:Bounds height="139.0" width="372.99999999999994" x="371.00000000000006" y="45.00000000000001"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="OneNode" id="BPMNShape_OneNode">
      //         <omgdc:Bounds height="54.00000000000001" width="71.0" x="457.50000000000034" y="90.0"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="TwoNode" id="BPMNShape_TwoNode">
      //         <omgdc:Bounds height="56.99999999999999" width="79.99999999999994" x="577.5000000000002" y="89.00000000000009"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="ZiEnd" id="BPMNShape_ZiEnd">
      //         <omgdc:Bounds height="28.000000000000007" width="28.000000000000057" x="697.5" y="103.50000000000014"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="ZiStart" id="BPMNShape_ZiStart">
      //         <omgdc:Bounds height="30.000000000000007" width="30.0" x="387.50000000000006" y="102.50000000000009"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="CaiWuBu" id="BPMNShape_CaiWuBu">
      //         <omgdc:Bounds height="80.0" width="100.0" x="525.0000000000002" y="409.00000000000017"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape bpmnElement="EndNode" id="BPMNShape_EndNode">
      //         <omgdc:Bounds height="28.0" width="28.0" x="726.0000000000001" y="435.0000000000001"></omgdc:Bounds>
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNEdge bpmnElement="A" id="BPMNEdge_A">
      //         <omgdi:waypoint x="149.94999883049306" y="310.0"></omgdi:waypoint>
      //         <omgdi:waypoint x="209.99999999988677" y="310.0"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="B" id="BPMNEdge_B">
      //         <omgdi:waypoint x="309.9499999999346" y="310.0"></omgdi:waypoint>
      //         <omgdi:waypoint x="367.4999999998885" y="310.0"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="C" id="BPMNEdge_C">
      //         <omgdi:waypoint x="467.45000000000005" y="310.1777580071175"></omgdi:waypoint>
      //         <omgdi:waypoint x="537.9285714285714" y="310.42857142857144"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="D" id="BPMNEdge_D">
      //         <omgdi:waypoint x="417.50000000000006" y="349.95000000000005"></omgdi:waypoint>
      //         <omgdi:waypoint x="417.5000000000001" y="409.00000000000017"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="E" id="BPMNEdge_E">
      //         <omgdi:waypoint x="459.95000000000016" y="449.00000000000017"></omgdi:waypoint>
      //         <omgdi:waypoint x="525.0000000000002" y="449.00000000000017"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="F" id="BPMNEdge_F">
      //         <omgdi:waypoint x="624.9499999995714" y="449.00000000000017"></omgdi:waypoint>
      //         <omgdi:waypoint x="726.0000000000001" y="449.00000000000017"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="I" id="BPMNEdge_I">
      //         <omgdi:waypoint x="576.996957599107" y="310.4476584022039"></omgdi:waypoint>
      //         <omgdi:waypoint x="689.9999999999841" y="310.1372252747253"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="J" id="BPMNEdge_J">
      //         <omgdi:waypoint x="740.0" y="349.95000000000005"></omgdi:waypoint>
      //         <omgdi:waypoint x="740.0000000000001" y="435.0000000000001"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="K" id="BPMNEdge_K">
      //         <omgdi:waypoint x="557.9488491048594" y="290.44884910485933"></omgdi:waypoint>
      //         <omgdi:waypoint x="557.6771683673469" y="183.95000000000002"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="M" id="BPMNEdge_M">
      //         <omgdi:waypoint x="743.95" y="114.5"></omgdi:waypoint>
      //         <omgdi:waypoint x="847.5" y="114.5"></omgdi:waypoint>
      //         <omgdi:waypoint x="847.5" y="310.0"></omgdi:waypoint>
      //         <omgdi:waypoint x="789.9499999999075" y="310.0"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="Q" id="BPMNEdge_Q">
      //         <omgdi:waypoint x="657.4500000000002" y="117.50000000000011"></omgdi:waypoint>
      //         <omgdi:waypoint x="697.5" y="117.50000000000013"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="V" id="BPMNEdge_V">
      //         <omgdi:waypoint x="403.20776054402006" y="116.54009852478003"></omgdi:waypoint>
      //         <omgdi:waypoint x="457.4999999999984" y="116.81817455558576"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge bpmnElement="Z" id="BPMNEdge_Z">
      //         <omgdi:waypoint x="528.4499999999975" y="117.14236947791167"></omgdi:waypoint>
      //         <omgdi:waypoint x="577.4999999999995" y="117.33935742971893"></omgdi:waypoint>
      //       </bpmndi:BPMNEdge>
      //     </bpmndi:BPMNPlane>
      //   </bpmndi:BPMNDiagram>
      // </definitions>`
