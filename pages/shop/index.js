// pages/shop/index.js
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
import moment from 'moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: null,
    inputBounty: null,
    products: wx.getStorageSync('products') || {
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
  async onProductItemRemove(event) {
    var name = event.currentTarget.id;
    try {
      await Dialog.confirm({
        message: `确定删除[${name}]吗？`,
        selector: '#van-dialog-product'
      });
    } catch {
      return;
    }

    delete this.data.products[name];
    this.syncProducts();
  },
  onValidateBounty(event) {
    this.data.inputBounty = event.detail.replace(/[^0-9]+/g, '');
    this.setData({
      inputBounty: this.data.inputBounty
    });
  },
  onAddProductClick() {
    var name = this.data.inputName;
    var bounty = parseInt(this.data.inputBounty);
    var products = this.data.products;
    if (!name) {
      Dialog.alert({
        message: '商品名 不能为空',
        selector: '#van-dialog-product'
      });
      return;
    }

    if (!bounty) {
      Dialog.alert({
        message: '赏金 不能为空',
        selector: '#van-dialog-product'
      });
      return;
    }

    if (!!products[name]) {
      Dialog.alert({
        message: `${name} 已经存在了`,
        selector: '#van-dialog-product'
      });
      return;
    }

    products[name] = { name, bounty };

    this.syncProducts()
  },
  async onProductRedeem(event) {
    var { name, bounty } = event.currentTarget.dataset;
    var at = moment().format('yyyy-MM-DD HH:mm');

    try {
      await Dialog.confirm({
        selector: '#redeem-dialog',
        title: '选择宝贝'
      });
    } catch {
      return;
    }

    var babies = this.data.baby;
    var selectedBaby = this.data.selectedBaby;
    var hasBabyRedeem = false;

    var selectBabyObj = [];
    for (var babyName in selectedBaby) {
      if (selectedBaby[babyName]) {
        var baby = babies[babyName];

        if (baby.totalBounty < bounty) {
          Dialog.alert({
            message: `${baby.name} 赏金不够了`,
            selector: '#van-dialog-product'
          });
          return;
        }

        selectBabyObj.push(baby);
      }
    }

    for (var baby of selectBabyObj) {
      baby.totalBounty -= bounty;
      baby.redeemHistory.unshift({
        name,
        bounty,
        at
      });
      hasBabyRedeem = true;
    }

    if (hasBabyRedeem) {
      this.syncBaby();
      Toast.success({
        message: `兑换成功 -${bounty}`,
        selector: '#redeem-success'
      });
    }
  },
  onSelectedBabyChange(event) {
    var name = event.currentTarget.dataset.name;
    this.data.selectedBaby[name] = !this.data.selectedBaby[name];
    this.setData({
      selectedBaby: this.data.selectedBaby
    });
  },
  syncProducts() {
    wx.setStorageSync('products', this.data.products);
    this.setData({
      products: this.data.products
    })
  },
  syncBaby() {
    wx.setStorageSync('baby', this.data.baby);
    this.setData({
      baby: this.data.baby
    })
  }
})