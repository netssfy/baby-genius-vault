// pages/vault/index.js

import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newBabyName: null,
    baby: wx.getStorageSync('baby') || {
      // name: '',
      // bountyHistory: [],
      // redeemHistory: []
    }
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
    this.data.baby = wx.getStorageSync('baby') || {};
    this.setData({
      baby: this.data.baby
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
  async onRemovBabyClick(event) {
    var baby = event.target.dataset.name;
    try {
      await Dialog.confirm({
        selector: '#van-dialog-vault',
        message: `确定删除宝贝[${baby}]吗？`
      });
    } catch {
      return;
    }
    delete this.data.baby[baby];
    this.syncBaby();
  },
  onAddBabyClick(event) {
    var name = this.data.newBabyName;
    if (!name) {
      Dialog.alert({
        selector: '#van-dialog-vault',
        message: '宝贝昵称不能为空'
      });
      return;
    }

    if (!!this.data.baby[name]) {
      Dialog.alert({
        selector: '#van-dialog-vault',
        message: `宝贝昵称[${name}]已经存在`
      });
      return;
    }

    this.data.baby[name] = {
      name: name,
      bountyHistory: [],
      redeemHistory: []
    };
    this.syncBaby();
  },
  syncBaby() {
    wx.setStorageSync('baby', this.data.baby);
    this.setData({
      baby: this.data.baby
    })
  }
})