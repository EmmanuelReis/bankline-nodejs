class TransactionDTO {
    static toDTO(transaction) {
        let { _id, __v, type_id, source_account_id, target_account_id, ...dto } = transaction
        dto.id = _id

        return dto
    }
}

module.exports = TransactionDTO