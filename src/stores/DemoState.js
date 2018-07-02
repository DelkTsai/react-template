/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       demoState
 * */

import { action, computed, observable } from "mobx";
import request from "../utils/request";

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["test"] }] */

export default class DemoState {
  /**
   * *************************** observable ***************************
   * */

  @observable data = "hello, world";
  @observable ajax = [];
  @observable
  echarts = [{ x: "重庆", y: "2018", value: "666", seriesType: "bar" }];

  /**
   * ****************************** ajax ******************************
   * */

  /**
   * 获取数据
   * */
  async getAjax() {
    const { data } = await request({
      config: { method: "GET", url: "/inapi/simulation/page1" },
    });
    this.setAjax(data);
    return data;
  }

  /**
   * ***************************** action *****************************
   * */

  @action
  setData(data) {
    this.data = data;
  }

  @action
  setEcharts(data = []) {
    this.echarts = data;
  }

  @action
  setAjax(data) {
    this.ajax = data;
  }

  /**
   * **************************** computed ****************************
   * */
  @computed
  get computedData() {
    if (this.data.length > 0) {
      return "computed";
    }
    return [];
  }
}
