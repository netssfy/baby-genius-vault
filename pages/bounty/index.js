// pages/bounty/index.js

import Dialog from '@vant/weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: null,
    inputBounty: null,
    bountyItems: {
      // name:bounty
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // load bountyItems
    this.data.bountyItems = wx.getStorageSync('bountyItems') || {};
    this.setData({
      bountyItems: this.data.bountyItems
    });
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
  onBountyItemRemove(event) {
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
    var bounty = this.data.inputBounty;
    var bountyItems = this.data.bountyItems;
    if (!name) {
      Dialog.alert({
        message: '悬赏 不能为空'
      });
      return;
    }

    if (!bounty) {
      Dialog.alert({
        message: '赏金 不能为空'
      });
      return;
    }

    if (!!bountyItems[name]) {
      Dialog.alert({
        message: `${name} 已经存在了`
      });
      return;
    }

    bountyItems[name] = bounty;

    this.syncBountyItems()
  },

  syncBountyItems() {
    this.setData({
      bountyItems: this.data.bountyItems
    });
    wx.setStorageSync('bountyItems', this.data.bountyItems);
  }
})