import request from '@/utils/request'


//分页查询
export function scanComplianceQueryPage(data) {
    return request.get('/srd/compliance/query/page', {
        params: data
      });
}

//编辑
export function scanComplianceModify(data) {
    return request({
        url: '/srd/compliance/modify',
        method: 'post',
        data
    })
}

//新增
export function scanComplianceCreate(data) {
    return request({
        url: '/srd/compliance/create',
        method: 'post',
        data
    })
}

//任务列表
export function taskCenterGetTaskCenterByPage(data) {
    return request.get('/srd/system/taskCenter/getTaskCenterByPage', {
        params: data
      });
}

//存储任务保存
export function discoveryTaskSave(data) {
    return request({
        url: '/srd/tactic/discoveryTask/SP/saveTask',
        method: 'post',
        data
    })
}

//修改存储任务保存
export function discoveryTaskUpdate(data) {
    return request({
        url: '/srd/tactic/discoveryTask/SP/updateTask',
        method: 'post',
        data
    })
}

//根据id删除存储任务
export function discoveryTaskSPDelete(id) {
    return request({
        url: `/srd/tactic/discoveryTask/SP/deleteTask/${id}`,
        method: 'post',
        id
    })
}

//添加终端存储任务
export function endpointTaskInsert(data) {
    return request({
        url: '/endpoint/task/insert',
        method: 'post',
        data
    })
}

//根据id删除终端扫描任务
export function endpointTaskDelete(id) {
    return request({
        url: `/endpoint/task/delete/${id}`,
        method: 'post',
        id
    })
}


//信息源配置分页查询
export function sourceGetPage(data) {
    return request.get('/storage/source/get/page', {
        params: data
      });
}


//终端信息源配置列表
export function depHostByPage(data) {
    return request.get('/endpoint/source/depHost/get/page', {
        params: data
      });
}


//网络监控的列表
export function getTargetPage(data) {
    return request.get('/network/target/getTargetPage', {
        params: data
      });
}


//规则配置中的列表
export function scanGetRulesByPage(data) {
    return request.get('/srd/tactic/rules/getRulesByPage', {
        params: data
      });
}
















/* //组织资源列表
export function accountDeptPage(data) {
    return request.get('/endpoint/source/accountDept/get/page', {
        params: data
      });
}

//用户分组资源列表
export function accountGroupPage(data) {
    return request.get('/endpoint/source/accountGroup/get/page', {
        params: data
      });
}

//用户资源列表
export function accountPage(data) {
    return request.get('/endpoint/source/account/get/page', {
        params: data
      });
}

//网络资源列表
export function networksPage(data) {
    return request.get('network/source/networks/get/page', {
        params: data
      });
}

//邮件资源列表
export function emailPage(data) {
    return request.get('/network/source/email/get/page', {
        params: data
      });
}

//url资源列表
export function urlPage(data) {
    return request.get('/network/source/url/get/page', {
        params: data
      });
} */
