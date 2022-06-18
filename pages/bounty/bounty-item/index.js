// components/bounty-item/index.js

import Dialog from '@vant/weapp/dialog/dialog'

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

      try {
        await Dialog.confirm({
          message: `确定删除[${id}]吗？`
        });
      } catch (e) {
        return;
      }

      instance.triggerEvent('bounty-item-remove', id, { bubbles: true, composed:true });
    },
    onReward(event) {
      var data = event.currentTarget.dataset;
      data['at'] = Date.now();
      this.triggerEvent("bounty-reward", data, { bubbles: true, composed:true });
    }
  }
})
