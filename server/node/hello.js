var fs = require('fs')

function remove(tarPath, cb, removeStates) {
    var path = require('path')
    if (!removeStates) {
        removeStates = {
            cur: 0,
            all: 0
        }
    } else {
        if (!removeStates.cur) {
            removeStates.cur = 0;
        }
        if (!removeStates.all) {
            removeStates.all = 0;
        }
    }
    removeStates.all++;
    fs.stat(tarPath, function (err, states) {
        removeStates.cur++;
        if (err) {
            cb && cb()
            return
        }
        if (states.isDirectory()) {
            fs.readdir(tarPath, function (err, files) {
                if (err) {
                    console.log(err)
                    cb && cb()
                    return
                }
                if (files.length < 1) {
                    fs.rmdir(tarPath, cb)
                    return
                }
                var count = 0
                var checkEnd = function () {
                    if (++count == files.length) {
                        fs.rmdir(tarPath, cb)
                    }
                }
                files.forEach(function (file) {
                    remove(path.join(tarPath, file), checkEnd, removeStates)
                })
            })
        } else {
            fs.unlink(tarPath, function (err) {
                if (err) {
                    console.log(err)
                }
                cb && cb()
                return
            })
        }
    })
    return removeStates
}

function user(req, res) {
    var multiparty = require('multiparty'); //文件上传模块
    var form = new multiparty.Form(); //新建表单
    var AdmZip = require('adm-zip')
    iconv = require("iconv-lite")
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./";

    /*form.parse表单解析函数，fields是生成数组用获传过参数，files是bolb文件名称和路径*/
    form.parse(req, function (err, fields, files) {
        console.log('删除dms文件夹')
        var zip = new AdmZip(files.file[0].path)
        zip.extractAllTo("./", true, function () {
            console.log('11111')
        })
        remove('./' + fields.name, function () {
            //获取文件名称
            var url = files.file[0].originalFilename;
            console.log(url.split('.zip')[0], './'+fields.name)
            //修改临时文件名字
            fs.renameSync(url.split('.zip')[0], './'+fields.name);
            //修改临时文件名字
            // fs.rename('./' + url, './' + fields.name + '.zip', function (err) {
            //     console.log('修改完毕，开始解压')
            //     if (err) {
            //         console.log("重命名失败！");
            //     } else {
            //         console.log("重命名成功！");
            //     }
            // })
            //解压
            // remove('./' + url.split('.zip')[0], function () {

            // });
            remove('./' + files.file[0].path, function () {

            });
            var data = JSON.stringify({
                'code': 1,
                'msg': '继续上传'
            });
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end(data); //返回数据  
        })

    })
    return user;
};
//键值同名可以只写一个
exports.user = user