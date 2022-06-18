// components/bounty-item/index.js

import Dialog from '@vant/weapp/dialog/dialog';
import moment from 'moment';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    bounty: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onClose(event) {
      const { instance } = event.detail;
      const id = event.currentTarget.id;
      instance.triggerEvent('bounty-item-remove', id, { bubbles: true, composed:true });
    },
    onReward(event) {
      var data = event.currentTarget.dataset;
      data['at'] = moment().format('yyyy-MM-DD HH:mm');
      this.triggerEvent("bounty-reward", data, { bubbles: true, composed:true });
    }
  }
})
