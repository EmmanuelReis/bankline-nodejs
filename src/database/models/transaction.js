const Mongoose = require('mongoose')

const TransactionSchema = new Mongoose.Schema({
    created_at: { 
        type: Date, 
        default: Date.now() 
    },
    value: Number,
    type_id: String,
    source_account_id: String,
    target_account_id: String
}, { collection: 'transactions' })

module.exports = Mongoose.model('Transaction', TransactionSchema)