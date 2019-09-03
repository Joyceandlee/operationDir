const fs = require('fs');
let list = [];

//实现删除目标目录下的所有文件及文件夹
function removeDir(pathname) {
    if (fs.existsSync(pathname)) {
        if (fs.statSync(pathname).isDirectory()) {
            //如果是一个文件夹
            let arr = [];
            arr = fs.readdirSync(pathname);
            arr.forEach((item, index) => {
                //递归
                removeDir(pathname + '/' + item)
            })
            fs.rmdirSync(pathname)
        } else {
            //如果是一个文件
            fs.unlinkSync(pathname)
        }
    } else {
        console.log("文件不存在！")
    }
}

//实现拷贝目标目录的所有文件结构
function copyDir(fromPath, toPath) {
    if (fs.existsSync(fromPath)) {
        if (fs.statSync(fromPath).isDirectory()) {
            fs.mkdirSync(toPath)
            let arr = fs.readdirSync(fromPath);
            arr.forEach((item, index) => {
                copyDir(fromPath + '/' + item, toPath + '/' + item)
            })
        } else {
            let content = fs.readFileSync(fromPath);
            fs.writeFileSync(toPath, content)
        }
    } else {
        console.log("文件不存在！")
    }
}

//实现目标目录的扁平化展示
function flatDir(fromPath, toPath) {
    if (fs.existsSync(fromPath)) {
        if (fs.statSync(fromPath).isDirectory()) {
            let arr = fs.readdirSync(fromPath);
            arr.forEach((item, index) => {
                list.push(item)
                flatDir(fromPath + '/' + item, toPath)
            })
        }
    } else {
        console.log("文件不存在！")
    }
    fs.writeFileSync(toPath, list)
}

module.exports={
    removeDir,
    copyDir,
    flatDir
}

// removeDir("./test")
// copyDir("./src","./test")
flatDir("./src", "./test.txt")
