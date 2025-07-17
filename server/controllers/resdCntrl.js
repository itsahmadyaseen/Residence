import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    pdfUrl,
    userEmail,
    type,
    localAdvantages,
    salientFeatures,
  } = req.body;

  // console.log(req.body.userEmail);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image: image || "",
        pdfUrl: pdfUrl || "",
        type: type || "PLOT",
        localAdvantages,
        salientFeatures,
        owner: { connect: { email: userEmail } },
      },
    });
    console.log("Property created");
    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllPlotResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    where: {
      type: "PLOT",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

export const getAllRentalResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    where: {
      type: "RENTAL",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
