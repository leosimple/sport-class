<!-- TODO 教师端 我的班级 -->
<template>
  <view class="margin class-container">
    <!--搜索区域-->
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入班级名称" v-model="searchInput"/>
      </view>
      <view class="action" @click="searchValue">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>
<!--列表-->
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index">
        <view class="cu-bar bg-white solid-bottom margin-top" @click="goDetail(item.id)">
          <view class="action">
            <view class="flex flex-direction padding-top padding-bottom">
              <view class="margin-bottom-sm">
                <text class="ban-red">班</text>
                <text>{{item.ban}}</text>
              </view>
              <view class="margin-bottom-sm">
                <text class="ke-orange">课</text>
                <text>{{item.ke}}</text>
              </view>
              <view>
                <text class="ren-green">人</text>
                <text>{{item.number}}</text>
              </view>
            </view>
          </view>
          <view class='action'><view class="cuIcon-right"></view></view>
        </view>
      </view>
    </block>
    <block wx:else>
      <view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
// import {getMyClassList} from '../../../../api/teacher/myClass';
export default {
  data() {
    return {
      searchInput: '',
      list: [
        {
          id: 1,
          ban: '2020通用课程',
          ke: '篮球',
          number: 20
        },
        {
          id: 2,
          ban: '2020通用课程',
          ke: '篮球',
          number: 20
        },
        {
          id: 3,
          ban: '2020通用课程',
          ke: '篮球',
          number: 20
        },
        {
          id: 4,
          ban: '2020通用课程',
          ke: '篮球',
          number: 20
        }
      ],
      params: {
        pi : 1,
        ps : 100,
      },
    }
  },
  onLoad() {
    // this.getList();
  },
  methods: {

    getList() {
      let user = wx.getStorageSync('userData'),
      teacherid = user.venueid;
      getMyClassList({
        ...this.params
      })
      .then(res => {
        let data = res.data.data;
        console.log(data);
      }).catch(err => console.log(err));
    },

    searchValue() {
      console.log(this.searchInput);
    },
    goDetail(id) {
      uni.navigateTo({
        url: `../detail/detail?id=${id}`
      });
    }
  }
}
</script>

<style>
</style>
