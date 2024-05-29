import prisma from "../db";

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      Id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

export const getProduct = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      Id: req.params.id,
      userId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
  try {
    //Async Error Handling ... You have to catch and pass it to the next
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (err) {
    err.type = "Database";
    next(err);
  }
};

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      Id: req.params.id,
      userId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      Id: req.params.id,
      userId: req.user.id,
    },
  });

  res.json({ data: deleted });
};
