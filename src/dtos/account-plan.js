class AccountPlanDTO {
    static toDTO(account_plan) {
        let { active, user_id, type_id, type, type_code, ...dto } = account_plan
        dto.type = type?.name 
        
        return dto
    }
}

module.exports = AccountPlanDTO