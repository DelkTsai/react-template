import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
  SearchBar,
  WhiteSpace,
  WingBlank,
  List,
  ActivityIndicator,
} from "antd-mobile";
import PropTypes from "prop-types";
import qs from "query-string";
import "./search.less";

const Item = List.Item;
const Brief = Item.Brief;

@inject("store")
@observer
export default class Search extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    animating: false,
  };

  componentDidMount() {
    this.autoFocusInst.focus();
  }

  initSearchInputref = ref => {
    this.autoFocusInst = ref;
  };

  search = keyword => {
    this.props.store.bookState.setSearchList();
    this.setState({ animating: true });
    this.props.store.bookState
      .search(keyword)
      .then(
        () => this.setState({ animating: false }),
        () => this.setState({ animating: false })
      );
  };

  handleClick = (bookId, title) => {
    this.props.history.push(
      `/book/chapters?${qs.stringify({ bookId, title })}`
    );
  };

  renderListItem = () => {
    const {
      searchList: { books = [] },
    } = this.props.store.bookState;
    return books.map(({ title, author, _id, cat }) => (
      <Item
        key={_id}
        arrow="horizontal"
        multipleLine
        onClick={() => this.handleClick(_id, title)}
        className="search-list-item"
      >
        {title}
        <Brief>
          作者：{author} 分类：{cat}
        </Brief>
      </Item>
    ));
  };

  render() {
    const { animating } = this.state;
    return (
      <div id="search">
        <div className="search-message">Navi</div>
        <div className="search-input">
          <WingBlank>
            <SearchBar
              onCancel={this.search}
              cancelText="搜索"
              ref={this.initSearchInputref}
              placeholder="Search"
              maxLength={8}
            />
          </WingBlank>
          <WhiteSpace />
        </div>
        <div className="search-result">
          <WingBlank>
            <ActivityIndicator text="正在努力搜索中..." animating={animating} />
            <List>{this.renderListItem()}</List>
          </WingBlank>
        </div>
      </div>
    );
  }
}
