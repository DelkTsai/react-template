import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { routes } from "../routes";
import { PanelBody } from "./common/Panel";

@inject("store")
@withRouter
@observer
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 建议不写内链样式,这里偷懒 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "350px"
          }}
        >
          <PanelBody id="test" style={{ padding: "24px" }}>
            <h2>前端项目模板</h2>
          </PanelBody>
        </div>
        <DevTools />
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} exact />
        ))}
      </div>
    );
  }
}