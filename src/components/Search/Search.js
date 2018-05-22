import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { SearchBar, WhiteSpace, WingBlank, List } from "antd-mobile";
import PropTypes from "prop-types";
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

  componentDidMount() {
    this.autoFocusInst.focus();
  }

  initSearchInputref = ref => {
    this.autoFocusInst = ref;
  };

  search = keyword => {
    this.props.store.bookState.search(keyword);
  };

  handleClick = bookid => {
    this.props.store.bookState
      .getBookSources({
        view: "summary",
        book: bookid,
      })
      .then(bookSources =>
        this.props.history.push(
          `/book/chapters?bookSourceId=${
            bookSources.length > 0 ? bookSources[0]._id : ""
          }`
        )
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
        onClick={() => this.handleClick(_id)}
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
            <List>{this.renderListItem()}</List>
          </WingBlank>
        </div>
      </div>
    );
  }
}
