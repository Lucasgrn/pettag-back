import { prisma } from "../../prisma/index.js"

export const registerUser = async (req, res) => { // Cadastro de usuário
  const {name, email, password, instagram, phone } = req.body
  try {
    if (await prisma.user.findUnique({ where: { email } })) { // Checa se já existe um usuário com o email digitado
      return res.status(422).json({ error: 'User already exists!' })
    } else {
      const user = await prisma.user.create({ // Cadastra usuário
        data: {
          name,
          email,
          password,
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
    if (!user || user.password !== password) { // Compara as credenciais
      return res.status(401).json({ error: "Email or password invalid!" })
    } else {
      const token = 'placeholder' // Gerar token de acesso
      return res.status(200).json({ user, token })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}