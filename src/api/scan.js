import request from '@/utils/request'

//单个删除
export function scanComplianceDelete(data) {
    return request({
        url: `/srd/compliance/delete/${id}`,
        method: 'post',
        data
    })
}

//批量删除
export function scanComplianceDeleteBatch(data) {
    return request({
        url: `/srd/compliance/delete/batch`,
        method: 'post',
        data
    })
}

//分页查询
export function scanComplianceQueryPage(data) {
    return request.get('/srd/compliance/query/page', {
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

//信息源配置分页查询
export function sourceGetPage(data) {
    return request.get('/storage/source/get/page', {
        params: data
      });
}


//规则配置中的列表
export function scanGetRulesByPage(data) {
    return request.get('/srd/tactic/rules/getRulesByPage', {
        params: data
      });
}

//规则配置中的识别模型列表
export function scanGetContentClassifierByPage(data) {
    return request.get('/srd/resource/contentClassifier/getContentClassifierByPage', {
        params: data
      });
}

//修改时step1
export function validationDuplicate(data) {
    return request({
        url: '/common/validation/duplicate',
        method: 'post',
        data
    })
}

//高级配置中的类型过滤自定义列表
/* current: 1
size: 10 */
export function getSpPlcFileTypesExtensionByPage(data) {
    return request.get('/resource/contentClassifier/getSpPlcFileTypesExtensionByPage', {
        params: data
      });
}
