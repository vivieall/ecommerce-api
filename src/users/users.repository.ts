import { User } from "./entities/user.entity";

export class UsersRepository {
    private users: User[] = []

    findAll() : User[] {
        return this.users
    }

    findOne(id: string): User {
        const user = this.users.find(user => user.id == parseInt(id))
        return user
    }

    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email == email)
    }

    update(id: string, updateUser: User): number {
        const index = this.users.findIndex(user => user.id == parseInt(id))

        this.users[index].name = updateUser.name
        this.users[index].email = updateUser.email
        this.users[index].address = updateUser.address
        this.users[index].phone = updateUser.phone
        this.users[index].password = updateUser.password
        this.users[index].city = updateUser.city
        this.users[index].country = updateUser.country

        return this.users[index].id
    }

    save(newUser: User): number {
        this.users.push(newUser)
        return newUser.id
    }

    delete(id: string): number {
        const index = this.users.findIndex(prod => prod.id == parseInt(id))
        this.users.splice(index, 1)

        return parseInt(id)
    }
}