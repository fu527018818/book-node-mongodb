var express = require('express')
var router = express.Router()

var FoodTypeDal = require('../../../common/food_type').FoodTypeDal
var foodTypeDal = new FoodTypeDal()

//使用vue接口练习
router.get('/', (req, res) => {
        var page = 1
        if (req.query.page) {
            page = Number(req.query.page)
        }
        foodTypeDal.getDataByPage(page, {}, data => {
            res.json({
                status: 'y',
                msg: '获取分页数据成功',
                data: data
            })
        })
    })

router.get('/all_type',(req,res)=>{
    foodTypeDal.getData({},data=>{
        res.json({status:'y',msg:'获取所有数据成功',data:data})
    })
})
    //根据id查找
router.get('/:id', (req, res) => {
        foodTypeDal.findByID(req.params.id, data => {
            res.json({
                status: 'y',
                msg: '获取数据成功',
                data: data
            })
        })
    })
    //新建一条记录
router.post('/create', (req, res) => {

        foodTypeDal.save(req.body, isOk => {
            if (isOk) {
                res.json({
                    status: 'y',
                    msg: '新增记录成功'
                })
            } else {
                res.json({
                    status: 'n',
                    msg: '新增记录失败'
                })
            }
        })
    })
    // 更新一条记录       delete()
router.post('/update/:id', (req, res) => {
    foodTypeDal.updateByID(req.params.id, req.body, isOk => {
        console.log(isOk)
        if (isOk) {
            res.json({
                status: 'y',
                msg: '修改记录成功'
            })
        } else {
            res.json({
                status: 'n',
                msg: '修改记录失败'
            })
        }
    })
})

router.post('/delete/:id', (req, res) => {
    foodTypeDal.del(req.params.id, isOk => {
        if (isOk) {
            res.json({
                status: 'y',
                msg: '删除记录成功'
            })
        } else {
            res.json({
                status: 'n',
                msg: '修改记录失败'
            })
        }
    })
})
module.exports = router