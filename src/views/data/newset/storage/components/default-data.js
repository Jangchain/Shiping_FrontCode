// 存储类型
export const storageTypeData = [
  {
    label: '阿里OSS',
    value: 'ali_oss'
  },
  {
    label: '华为OBS',
    value: 'huawei_obs'
  },
  {
    label: '腾讯COS',
    value: 'tencent_cos'
  },
  {
    label: 'Ceph S3',
    value: 's3'
  }
]

// 类型
export const fileTypeData = [
  {
    label: 'Windows文件共享',
    value: ''
  },
  {
    label: '虚拟机vmdk解析',
    value: 'VMDK'
  }
]

// 数据库类型
export const databaseTypeData = [
  {
    label: 'MySql',
    value: 'MySql'
  },
  {
    label: 'MariaDB',
    value: 'MariaDB'
  }
]

// 默认验证规则
export const defalutRules = {
  name: [
    { required: true, message: '请输入信息源名称', trigger: 'blur' },
    { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
  ],
  port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
  storageType: [{ required: true, message: '请选择类型', trigger: 'blur' }]
}
