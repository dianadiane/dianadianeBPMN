// export var defaultXml = 
// `
// <?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
//   <process id="standardProcess" name="标准流程" isExecutable="true">
//     <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true" />
//   </process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
//     <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
//       <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
//         <omgdc:Bounds x="120" y="295" width="30" height="30" />
//       </bpmndi:BPMNShape>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </definitions>
//  `

export var defaultXml =
  `
  <?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef">
  <process id="standardProcess" name="标准流程" isExecutable="true">
    <startEvent id="StartNode" name="开始" flowable:formFieldValidation="true">
   
     <documentation>这里是StartNode描述</documentation>
     </startEvent>
    <userTask id="UserTask_0z953jj" name="这里是usertask名称" text="1111" flowable:skipExpression="这里是usertask跳过表达式" flowable:dueDate="Fri Jan 01 2021 00:00:00 GMT+0800 (中国标准时间)" IsSelectAssignee="true">
      <documentation>这里是usertask描述</documentation>
      <extensionElements>
        <flowable:assigneeOption>USER</flowable:assigneeOption>
        <flowable:multiUser>true</flowable:multiUser>
			<flowable:fixed>true</flowable:fixed>
<flowable:userValue>zhangsan3</flowable:userValue>

      </extensionElements>
    </userTask>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_biaozhunProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_biaozhunProcess" bpmnElement="standardProcess">
      <bpmndi:BPMNShape id="BPMNShape_StartNode" bpmnElement="StartNode">
        <omgdc:Bounds x="120" y="295" width="30" height="30" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_0z953jj_di" bpmnElement="UserTask_0z953jj">
        <omgdc:Bounds x="330" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
 `
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
