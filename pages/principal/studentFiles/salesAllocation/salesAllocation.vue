<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入班级名称" v-model="searchGradeInput"/>
        </view>
        <view class="action" @click="searchData">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
          <view class="margin-left" @click="showDrawer">
            <text>筛选</text>
            <text class="cuIcon-triangledownfill text-gray"></text>
          </view>
        </view>
      </view>
      <!--筛选侧边栏-->
      <uni-drawer ref='drawer' mode="right" style="z-index: 99999">
        <!--头部-->
        <view class="solids-bottom flex align-center justify-center">
          <view class="padding">筛选</view>
        </view>
        <!--内容区域-->
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">销售跟进人</view>
          <picker @change="bindGradeChange($event, gradeArray)"
                  :value="gradeIndex" :range="gradeArray" range-key="label">
            <view class="picker">{{ gradeArray[gradeIndex].label }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">跟进状态</view>
          <picker @change="bindClassChange($event, classArray)"
                  :value="classIndex" :range="classArray" range-key="label">
            <view class="picker">{{ classArray[classIndex].label }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">意向级别</view>
          <picker @change="bindTeacherChange($event, teacherArray)"
                  :value="teacherIndex" :range="teacherArray" range-key="label">
            <view class="picker">{{ teacherArray[teacherIndex].label }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">学员来源</view>
          <picker @change="bindPackageChange($event, packageArray)"
                  :value="packageIndex" :range="packageArray" range-key="label">
            <view class="picker">{{ packageArray[packageIndex].label }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">学员标签</view>
          <picker @change="bindLabelChange($event, labelArray)"
                  :value="labelIndex" :range="labelArray" range-key="label">
            <view class="picker">{{ labelArray[labelIndex].label }}</view>
          </picker>
        </view>
        <!--底部区域-->
        <view class="drawer-footer">
          <button class="bg-my-red lg cu-btn" style="width: 100%;"
                  @click="searchData">确定
          </button>
        </view>
      </uni-drawer>

      <!--列表-->
      <view class="cu-list menu-avatar margin-top">
        <block v-if="list.length > 0">
          <checkbox-group class="block" @change="chooseItem">
            <view class="cu-list menu text-left">
              <view class="cu-item margin-bottom" v-for="item in list"
                    :key="item.id">
                <label class="flex justify-between align-center flex-sub">
                  <view class="padding-top padding-bottom padding-right">
                    <view class="cu-avatar round lg"
                          :style="{backgroundImage: `url(${item.imgList})`}"
                          style="border-radius: 50%"></view>
                  </view>
                  <view class="flex-sub padding-top padding-bottom">
                    <view class="padding-bottom-sm">{{
                        item.studentsName
                      }}
                    </view>
                    <view class="text-gray text-sm flex">
                      <text class="text-cut">{{ item.content }}</text>
                    </view>
                  </view>
                  <checkbox :value="Number(item.id)" :checked="item.checked"
                            class="round"></checkbox>
                </label>
              </view>
            </view>
          </checkbox-group>
        </block>
      </view>

    </view>
    <view class="drawer-footer">
      <button class="cu-btn lg bg-white" style="width: 30%" @click="changeAll">
        全选
      </button>
      <button class="cu-btn lg bg-red" style="width: 70%" @click="setSale">
        分配销售跟进人
      </button>
    </view>

    <view class="cu-modal show" v-if="showSalesUser">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseSaleItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in saleArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{ item.name }}</text>
                </view>
                <radio class="round" :value="item.name"></radio>
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white">确定</button>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  name: "potentialStudent",
  data() {
    return {
      list: [
        {
          id: 1,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进',
          checked: false,
        },
        {
          id: 2,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '',
          checked: false,
        },
        {
          id: 3,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进',
          checked: false,
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '',
          checked: false,
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进',
          checked: false,
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进',
          checked: false,
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '',
          checked: false,
        }

      ],
      check: [],
      checkAll: [],
      searchGradeInput: '',
      showSalesUser: false,
      saleUser: '',
      saleArray: [
        {
          id: 1,
          name: '洪晓光'
        },
        {
          id: 1,
          name: '朱正义'
        },
        {
          id: 1,
          name: '日无长'
        }
      ],
      // 选择课程
      classIndex: 0,
      classArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择课程
      gradeIndex: 0,
      gradeArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择老师
      teacherIndex: 0,
      teacherArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择课程套餐
      packageIndex: 0,
      packageArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择标签
      labelIndex: 0,
      labelArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
    }
  },
  methods: {
    searchData() {
      console.log(this.form);
    },
    showDrawer() {
      this.$refs['drawer'].open();
    },
    closeDrawer() {
      this.$refs['drawer'].close();
    },
    // 筛选区域
    // 选择课程
    bindClassChange(e, data) {
      const {value} = e.detail;
      this.classIndex = value;
      this.form.class = data[this.classIndex].id;
    },
    // 选择课程
    bindGradeChange(e, data) {
      const {value} = e.detail;
      this.gradeIndex = value;
      this.form.grade = data[this.gradeIndex].id;
    },
    // 选择课程
    bindTeacherChange(e, data) {
      const {value} = e.detail;
      this.teacherIndex = value;
      this.form.teacher = data[this.teacherIndex].id;
    },
    // 选择课程
    bindPackageChange(e, data) {
      const {value} = e.detail;
      this.packageIndex = value;
      this.form.package = data[this.packageIndex].id;
    },
    // 选择课程
    bindLabelChange(e, data) {
      const {value} = e.detail;
      this.labelIndex = value;
      this.form.label = data[this.labelIndex].id;
    },
    changeAll() {
      this.list.map(item => {
        item.checked = !item.checked;
        if (item.checked) {
          this.checkAll = this.checkAll.concat(item.id);
        } else {
          this.checkAll = [];
        }
      });
      console.log(this.checkAll);
    },
    chooseItem(e) {
      if (this.check.length === 0) {
        this.checkAll = [];
      }
      let {value} = e.detail;
      this.check = value;
      console.log(this.check);
    },
    setSale() {
      if (this.check.length !== 0 || this.checkAll.length !== 0) {
        this.showSalesUser = true;
      } else {
        wx.showToast({
          title: '请选择学员',
          icon: 'none',
          duration: 3000
        })
      }
    },
    hideModal() {
      this.showSalesUser = false;
    },
    chooseSaleItem(e) {
      let {value} = e.detail;
      this.saleUser = value;
    }
  }
}
</script>

<style scoped>

</style>