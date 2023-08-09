import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "../tables";
import { JWTConstants } from "../constants/user.constants";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

describe('UserService', () => {
    let service: UserService;
    

    beforeAll( async () => {
        let users: Users[] = []
        const mockUserRepository = {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(user => {
                const newUser = {
                    id: Math.random() * 100,
                    ...user
                } as Users
                users.push(newUser)
                return Promise.resolve(newUser)
            }),
            findOne: jest.fn().mockImplementation(query => {
                const queryObj = query.where;
                let userItem: Users = null
                if(queryObj.username) {
                    const user = users.filter( ele => ele.username === queryObj.username)
                    if(user.length != 0){
                        userItem = user[0]
                    }
                }
                return Promise.resolve(userItem)
            }),
            query: jest.fn().mockImplementation(query => {
                return Promise.resolve([...users])
            })
        }
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: JWTConstants.secret,
                    signOptions: {
                        expiresIn: JWTConstants.expiresIn
                    }
                })
            ],
            providers: [UserService,
                {
                    provide: getRepositoryToken(Users),
                    useValue: mockUserRepository
                },
            ]
        }).compile()

        service = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should create new user with salt and hash password', async () => {
        const user = await service.createNewUser({username: 'jest', password: 'jest1234', email: 'jest@email.com'})
        expect(user.password).not.toBe('jest1234')
        const splitPass = user.password.split('$')
        const salt = splitPass[4]
        const hash = splitPass[5]
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('should log user and return access token', async () => {
        const token = await service.logUser('jest', 'jest1234')
        expect(token.acc_token).toBeDefined()
    })

    it('should throw unauthorized error', async () => {
        await expect(service.logUser('jest', 'nisha1234')).rejects.toThrow(new UnauthorizedException('Wrong Password'))
    })

    it('should throw not found exception', async () => {
        await expect(service.logUser('nisha', 'nisha1234')).rejects.toThrow(new NotFoundException('User does not exist'))
    })

    it('should return all users', async () => {
        const result = await service.getAllUsers()
        expect(result).toEqual([{
            id: expect.any(Number),
            username: expect.any(String),
            password: expect.any(String),
            email: expect.any(String)
        }])
    })
})