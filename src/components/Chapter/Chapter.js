/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/5/22           gongtiexin       书籍章节组件
 * */

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { ListView, WingBlank } from "antd-mobile";
import qs from "query-string";
import PropTypes from "prop-types";
import "./chapter.less";

@inject("store")
@observer
export default class Chapter extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
    this.title = "navi";
  }

  componentDidMount() {
    const { bookId, title } = qs.parse(window.location.search);
    this.title = title;
    this.props.store.bookState
      .getBookSources({
        view: "summary",
        book: bookId,
      })
      .then(bookSources => {
        if (bookSources.length === 0) {
          return;
        }
        const bookSourceId = bookSources[0]._id;
        this.props.store.bookState
          .getBookChapters(bookSourceId)
          .then(({ chapters = [] }) =>
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(chapters),
              isLoading: false,
            })
          );
      });
  }

  componentWillUnmount() {}

  handleClick = link => {
    this.props.history.push(`/book/chapters/detail?link=${link}`);
  };

  render() {
    const {
      bookChapters: { name = "navi" },
    } = this.props.store.bookState;
    const { dataSource } = this.state;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          height: 0,
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => (
      <div
        key={rowID}
        style={{ padding: "0 15px", width: 315 }}
        onClick={() => this.handleClick(rowData.link)}
      >
        <div
          style={{
            lineHeight: "50px",
            color: "#888",
            fontSize: 14,
            borderBottom: "1px solid #ECF0F1",
          }}
        >
          {rowData.title}
        </div>
      </div>
    );
    return (
      <div id="chapter">
        <WingBlank size="lg">
          <ListView
            dataSource={dataSource}
            initialListSize={20}
            renderHeader={() => (
              <span className="chapter-message">
                {this.title} --来源：{name}
              </span>
            )}
            renderFooter={() => (
              <div style={{ padding: 30, textAlign: "center" }}>
                {this.state.isLoading ? "加载中..." : "加载完成"}
              </div>
            )}
            renderRow={row}
            renderSeparator={separator}
            className="am-list"
            pageSize={5}
            useBodyScroll
            scrollRenderAheadDistance={500}
          />
        </WingBlank>
      </div>
    );
  }
}
