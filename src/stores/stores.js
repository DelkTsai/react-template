/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       mobx统一注册store
 * */

import { store } from "rfx-core";

import BookState from "./BookState";

export default store.setup({
  bookState: BookState,
});
