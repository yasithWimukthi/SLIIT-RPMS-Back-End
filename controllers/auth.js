import Login from '../models/Login.js'
import AcademicStaff from '../models/AcademicStaff.js'
import Student from '../models/Student.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const studentSignUp = async (req, res, next) => {
    const {
        name,
        email,
        studentId,
        specialization,
        faculty,
        contactNumber,
        image,
        password,
    } = req.body

    try {
        const hashedPw = await bcrypt.hash(password, 12)

        const student = new Student({
            email,
            name,
            studentId,
            specialization,
            faculty,
            contactNumber,
            image,
        })

        const login = new Login({
            email,
            password: hashedPw,
            type: 'student',
            student: student._id,
        })
        const studentResult = await student.save()
        const loginResult = await login.save()

        const createdStudent = await Student.findById(
            studentResult._id
        ).populate('login')
        createdStudent.login = loginResult._id
        createdStudent.save()

        res.status(201).json({
            message: 'Student signup successfully!',
            userId: studentResult._id,
        })
    } catch (err) {
        res.status(500).json({
            error:err.message
        })
    }
}

export const academicStaffSignUp = async (req, res, next) => {
    const {
        name,
        email,
        password,
        academicStaffId,
        faculty,
        contactNumber,
        image,
        designation,
    } = req.body

    try {
        const hashedPw = await bcrypt.hash(password, 12)

        const academicStaff = new AcademicStaff({
            email,
            name,
            academicStaffId,
            faculty,
            contactNumber,
            image,
            designation,
        })

        const login = new Login({
            email,
            password: hashedPw,
            type: 'academicStaff',
            academicStaff: academicStaff._id,
        })
        const academicStaffResult = await academicStaff.save()
        const loginResult = await login.save()

        

        res.status(201).json({
            message: 'Academic Staff signup successfully!',
            userId: academicStaffResult._id,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log(email)

        const user = await Login.findOne({ email }).populate(
            'student academicStaff'
        )
        

        if (!user) {
            const error = new Error(
                'A user with this email could not be found.'
            )
            error.statusCode = 401
            throw error
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const error = new Error('Wrong password!')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        user.password = undefined
        user.secret = undefined

        res.json({
            token,
            user,
        })
    } catch (err) {
 res.status(500).json({

            error: 'Login failed. Try again.',
        })
    }
}
