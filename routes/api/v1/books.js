var express = require('express')
var router = express.Router()
var BookDal = require('../../../common/book').BookDal
var BookTypeDal = require('../../../common/book_type').BookTypeDal

var bookDal = new BookDal()
var dalBookType = new BookTypeDal()

router.get('/get_data/:type?',(req,res)=>{
	// bookDal.getData({type:req.params.type},books=>{
	// 		res.json({
	// 		status:'y',
	// 		msg:'请求成功',
	// 		data:books
	// 	})
	// })
})

// 跨域接口调用 Backbone-demo练习
// 根据id获取单条记录
//  /api/v1/books
// 无条件返回数据
router.get('/',(req,res)=>{
	var page = 1 //当前显示第几页的数据

	if(req.query.page){
		page = Number(req.query.page)
	}
	bookDal.getDataByPage(page,{type:req.query.type},data=>{
		// console.log(data.res)
		// console.log(data.pageCount)
		setTimeout(function(){
			res.json(data.res)
		},5000)

		// res.json({
		// 	data:data.res,
		// 	pageIndex:page,
		// 	pageCount:data.pageCount
		// })
	})
})
//注意路由的先后顺序:id 如果放在id之后 get_page_count当id用
router.get('/get_page_count',(req,res)=>{
	console.log('aaaa')
	var page = 1 //当前显示第几页的数据
	if(req.query.page){
		page = Number(req.query.page)
	}
	bookDal.getDataByPage(page,{type:req.query.type},data=>{
		console.log(data.pageCount)
		res.json(data)
	})

})
//根据ID查找数据
router.get('/:id',(req,res)=>{
	bookDal.findByID(req.params.id,data=>{
		// res.json({status:'y',msg:"获取数据成功",data:data})
		res.json(data)
	})
})

//根据ID更新一条记录
router.put('/:id',(req,res)=>{
	delete req.body._id   //删除不需要修改的数据
	delete req.body._v    //删除不需要修改的数据
	bookDal.updateByID(req.params.id,req.body,isOk=>{
		if (isOk) {
			// res.json({status:'y',msg:"获取数据成功",data:req.body})
			res.json(req.body)
		}
	})

})
//新增数据
router.post('/',(req,res)=>{
	// 判断当前传递过来的数据是否有type属性  如果没有为其添加一个type为other
		if (req.body.type) {

		}
		else {
			req.body.type = 'qita'
		}
		console.log(req.body)
	bookDal.save(req.body,(isOk,data)=>{
		if (isOk) {
			console.log(data)
			// res.json({status:'y',msg:'新增数据成功',data:data})
			res.json(data)
		}
	})
})
//删除数据
router.delete('/:id',(req,res)=>{
	bookDal.del(req.params.id,isOk=>{
		// res.json({status:'y',msg:"删除数据成功",data:{}})
		res.json({})
	})
})
router.get('/list/types',(req,res)=>{
	console.log('aaaa')
	//查询所有的分类信息 把数据展示在页面上
	dalBookType.getData({},data=>{
		res.json(data)
	})
})

module.exports = router