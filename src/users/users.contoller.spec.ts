import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDto } from './users.dto';
import { Users } from 'src/tables';
import { Response } from 'express';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
    let controller: UsersController;
    const responseMock = {
        cookie: jest.fn((name: string, value: string) => {
            return { name: value }
        })
    } as unknown as Response

    
    beforeAll(async () => {
        
        let users: Users[] = []
        const mockUserService = {
            createNewUser: jest.fn( (dto: UsersDto) => {
                const user = {
                    id: Math.random() * 100,
                    username: dto.username,
                    password: dto.password,
                    email: dto.email
                } as Users
                users.push(user)
                return user
            }),

            logUser: jest.fn((uname: string, passwd: string) => {
                const user = users.filter( ele => ele.username === uname)
                if(user.length == 0){
                    throw new NotFoundException('User does not exist')
                }
                if(user[0].password != passwd){
                    throw new UnauthorizedException('Wrong Password')
                }
                return {acc_token: 'token'}
            }),
            getAllUsers: jest.fn(() => {
                return [...users]
            })
        }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UserService],
        }).overrideProvider(UserService).useValue(mockUserService).compile();
        controller = module.get<UsersController>(UsersController);
    });


    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a user', () => {
        expect(controller.createUser({username: 'jest', password: 'jest1234', email: 'jest@gmail.com'})).toEqual({
            id: expect.any(Number),
            username: 'jest',
            password: expect.any(String),
            email: 'jest@gmail.com'
        })
    });


    it('should return all users', () => {
        expect(controller.getUsers()).toEqual([{
            id: expect.any(Number),
            username: expect.any(String),
            password: expect.any(String),
            email: expect.any(String)
        }])
    })

    it('should log users in and return a cookie', async () => {
        await expect(controller.loginUser('jest', 'jest1234', responseMock)).resolves.toBeFalsy()
    })

    it('should throw not authorized exception', async () => {
        await expect(controller.loginUser('jest', 'nisha1234', responseMock)).rejects.toThrow(new UnauthorizedException('Wrong Password'))
    })

    it('should throw not found exception', async () => {
        await expect(controller.loginUser('nisha', 'nisha1234', responseMock)).rejects.toThrow(new NotFoundException('User does not exist'))
    })

});