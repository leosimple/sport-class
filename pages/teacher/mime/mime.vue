<!-- TODO 教师端我的个人中心 -->
<template>
  <view class="teacher-mime-container">
<!--头部区域-->
    <view class="img-container">
      <view class="cu-avatar xl round bg-white"
            style="border-radius: 50%"
            :style="{backgroundImage: `url(${info.imgUrl})`}"></view>
      <view class="text-xl margin-top-sm">{{info.identity}}</view>
    </view>
<!--下面区域-->
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-read"></text>
        <text class="text-grey">上课点</text>
      </view>
      <view class="action">
        <picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray" range-key="label">
          <view class="picker">{{classArray[classIndex].label}}</view>
        </picker>
        <text class="cuIcon-right"></text>
      </view>
    </view>
    <view class="cu-bar bg-white solid-bottom"  @click="goReset">
      <view class="action">
        <text class="cuIcon-lock"></text>
        <text class="text-grey">设置密码</text>
      </view>
      <view class="action">
        <text class="cuIcon-right"></text>
      </view>
    </view>
    <view class="cu-bar bg-white solid-bottom"  @click="sendPhone">
      <view class="action">
        <text class="cuIcon-phone"></text>
        <text class="text-grey">客服电话</text>
      </view>
      <view class="action">
        <text class="action text-gray">{{ info.phone }}</text>
      </view>
    </view>
    <view class="flex flex-direction margin" @click="logoutInfo">
      <button class="cu-btn bg-my-red lg">退出登陆</button>
    </view>
  </view>
</template>

<script>
	import {logout} from "../../../api/login";

  export default {
		data() {
			return {
        classIndex: 0,
        classArray: [
          {
            label: '测试地点一',
            value: 1
          },
          {
            label: '测试地点二',
            value: 2
          },
          {
            label: '测试地点三',
            value: 3
          }
        ],
			  info: {
          identity: '我是老师',
			    imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          phone: ' 400-888-1297'
        }
			}
		},
		onLoad() {

		},
		methods: {
      // 拨打电话
      sendPhone() {
        uni.makePhoneCall({
          phoneNumber: this.info.phone //仅为示例，并非真实的电话号码
        })
      },
      bindClassChange(e, item) {
        const {value} = e.detail;
        this.classIndex = value;
        // this.form.grade = data[this.gradeIndex].id;
      },
      goReset() {
        uni.navigateTo({
          url: '../../common/reset/reset'
        })
      },
      // 退出登陆
      logoutInfo() {
        logout()
        .then(res => {
          if (res.data.data.errcode === 200) {
            wx.showModal({
              title: '退出成功',
              showCancel: false
            });
            wx.clearStorageSync();
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        }).catch(err => console.log(err))
      }
		}
	}
</script>

<style>
page {
  background-color: #ffffff;
}
.teacher-mime-container .img-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F4313E;
  height: 300rpx;
  width: 100%;
  color: #ffffff;
  font-family: Source Han Sans CN;
}
</style>
