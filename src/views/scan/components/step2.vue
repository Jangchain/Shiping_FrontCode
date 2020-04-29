<template>
  <div>
    <div id="top1">
      <ul>
        <li>
          <i style="background:#53d1ff;border:solid 3px #dcf6ff">step1</i>
          <i>基本信息</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#DF9DFF;border:solid 3px #f9e9ff">step2</i>
          <i>选取信息源</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#fff;border:solid 3px #5567CD">step3</i>
          <i>规则配置</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#fff;border:solid 3px #5567CD">step4</i>
          <i>管控配置</i>
        </li>
      </ul>
    </div>
    <div id="bts">
      <p>选取信息源</p>
      <el-tabs type="border-card">
        <el-tab-pane label="存储类目标">
          <div id="left">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="存储信息源" align="center">
                  <template slot-scope="scope">
                   <el-switch
                    v-model="scope.value1"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                align="right" label="类型" >
                    <template slot="header" slot-scope="scope">
                        <el-button type="text">类型</el-button>
                        <el-select v-model="scope.select" slot="prepend" placeholder="请选择">
                            <el-option v-for="typelo in types" :key="typelo.value" :label="typelo.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <div id="right">
              <el-table :data="tableData" style="width: 100%">
              <el-table-column label="存储信息源" align="center">
                  <template slot-scope="scope">
                   <el-switch
                    v-model="scope.value1"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                align="right" label="类型" >
                    <template slot="header" slot-scope="scope">
                        <el-button type="text">类型</el-button>
                        <el-select v-model="scope.select" placeholder="请选择">
                          <el-option v-for="typelo in types" :value="typelo.label" :key="typelo.value">
                          </el-option>
                      </el-select>
                    </template>
                </el-table-column>
            </el-table>
          </div>
        <span id="aa">信息源解释说明信息源解释说明信息源解释说明信息源解释说明，去新建信息源。</span>

        </el-tab-pane>
        <el-tab-pane label="终端类目标">配置管理</el-tab-pane>
      </el-tabs>
      <div id="btn">
        <el-button id="btns" @click="back()">上一步</el-button>
        <el-button id="btns" type="primary" @click="go()">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'step2',
  data() {
    return {
      value1:'',
      tableData: [
          {
            value1:true,
            select:''
          },
          {
            value1:true,
            select:''
          },
          {
            value1:true,
            select:''
          },
        {
            value1:true,
            select:''
          },
          {
            value1:true,
            select:''
          },
          {
            value1:true,
            select:''
          },{
            value1:true,
            select:''
          },
          {
            value1:false,
            select:''
          },
          {
            value1:true,
            select:''
          },
      ],
      types:[
           {
              value: 'all',
              label: '全部',
            },
            {
              value: 'share',
              label: '共享文档',
            },
            {
              value: 'oracle',
              label: '数据库',
            },
            {
              value: 'ftps',
              label: 'FTP',
            },
            {
              value: 'linuxs',
              label: 'Linux主机',
            },
            {
              value: 'changes',
              label: 'Exchange',
            },
            {
              value: 'sahres',
              label: 'SharePoint',
            },
            {
              value: 'lotu',
              label: 'Lotus',
            },
            {
              value: 'webs',
              label: 'WebDAV',
            },
            {
              value: 'coluds',
              label: '云数据库',
            },
            {
              value: 'storage',
              label: '云对象存储',
            },
      ],
      select:''
    };
  },
  methods: {
    back(){
      this.$router.push('./step1')
    },
    go(){
      this.$router.push('./step3')
    }
  }
};
</script>

<style lang="scss">
#bts {
  width: 100%;
  margin-left: 40px;
  p {
    font-size: 24px;
    font-weight: bold;
    color: rgba(16, 16, 16, 1);
  }
  .el-tabs{
    width: 80vw;
      .el-tab-pane{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          #aa{
            position: absolute;
            top: 500px;
            display: inline-block;
            height: 40px;
            font-size: 14px;
            color: #101010;
          }
          #left{
              width: 800px;
              margin-left: 0;
              margin-bottom: 84px;
             .el-table th.is-leaf, .el-table td{
               border: none;
             }
             .el-table::before {//去掉最下面的那一条线
                height: 0px;
              }
              .el-table th{
                  background: #eee;
                }
          }
          #right{
            margin-left: 20px;
              width: 800px;
              .el-table th.is-leaf, .el-table td{
               border: none;
             }
             .el-table::before {//去掉最下面的那一条线
                height: 0px;
              }
              .el-table th{
                background: #eee;
                height: 40px;
              }
          }
      }
  }
  #btn{
    width: 100%;
    margin-top: 71px;
    .el-button{
      width: 200px;
      height: 60px;
    }
  }
}

</style>
<style lang="scss" scoped>
#top1 {
  position: relative;
  width: 100%;
  height: 100px;
  background: #2a41c1;
  // margin-top: 20px;
  border-bottom: solid 1px rgba(255, 0, 0, 0);
  ul{
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgb(19, 18, 18);
  }
 ul li{
   width: 240px;
   height: 120px;
   padding-top: 20px;
   margin-top: -20px;
   margin-right: 0;
   margin-left: 0;
   list-style: none;
   border-radius: 10px 10px 0 0;
   line-height: 100px;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   background: #fff;
   i{
     &:nth-of-type(1){
     width: 60px;
     height: 60px;
     border-radius: 30px;
    margin-top: 20px;
    line-height: 60px;
    text-align: center;
   }
   em{
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #fff;
      line-height: 100px;
      margin-top: 44px;
      color: #D4D4D4;
   }
   }
 }
 ul li:nth-child(3){
   padding-top: 0;
   height: 100px;
   background: #2a41c1;
   margin-top: 0;
 }
 ul li:nth-child(4){
   padding-top: 0;
   height: 100px;
   background: #2a41c1;
   margin-top: 0;
 }
}
i {
  font-style: normal;
}
</style>