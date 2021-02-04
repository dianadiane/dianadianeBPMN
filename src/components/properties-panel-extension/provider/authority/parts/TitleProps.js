import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element) {
    if (is(element, 'bpmn:StartEvent')) { // 可以在这里做类型判断
        group.entries.push(entryFactory.textField({
            id: 'title',
            // description: '权限的标题',
            label: '1、主键',
            modelProperty: 'title'
        }));
        group.entries.push(entryFactory.textField({
            id: 'name',
            // description: '权限的标题',
            label: '2、名称',
            modelProperty: 'name'
        }));
        group.entries.push(entryFactory.textBox({
            id: 'description',
            // description: '权限的标题',
            label: '3、描述',
            modelProperty: 'description'
        }));
    }
}