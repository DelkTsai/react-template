/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       单页应用的入口文件
 * */

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import { hotRehydrate, rehydrate } from "rfx-core";
import moment from "moment";
import PropTypes from "prop-types";
import "normalize.css";
import { isProduction } from "./utils/constants";
import "./stores/stores";
import "./styles/main.less";
import { routes } from "./router/routes";

/**
 * moment时区设置为中国
 */
moment.locale("zh-cn");

const store = rehydrate();

const renderRoute = ({ path, component }) => (
  <Route key={path} path={path} component={component} exact />
);

renderRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.element,
};

const renderApp = () => {
  render(
    <Provider store={isProduction ? store : hotRehydrate()}>
      <Router>
        <Switch>{routes.map(renderRoute)}</Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
};

function run() {
  renderApp();
  if (module.hot) {
    module.hot.accept(renderApp);
  }
}

run();
