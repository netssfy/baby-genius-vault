// pages/settings/index.js

import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baby: null,
    bountyItems: null,
    products: null
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
  async onExportClick() {
    var data = {
      baby: wx.getStorageSync('baby'),
      bountyItems: wx.getStorageSync('bountyItems'),
      products: wx.getStorageSync('products')
    };
    await wx.setClipboardData({
      data: JSON.stringify(data),
    });
  },
  onImportPreview() {
    var This = this;
    wx.getClipboardData({
      success: (res) => {
        try{
          var data = JSON.parse(res.data);
        } catch {
          Toast.fail({
            duration: 5000,
            message: '预览失败，数据不正确',
            selector: '#ieport-toast'
          });
          return;
        }
        
        This.setData({
          baby: data.baby,
          bountyItems: data.bountyItems,
          products: data.products
        });
      }
    })
  },
  async onImportClick() {
    try {
      await Dialog.confirm({
        message: `确定导入吗？`,
        selector: '#van-dialog-ieport'
      });
    } catch {
      return;
    }

    wx.setStorageSync('baby', this.data.baby);
    wx.setStorageSync('bountyItems', this.data.bountyItems);
    wx.setStorageSync('products', this.data.products);
    
    this.setData({
      baby: null,
      bountyItems: null,
      products: null
    });

    Toast.success({
      message: '导入成功',
      selector: '#ieport-toast'
    });
  },
  async onClearAll() {
    try {
      await Dialog.confirm({
        message: `确定清空所有数据吗？`,
        selector: '#van-dialog-ieport'
      });
    } catch {
      return;
    }

    wx.clearStorage({
      success: (res) => {
        Toast.success({
          message: '清空成功',
          selector: '#ieport-toast'
        });
      },
    });
  }
})