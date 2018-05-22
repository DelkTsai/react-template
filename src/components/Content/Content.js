/**
 * Date              Author           Des
 *----------------------------------------------
 * 2018/5/22           gongtiexin
 * */

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import qs from "query-string";
import PropTypes from "prop-types";
import { Card } from "antd-mobile";

@inject("store")
@observer
export default class Content extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { link } = qs.parse(window.location.search);
    this.props.store.bookState.getBookChapterContent(link);
  }

  componentWillUnmount() {}

  render() {
    const {
      bookChapterContent: {
        chapter: { title, cpContent },
      },
    } = this.props.store.bookState;
    return (
      <div id="content">
        <Card>
          <Card.Header title={title} />
          <Card.Body>
            <div style={{ whiteSpace: "pre-line" }}>{cpContent}</div>
          </Card.Body>
          <Card.Footer content="上一章" extra={<div>下一章</div>} />
        </Card>
      </div>
    );
  }
}
