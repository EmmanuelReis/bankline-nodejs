class UserDTO {
    static toDTO(user) {
        const { created_at, updated_at, active, password, ...dto } = user

        return dto
    }
}

module.exports = UserDTO