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

export const addUserLocation = async (req, res) => {
  const { zipCode, street, number, area, reference, userId } = req.body
  try {
    const location = await prisma.userLocation.create({
      data: {
        zipCode,
        street,
        number,
        area,
        reference,
        userId
      }
    })
    res.status(201).json(location)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const editUserLocation = async (req, res) => {
  const { zipCode, street, number, area, reference } = req.body
  try {
    const location = await prisma.userLocation.update({
      where: { userId: req.userId },
      data: {
        zipCode,
        street,
        number,
        reference,
        area,
        updatedAt: new Date()
      }
    })
    if (!location) {
      res.status(400).json({ error: 'Something went wrong!' })
    } else {
      res.status(200).json(location)
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const getUserLocation = async (req, res) => {
  try {
    const location = await prisma.userLocation.findUnique({
      where: {
        userId: req.userId
      }
    })
    res.status(200).json(location)
  } catch (error) {
    return res.status(500).json({ error })
  }
}