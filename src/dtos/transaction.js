class TransactionDTO {
    static toDTO(transaction) {
        let { _id, __v, type_id, source_account_id, target_account_id, ...dto } = transaction._doc ?? transaction
        dto.id = _id.toString()

        return dto
    }
}

module.exports = TransactionDTO