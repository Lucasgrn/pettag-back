import { compare, hash } from "bcrypt"
import { prisma } from "../../prisma/index.js"
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => { // Cadastro de usuário
  const { name, email, password, instagram, phone } = req.body
  try {
    if (await prisma.user.findUnique({ where: { email } })) { // Checa se já existe um usuário com o email digitado
      return res.status(422).json({ error: 'User already exists!' })
    } else {
      const pswd = await hash(password, 12)
      const user = await prisma.user.create({ // Cadastra usuário
        data: {
          name,
          email,
          password: pswd,
          instagram,
          phone
        }
      })
      return res.status(201).json(user)
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const login = async (req, res) => { // Login de usuário
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !await compare(password, user.password)) { // Compara as credenciais
      return res.status(401).json({ error: "Email or password incorrect!" })
    } else {
      const accessToken = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
        expiresIn: "7 days"
      })
      return res.status(200).json({ user, accessToken })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const getSelfInfo = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId
      }
    })
    delete user['password']
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
}