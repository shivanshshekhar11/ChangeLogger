import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    //Schema Optimization Oppurtunity here
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

export const getUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      Id: req.params.id,
    },
  });

  if (!update) {
    return res.status(404).json({
      message: "Update not found.",
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      Id: update.productId,
    },
  });

  if (product.userId !== req.user.id) {
    return res.status(401).json({
      message: "You cannot access updates on another user's product.",
    });
  } else {
    res.json({ data: update });
  }
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      Id: req.body.productId,
      userId: req.user.id,
    },
  });

  if (!product) {
    return res.status(401).json({
      message:
        "You cannot create updates on another user's product OR the product doesn't exist.",
    });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      version: req.body.version ? req.body.version : null,
      media: req.body.media ? req.body.media : null,
      updatedAt: new Date(),
      productId: req.body.productId,
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      Id: req.params.id,
    },
  });

  if (!update) {
    return res.status(404).json({
      message: "Update not found.",
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      Id: update.productId,
    },
  });

  if (product.userId !== req.user.id) {
    return res.status(401).json({
      message: "You cannot change updates on another user's product.",
    });
  } else {
    const updated = await prisma.update.update({
      where: {
        Id: req.params.id,
      },
      data: req.body,
    });

    res.json({ data: updated });
  }
};

export const deleteUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      Id: req.params.id,
    },
  });

  if (!update) {
    return res.status(404).json({
      message: "Update not found.",
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      Id: update.productId,
    },
  });

  if (product.userId !== req.user.id) {
    return res.status(401).json({
      message: "You cannot delete updates on another user's product.",
    });
  } else {
    const deleted = await prisma.update.delete({
      where: {
        Id: req.params.id,
      },
    });

    res.json({ data: deleted });
  }
};
