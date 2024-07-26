import { prisma } from "../../prisma/index.js";

export const petRegister = async (req, res) => { // Cadastro de Pet
  const { token, species, race, name, birthday, favoriteSnack, diaryFood } = req.body
  try {
    if (await prisma.pet.findUnique({ where: { token } })) { // Checa se o token já foi usado em outro pet
      return res.status(422).json({ error: "Token already in use!" })
    } else {
      const pet = await prisma.pet.create({ // Adiciona um pet a partir de um novo token
        data: {
          token,
          species,
          race,
          name,
          birthday,
          favoriteSnack,
          diaryFood,
          ownerId: req.userId
        }
      })
      return res.status(201).json(pet)
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const listPets = async (req, res) => { // Lista os Pets do usuário logado
  try {
    const pets = await prisma.pet.findMany({ where: { ownerId: req.userId } }) // Trocar req.params.owner por req.userId
    return res.status(200).json(pets)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const getPet = async (req, res) => {
  const { token } = req.params
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        token
      }
    })
    if (pet) {
      return res.status(200).json(pet)
    } else {
      return res.status(404).json({ error: 'Pet not found!' })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const editPet = async (req, res) => { // Editar campos de um Pet via token
  const {
    token,
    name,
    race,
    species,
    birthday,
    friendly,
    vaccinated,
    bio,
    favoriteSnack,
    dewormed,
    diaryFood, } = req.body
  try {
    const pet = await prisma.pet.update({
      where: { token },
      data: {
        name,
        race,
        species,
        birthday,
        friendly,
        vaccinated,
        bio,
        favoriteSnack,
        dewormed,
        diaryFood,
        updatedAt: new Date()
      }
    })
    if (!pet) {
      return res.status(400).json({ error: 'Somethin went wrong!' })
    } else {
      return res.status(200).json(pet)
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const deletePet = async (req, res) => { // Remover um pet
  const { token } = req.params
  try {
    await prisma.pet.delete({ where: { token } })
    return res.status(200).json({ success: 'Pet removed successfully!' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}