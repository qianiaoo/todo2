const express = require('express')
const fs = require('fs')

const app = express()
app.use(express.json())

const port = 8888

app.all("*", function (req, res, next) {
//设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.get('/get', (req, res) => {
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) console.log(err);
        const test1 = JSON.parse(data);//读取的值
        console.log(test1)
        res.json(test1)

    });
    // res.status(404).json({'error': "1"})
})

app.post('/a', (req, res) => {
    const title = req.body.title
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) console.log(err);
        const todos = JSON.parse(data);//读取的值
        console.log(typeof todos)
        todos.push({
            "title": title,
            "isOver": false
        })
        fs.writeFile('data.json', JSON.stringify(todos), err => {
            if (err) {
                console.error(err)
            }
        }, ()=> {
            const resData = JSON.stringify(todos)
            console.log(resData)
            res.json(todos)
        })
    });
})

app.post('/u', (req, res) => {
    const title = req.body.title
    const isOver = req.body.isOver
    fs.readFile('data.json', 'utf8', function (err, data) {
        if (err) console.log(err);
        const test1 = JSON.parse(data);//读取的值
        test1.forEach(t => {
            console.log(t.title);
            if (t.title === title) {
                t.isOver = isOver
            }
        })

        fs.writeFile('data.json', JSON.stringify(test1), err => {
            if (err) {
                console.error(err)
                return
            }
            //文件写入成功。
        }, ()=>{
            res.json(test1)

        })
    });
    // res.send('POST request to the homepage');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
