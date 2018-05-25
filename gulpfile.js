require("json5/lib/register");
const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const vsftp = require("gulp-vsftp");
const zip = require("gulp-zip");
const moment = require("moment-kirk");
const account = require("./config/default.json5");

const config = require("./config");
const packageInfo = require("./package.json");

// 生成构建时间 存放在 生产目录里
gulp.task("buildTime", async () => {
  await fs.writeFile(
    `${path.resolve(config.proDirectory)}/buildTime.text`,
    `${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}${packageInfo.version}`,
    err => {
      if (err) console.log(err);
      console.log("The file was saved!", path.resolve());
    }
  );
});

// 打包生产目录
gulp.task("zip", () => {
  gulp
    .src(`${path.resolve(config.proDirectory)}/**`)
    .pipe(
      zip(
        `build-[${packageInfo.version}]-[${moment(new Date()).format(
          "YYYY-MM-DD HH-mm-ss"
        )}].zip`
      )
    )
    .pipe(gulp.dest("backup"));
});

// 上传生产目录到测试环境
gulp.task("test", () =>
  gulp.src(`${config.proDirectory}/**`).pipe(
    vsftp({
      host: account.host,
      user: account.user,
      pass: account.pass,
      cleanFiles: true,
      remotePath: account.testPath
    })
  )
);

// 上传生产目录到预生成环境
gulp.task("pre", function() {
  return gulp.src(config.proDirectory + "/**").pipe(
    vsftp({
      host: account.host,
      user: account.user,
      pass: account.pass,
      cleanFiles: true,
      remotePath: account.pordPath
    })
  );
});
