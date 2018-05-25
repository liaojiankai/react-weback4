require("json5/lib/register");
const fs = require("fs");
const rm = require("rimraf");

const fileConfig = require("../config");
const entryConfig = require("../config/entry.json5");
const utils = require("../build/utils");

/*删除开发目录*/
rm.sync(fileConfig.devDirectory);
/* 创建开发目录 */
fs.mkdirSync(fileConfig.devDirectory);

/* 生成HTML */
let htmlCont = fs.readFileSync("index.tpl.html", "utf-8");
let scriptInsert = `
<script type="text/javascript" src="js/manifest.js"></script>
<script type="text/javascript" src="js/vendor.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/key.js"></script>
`;
htmlCont = htmlCont.replace("</body>", scriptInsert + "</body>");
entryConfig.map(data => {
  fs.writeFile(
    `${fileConfig.devDirectory}/${data.name}.html`,
    htmlCont
      .replace("js/key.js", `js/${data.name}.js`)
      .replace(
        "<%= htmlWebpackPlugin.options.title %>",
        utils.titleFun(data.name, data.title)
      ),
    "utf8",
    err => {
      if (err) return console.log(err);
    }
  );
});
