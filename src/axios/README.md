调用接口
1.获取系统角色接口
接口地址：http://localhost/integration/rest/SystemService/getSystemRole?id=XXX&name=XXX
URL参数说明:
	id：根据ID查找，查询多个时逗号分隔，例如：id=BUSINESS_AREA_ADMIN,DEPTADMIN
	name：根据岗位名称查找
返回数据格式：
 [
   {
      "id" : "AGREEMENT_ADMIN",
      "name" : "合同管理员"
   },
   {
      "id" : "BUSINESS_AREA_ADMIN",
      "name" : "集团各业务领域管理员"
   }
]
2.获取系统岗位接口
接口地址：http://localhost/integration/rest/SystemService/getSystemRole?id=XXX&name=XXX
URL参数说明(无参数查询全部）:
	id：根据ID查找，查询多个时逗号分隔
	name：根据岗位名称查找
返回数据格式：
 [
   {
      "id" : " DEPARTMENT_SECRETARY",
      "name" : "部门文书"
   },
   {
      "id" : " DEPARTMENT_MANAGER",
      "name" : "部门负责人"
   }
]
3.获取下级组织机构
接口地址：http://localhost/integration/rest/SystemService/getChildOrganizations?id=XXX&orgType=DEPARTMENT 
接口说明：组织机构数据量大，异步调用查询接口数据
URL参数说明(无参数查询全部）:
	id：根据ID查找该机构的下级机构，不穿时返回根节点信息(顶级组织机构)
	orgType：筛选下级机构类型，取值为：ORG/DEPARTMENT/UNIT，不传时默认为ORG(查询单位和部门)
返回数据格式：
 [
    {
        "orgType": "DEPARTMENT",
        "name": "党组领导",
        "id": "DS22540"
    },
    {
        "orgType": "DEPARTMENT",
        "name": "集团办公室（党组办公室）",
        "id": "DS22541"
    }
]

4.查询机构信息
接口地址：http://localhost/integration/rest/SystemService/getOrganizationInfo?id=00000000,02150004  
接口说明：组织机构数据量大，全调用异步接口返回数据
URL参数说明: 
id：根据ID查找该机构信息，查询多个时逗号分隔
返回数据格式：
 [
    {
        "orgType": "DEPARTMENT",
        "parentName": "信息中心",
        "name": "财务科",
        "id": "02150004",
        "parentId": "02150000"
    },
    {
        "orgType": "UNIT",
        "name": "国家管网集团",
        "id": "00000000"
    }
]


