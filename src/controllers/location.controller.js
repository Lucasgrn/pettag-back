import { prisma } from "../../prisma/index.js";

export const addLocation = async (req, res) => {
  const { petId, street, number, area, zipCode } = req.body
  try {
    const location = prisma.location.create({
      data: {
        street,
        number,
        area,
        zipCode,
        petId
      }
    })
    return res.status(201).json(location)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const listLocations = async (req, res) => {
  const { petId } = req.params
  try {
    const location = await prisma.location.findMany({
      where: {
        petId
      }
    })
    res.status(200).json(location)
  } catch (error) {
    return res.status(500).json({ error })
  }
}