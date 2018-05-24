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
import Particles from "particlesjs";
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
    Particles.init({
      selector: ".particles-background",
      connectParticles: true,
      color: "#ecf0f1",
      speed: 0.5,
      maxParticles: 55,
    });
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
        <Brief
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>作者：{author}</div>
          <div>分类：{cat}</div>
        </Brief>
      </Item>
    ));
  };

  render() {
    const { animating } = this.state;
    return (
      <div id="search">
        <canvas className="particles-background" />
        <div className="search-container">
          <div className="search-input">
            <WingBlank size="lg">
              <SearchBar
                onCancel={this.search}
                cancelText="搜索"
                ref={this.initSearchInputref}
                placeholder="Search"
                maxLength={8}
              />
            </WingBlank>
          </div>
          <WhiteSpace />
          <div className="search-message">找到你想看的小说</div>
          <WhiteSpace />
          <div className="search-result">
            <WingBlank size="lg">
              <ActivityIndicator
                text="正在努力搜索中..."
                animating={animating}
              />
              <List>{this.renderListItem()}</List>
            </WingBlank>
          </div>
        </div>
      </div>
    );
  }
}
