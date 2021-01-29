import inherits from 'inherits';
// 引入自带的PropertiesActivator,  因为我们要用到它来处理eventBus
import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';


import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';

import TitleProps from './parts/TitleProps';

function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {

    var generalGroup = {
        id: 'general',
        label: '',
        entries: []
    };
    idProps(generalGroup, element, translate);
    nameProps(generalGroup, element, bpmnFactory, canvas, translate);
    // processProps(generalGroup, element, translate);
    documentationProps(generalGroup, element, bpmnFactory, translate);

    var detailsGroup = {
        id: 'details',
        label: 'Details',
        entries: []
    };
    linkProps(detailsGroup, element, translate);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);

    // var documentationGroup = {
    //     id: 'documentation',
    //     label: 'Documentation',
    //     entries: []
    // };

    // documentationProps(documentationGroup, element, bpmnFactory, translate);

    return [
        generalGroup,
        // detailsGroup,
        // documentationGroup
    ];
}

function createAuthorityTabGroups(element) {//创建group
    var editAuthorityGroup = {
        id: 'edit-authority',
        label: '一、常规属性',
        entries: []
    }
    var documentationGroup = {
        id: 'documentation',
        label: 'Documentation',
        entries: []
    };

    // 每个属性都有自己的props方法
    TitleProps(editAuthorityGroup, element);
    // OtherProps1(editAuthorityGroup, element);
    // OtherProps2(editAuthorityGroup, element);

    return [
        editAuthorityGroup,
    ];
}
// 这里是要用到什么就引入什么
export default function AuthorityPropertiesProvider(
    eventBus, bpmnFactory, canvas,
    elementRegistry, translate
) {
    PropertiesActivator.call(this, eventBus);

    this.getTabs = function(element) {//返回tabs
        var generalTab = {
            id: 'general',
            label: '常规选项',
            groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
        };

        // var authorityTab = {
        //     id: 'authority',
        //     label: '常规',
        //     groups: createAuthorityTabGroups(element)
        // };
        return [
            generalTab,
            // authorityTab
        ];
    }
}

inherits(AuthorityPropertiesProvider, PropertiesActivator);