class UserDTO {
    static toDTO(user) {
        const { active, password, ...dto } = user

        return dto
    }
}

module.exports = UserDTO