// pages/bounty/index.js

import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: null,
    inputBounty: null,
    bountyItems: wx.getStorageSync('bountyItems') || {
      // name:{ name, bounty }
    },
    baby: wx.getStorageSync('baby') || {},
    selectedBaby: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      baby: wx.getStorageSync('baby') || {},
      bountyItems: wx.getStorageSync('bountyItems') || {}
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async onBountyItemRemove(event) {
    try {
      await Dialog.confirm({
        message: `确定删除[${event.detail}]吗？`,
        selector: '#van-dialog-bounty'
      });
    } catch {
      return;
    }

    var name = event.detail;
    delete this.data.bountyItems[name];
    this.syncBountyItems();
  },
  onValidateBounty(event) {
    this.data.inputBounty = event.detail.replace(/[^0-9]+/g, '');
    this.setData({
      inputBounty: this.data.inputBounty
    });
  },
  onAddBountyClick() {
    var name = this.data.inputName;
    var bounty = parseInt(this.data.inputBounty);
    var bountyItems = this.data.bountyItems;
    if (!name) {
      Dialog.alert({
        message: '悬赏 不能为空',
        selector: '#van-dialog-bounty'
      });
      return;
    }

    if (!bounty) {
      Dialog.alert({
        message: '赏金 不能为空',
        selector: '#van-dialog-bounty'
      });
      return;
    }

    if (!!bountyItems[name]) {
      Dialog.alert({
        message: `${name} 已经存在了`,
        selector: '#van-dialog-bounty'
      });
      return;
    }

    bountyItems[name] = { name, bounty};

    this.syncBountyItems()
  },

  async onBountyReward(event) {
    var { name, bounty, at } = event.detail;
    
    try {
      await Dialog.confirm({
        selector: '#reward-dialog',
        title: '选择宝贝'
      });
    } catch {
      return;
    }

    var babies = this.data.baby;
    var selectedBaby = this.data.selectedBaby;
    var hasBabyReward = false;
    for (var babyName in selectedBaby) {
      if (selectedBaby[babyName]) {
        var baby = babies[babyName];
        baby.totalBounty += bounty;
        baby.bountyHistory.unshift({
          name,
          bounty,
          at
        });
        hasBabyReward = true;
      }
    }

    if (hasBabyReward) {
      this.syncBaby();
      Toast.success({
        message: `领赏成功 +${bounty}`,
        selector: '#reward-success'
      });
    }
  },

  syncBountyItems() {
    this.setData({
      bountyItems: this.data.bountyItems
    });
    wx.setStorageSync('bountyItems', this.data.bountyItems);
  },

  onSelectedBabyChange(event) {
    var name = event.currentTarget.dataset.name;
    this.data.selectedBaby[name] = !this.data.selectedBaby[name];
    this.setData({
      selectedBaby: this.data.selectedBaby
    });
  },

  syncBaby() {
    wx.setStorageSync('baby', this.data.baby);
    this.setData({
      baby: this.data.baby
    })
  }
})