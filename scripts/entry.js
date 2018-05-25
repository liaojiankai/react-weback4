require("json5/lib/register"); // 可以require()来添加JSON5文件
const fs = require("fs");
const path = require("path");

const config = require("../config/entry.json5");
const rm = require("rimraf");

// 定义entryBuild
const entryBuildPath = path.resolve(__dirname, "../entryBuild");
// 删除entryBuild
rm.sync(entryBuildPath);
// 创建entryBuild
fs.mkdirSync(entryBuildPath);
const entryContent = data => `
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/compontent/${data.path}';

ReactDOM.render(<App />, document.getElementById('app'));
`;
/*生成webpack entry 入口文件*/
config.map(data => {
  fs.writeFile(
    `${entryBuildPath}/${data.name}.js`,
    entryContent(data),
    "utf8",
    err => {
      if (err) return console.log(err);
    }
  );
});
