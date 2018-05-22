/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       demoState
 * */

import { action, computed, observable } from "mobx";
import request from "../utils/axios";

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["test"] }] */

export default class BookState {
  /**
   * *************************** observable ***************************
   * */

  @observable searchList = { books: [] };
  @observable bookSources = [];
  @observable bookChapters = { chapters: [] };
  @observable bookChapterContent = { chapter: { title: "", body: "" } };

  /**
   * ****************************** ajax ******************************
   * */

  /**
   * 获取搜索结果
   * */
  async search(keyword) {
    const { data } = await request(
      { method: "GET", url: "/novel/search", params: { keyword } },
      {},
      { message: "请求失败" }
    );
    this.setSearchList(data);
    return data;
  }

  /**
   * 获取书籍来源
   * */
  async getBookSources(params) {
    const { data } = await request(
      { method: "GET", url: "/novel/book-sources", params },
      {},
      { message: "请求失败" }
    );
    this.setBookSourcest(data);
    return data;
  }

  /**
   * 获取书籍章节列表
   * */
  async getBookChapters(bookSourceId) {
    const { data } = await request(
      {
        method: "GET",
        url: `/novel/book-chapters/${bookSourceId}`,
      },
      {},
      { message: "请求失败" }
    );
    this.setBookChapters(data);
    return data;
  }

  /**
   * 获取书籍章节内容
   * */
  async getBookChapterContent(link) {
    const { data } = await request(
      {
        method: "GET",
        url: `/chapter/${link}`,
      },
      {},
      { message: "请求失败" }
    );
    this.setBookChapterContent(data);
    return data;
  }

  /**
   * ***************************** action *****************************
   * */

  @action
  setSearchList(data = { books: [] }) {
    this.searchList = data;
  }

  @action
  setBookSourcest(data = {}) {
    this.bookSources = data;
  }

  @action
  setBookChapters(data = { chapters: [] }) {
    this.bookChapters = data;
  }

  @action
  setBookChapterContent(data = { chapter: { title: "", body: "" } }) {
    this.bookChapterContent = data;
  }

  /**
   * **************************** computed ****************************
   * */
  // @computed
  // get computedData() {
  //   if (this.data.length > 0) {
  //     return "computed";
  //   }
  //   return [];
  // }
}
