class AccountDTO {
    static toDTO(account) {
        const { active, user_id, updated_at, created_at, ...dto } = account

        return dto
    }
}

module.exports = AccountDTO