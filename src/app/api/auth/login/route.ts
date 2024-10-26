import {NextRequest} from 'next/server'
import bcrypt from 'bcrypt'
import {ApiResponseHandler} from '@/server/middleware/api-handler'
import {validateRequest} from '@/server/middleware/validate'
import {JwtHelper} from '@/server/middleware/jwt'
import {usersRepository} from '@/server/repositories/users-repo'
import {LoginSchema} from '@/lib/config/auth'

export async function POST(request: NextRequest) {
    const validationResult = await validateRequest(LoginSchema)(request)
    if (!validationResult.success) {
        return validationResult.error
    }

    const {email, password} = validationResult.data

    try {
        const existingUser = await usersRepository.findByEmail(email)
        if (!existingUser) {
            return ApiResponseHandler.error(
                'Invalid email',
                400,
                'INVALID_CREDENTIALS'
            )
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.hash)
        if (!passwordMatch) {
            return ApiResponseHandler.error(
                'Invalid email or password',
                400,
                'INVALID_CREDENTIALS'
            )
        }

        const accessToken = await JwtHelper.generateAccessToken(existingUser)
        const refreshToken = await JwtHelper.generateRefreshToken(existingUser._id)

        const response = ApiResponseHandler.success(
            {
                message: 'Login successful',
                user: {
                    _id: existingUser._id,
                    username: existingUser.username,
                }
            },
            200
        )

        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
        } as any)

        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        } as any)

        return response
    } catch (error) {
        return ApiResponseHandler.serverError(error)
    }
}