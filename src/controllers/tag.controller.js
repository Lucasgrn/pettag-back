import { prisma } from "../../prisma/index.js";

export const createTags = async (req, res) => {
  const { qnt } = req.body
  try {
    let i = 0
    let createdNow = []
    for (i; i < qnt; i++) {
      const tag = await prisma.tag.create({ data: {} })
      createdNow.push(tag)
    }
    return res.status(201).json(createdNow)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const listAllInactiveTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        status: 'inactive'
      }
    })
    return res.status(200).json(tags)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const activateTag = async (req, res) => {
  const { petId, id } = req.body
  try {
    const tag = await prisma.tag.update({
      where: { id },
      data: {
        status: 'active',
        petId,
        updatedAt: new Date()
      }
    })
    return res.status(200).json(tag)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const getTag = async (req, res) => {
  const { id } = req.params
  try {
    const tag = await prisma.tag.findUnique({
      where: { id }
    })
    if (tag) {
      return res.status(200).json(tag)
    } else {
      return res.status(404).json({ error: 'Tag not found!' })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}