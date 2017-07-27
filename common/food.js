var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema
//创建book集合的数据结构

var foodSchema = new Schema({
    name:String,
    description:String,
    img:String,
    price:{
        type:Number,
        default:0
    },
    type:{
        type:Schema.Types.ObjectId,
        ref:'food_type'
    }
}, { toJSON: { virtuals: true } })

var Food = mongoose.model("food",foodSchema) //创建book模型

/**
 * 书籍模型
 */
class FoodDal extends DBBase{
    constructor(){
        super(Food)
    }
}

module.exports = {
    Food:Food,
    FoodDal:FoodDal
}
